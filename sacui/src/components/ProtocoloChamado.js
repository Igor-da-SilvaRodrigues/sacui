import Footer from "./Footer";
import Header from "./Header";
import React, { useEffect, useState } from 'react'

/**
 * Tela de revisão do chamado que acabou de ser criado.
 * @param {*} chamado o objeto de chamado que acabou de ser criado 
 * @param {*} returnToParent callback para sinalizar ao componente pai que esta tela deve deixar de ser renderizada
 * @param {*} toHome callback para retornar a home page
 * @returns 
 */
const ProtocoloChamado = ({ chamado, returnToParent, toHome}) => {

  return (
    <div>
      <Header toHome={toHome}/>
      <h1 style={{textAlign:'center'}}>Chamado {chamado["protocolo"]}:</h1>
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
