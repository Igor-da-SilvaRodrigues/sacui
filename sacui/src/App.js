import React, { useState } from 'react';

import TelaLogin from './components/TelaLogin';

import { jwtDecode } from "jwt-decode";
import { useFetchUserById } from './hooks/useFetchUserById';

function App() {
  const apiUrl = "http://localhost:8080"
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleLoginSuccess(token){
    console.log("Handling succesfull login")
    console.log(`Setting token ${token}`)
    setToken(token);
    setLoading(true);
    try{
      const response = await fetchUser(token);

      if(!response.ok){
        console.log(response)
        throw new Error(`Falha ao carregar dados do usuário. Erro ${response.status}`)
      }
      const userData = await response.json();
      setUser(userData);
      setIsLoggedIn(true);
      console.log('logado')
    }catch(error){
      setError(error.message);
      setIsLoggedIn(false);
    }finally{
      setLoading(false);
    }
  }

  async function handleLoginError(string){
    setError(string);
    setIsLoggedIn(false);
  }

  async function fetchUser(token){
    console.log("Fetching user data")
    console.log(`Decoding token ${token}`)
    
    const decodedToken = jwtDecode(token);
    const matricula = decodedToken.sub;
    const response = await fetch(`${apiUrl}/usuario/${matricula}`,{
      headers:{
        "Authorization": `Bearer ${token}`,
      },
    });
    console.log("User fetched succesfully")
    return response;
  }

  return (
    <>
      {isLoggedIn ? 
        <p>Você está logado</p> 
        :
        error != null ?
          <p>Erro {error}</p>
          :
          <TelaLogin endpointUrl={apiUrl} onLogin={handleLoginSuccess} onError={handleLoginError}/>}

    </>
  );
}

export default App;
