import { useState } from "react";
import "./LandingPageDiscente.css";
import AberturaChamadoDiscente from './AberturaChamadoDiscente'
import VerificarChamadoDiscente from './VerificarChamadoDiscente'

import Header from "./Header";
import Footer from "./Footer";

const LandingPageDiscente = ({ user, url, token }) => {

  const [target, setTarget] = useState("")

  const page = (<div>
    <Header />
    <h1 style={{ marginTop: '70px', margin: '0 auto', textAlign:'center'}}>Olá, {user.nome}! Como podemos ajudar?</h1>
    <div className="buttonsLandDisc">
      <button name="openSac" onClick={()=>{setTarget("abrirChamado")}}>Abrir Chamado</button>
      <button name="verifySac" onClick={()=>{setTarget("verificarChamado")}}>Verificar Chamado</button>
    </div>
    <Footer pos="fixed" bot={0} />
  </div>);

  return (
    <>
      {target === "" && page}
      {target === "abrirChamado" && <AberturaChamadoDiscente user={user} url={url} token={token}></AberturaChamadoDiscente>}
      {target === "verificarChamado" && <VerificarChamadoDiscente user={user} url={url} token={token} toAberturaChamadoDiscente={()=>{setTarget("abrirChamado")}}></VerificarChamadoDiscente>}
    </>
    
    
  );
};

export default LandingPageDiscente;
