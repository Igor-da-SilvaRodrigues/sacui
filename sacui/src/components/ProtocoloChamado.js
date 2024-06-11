import Footer from "./Footer";
import Header from "./Header";
import React, { useEffect, useState } from 'react'

const ProtocoloChamado = ({ user, url, token, chamado, returnToParent}) => {
  let protocolo = 1234567890;

  return (
    <div>
      <Header />
      <h1>Chamado {chamado["protocolo"]}:</h1>
      <div className="detalheChamado">
        <p style={{ color: "#000", fontSize: "medium", width: "500px", marginTop: "6px", margin: "0 auto", }}>
          RELATÓRIO DE CHAMADO ABERTO
        </p>
        <p style={{color: "#000",fontSize: "medium",width: "500px",marginTop: "6px",margin: "0 auto",}}>
          CHAMADO: {chamado["tipoChamado"]}
        </p>
        <p style={{color: "#000",fontSize: "medium",width: "500px",marginTop: "6px",margin: "0 auto",}}>
          MOTIVO: {chamado["motivo"]}
        </p>
        <p style={{color: "#000",fontSize: "medium",width: "500px",marginTop: "6px",margin: "0 auto",}}>
          JUSTIFICATIVA: {chamado["justificativa"]}
        </p>
        
        <p style={{color: "#000",fontSize: "medium",width: "500px",marginTop: "12px",margin: "0 auto",}}>
          IMPRIMA ESTA TELA COMO COMPROVANTE
        </p>
        <button name="novo" onClick={returnToParent}>Novo</button>
      </div>
      <Footer pos="fixed" bot={0} />
    </div>
  );
};

export default ProtocoloChamado;
