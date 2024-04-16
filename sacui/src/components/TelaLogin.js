import React, { useState } from 'react'
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
  } from 'mdb-react-ui-kit';

/**
 * Uma tela de login
 * @param {*} endpointUrl A url da API que tratará o login
 * @param {*} onLogin Listener que será chamado se o login for efetuado. Recebe como argumento a chave de sessão retornada pela API. 
 * @param {*} onError Listener que será chamado se algum erro ocorrer. Receberá como argumento uma string descrevendo o erro.
 * @returns 
 */
const TelaLogin = ({endpointUrl, onLogin, onError}) => {
  const [matricula, setMatricula] = useState("")
  const [senha, setSenha] = useState("")

  async function handleSubmit(){
    //logging in
    console.log("Attempting login")
    const response = await fetch(`${endpointUrl}/login`, {
      method: "POST",
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({matricula, senha})
    });
    console.log("response received")
    if(response.ok){
      //success
      console.log("Login succesfull, returning token")
      const token = await response.text()
      onLogin(token)
    }else{
      //failure
      console.log("Login failed, credentials might be incorrect")
      onError(`Erro: ${response.status} ${response.statusText}; detalhes: ${response.body}`)
    }
  }

  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
            SAC <br />
            <span style={{color: 'hsl(218, 81%, 75%)'}}>Sistema Acadêmico de Chamados - CEFET/RJ</span>
          </h1>

        </MDBCol>

        <MDBCol md='6' className='position-relative'>

          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>

              <MDBInput wrapperClass='mb-4' label='Matrícula' id='form3' type='email' onChange={(e)=>setMatricula(e.target.value)}/>
              <MDBInput wrapperClass='mb-4' label='Senha' id='form4' type='password'  onChange={(e)=>setSenha(e.target.value)}/>

              <div className='w-100 d-flex justify-content-center'>
                <MDBBtn className='w-50 mb-4' size='lg' style={{  }} onClick={handleSubmit}>ENTRAR</MDBBtn>
              </div>

              <p>Esqueci minha senha</p>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

      <img id="logo-cefet" src="./logo-cefet.png" alt="" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: '0.3', height: "66%", pointerEvents: 'none' }} />

    </MDBContainer>
  )
}

export default TelaLogin