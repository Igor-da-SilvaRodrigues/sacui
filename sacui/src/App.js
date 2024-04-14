import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';

function App() {
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

              <MDBInput wrapperClass='mb-4' label='Matrícula' id='form3' type='email'/>
              <MDBInput wrapperClass='mb-4' label='Senha' id='form4' type='password'/>

              <div className='w-100 d-flex justify-content-center'>
                <MDBBtn className='w-50 mb-4' size='lg' style={{  }}>ENTRAR</MDBBtn>
              </div>

              <p>Esqueci minha senha</p>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

      <img id="logo-cefet" src="./logo-cefet.png" alt="" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: '0.3', height: "66%", pointerEvents: 'none' }} />

    </MDBContainer>
  );
}

export default App;
