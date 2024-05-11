import React, { useState } from 'react';

import TelaLogin from './components/TelaLogin';

import { jwtDecode } from "jwt-decode";
import { useFetchUserById } from './hooks/useFetchUserById';
import HomeAdmin from './components/HomeAdmin';
import './App.css';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn
} from 'mdb-react-ui-kit';

function App() {
  const apiUrl = "http://localhost:8080/sac/api"
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleLoginSuccess(token) {
    console.log("Handling succesfull login")
    console.log(`Setting token ${token}`)
    setToken(token);
    setLoading(true);
    try {
      const response = await fetchUser(token);

      if (!response.ok) {
        console.log(response)
        throw new Error(`Falha ao carregar dados do usuário. Erro ${response.status}`)
      }
      const userData = await response.json();
      setUser(userData);
      setIsLoggedIn(true);
      console.log('logado')
    } catch (error) {
      setError(error.message);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }

  async function handleLoginError(string) {
    setError(string);
    setIsLoggedIn(false);
  }

  async function fetchUser(token) {
    console.log("Fetching user data")
    console.log(`Decoding token ${token}`)

    const decodedToken = jwtDecode(token);
    const matricula = decodedToken.sub;
    const response = await fetch(`${apiUrl}/usuario/${matricula}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    console.log("User fetched succesfully")
    return response;
  }

  return (
    <>
      {/* exibir cabeçalho quando logado */}
      {isLoggedIn && (<MDBNavbar dark className='main-header p-0 '>
        <MDBContainer fluid className='d-flex flex-row'>
          <MDBNavbarBrand href='#'>
            <img src='cefet_branco.png' className='logo' />
            SAC
          </MDBNavbarBrand>
          <MDBBtn color="danger" size="sm" type='button'>
            Sair da sessão
          </MDBBtn>
        </MDBContainer>
      </MDBNavbar>)}
      
      {/* exibir tela HomeAdmin quando logado como admin, A tela do aluno quando logado como aluno (ainda n feito), uma mensagem de erro caso erro, e a tela de login caso ainda não esteja logado */}
       {isLoggedIn ? 
        user.usuarioAdm == true ? <HomeAdmin user={user} token={token} url={apiUrl}/> : <p>Você é aluno</p>
      :
        error != null ?
          <p>Erro {error}</p>
        :
          <TelaLogin endpointUrl={apiUrl} onLogin={handleLoginSuccess} onError={handleLoginError}/>}

    </>
  );
}

export default App;
