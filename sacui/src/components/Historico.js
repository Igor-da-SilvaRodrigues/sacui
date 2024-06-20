import Footer from "./Footer";
import Header from "./Header";
import WaterMark from "./WaterMark";
import "./Historico.css"
import { useGetHistoricoByChamado } from "../hooks/useGetHistoricosByChamado";
import { statusToString } from "../enums/ChamadoStatus";
import { useState } from "react";

/**
 * Tela que exibe os históricos de um chamado
 * @param {*} user O objeto de usuário
 * @param {*} url O url da api
 * @param {*} token O token de autenticação
 * @param {*} protocolo O protocolo do chamado em questão
 * @param {*} returnToParent callback para fechar esta tela
 * @returns 
 */
const Historico = ({ user, url, token, protocolo, returnToParent }) => {
  const [param] = useState({sort: "dataMod,desc"})

  const {isLoading, isError, error, statusCode, historicos} = useGetHistoricoByChamado(
    `${url}/historico`,
    param, //mais recentes primeiro
    protocolo,
    token
  )


  return (
    <div>
      <Header />
      <WaterMark />
      <h1>Histórico do chamado {protocolo}</h1>

      {historicos && historicos.map((historico) => (
        <div className="parecer">
            <h3>Data:</h3>
            <p>{historico.dataMod}</p>
            <h3>Parecer:</h3>
            <p>{historico.parecer}</p>
            <h3>Status:</h3>
            <p>{statusToString(historico.status)}</p>
            <h3>Setor responsável:</h3>
            <p>{historico.setor}</p>
        </div>
      ))}
      <button onClick={returnToParent}>Fechar</button>
      <Footer pos={"fixed"} bot={0} />
    </div>
  );
};

export default Historico;
