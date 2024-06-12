import Footer from "./Footer";
import Header from "./Header";

import { useGetChamadosByUser } from "../hooks/useGetChamadosByUser";
import { useState } from "react";
import { useGetChamadoById } from "../hooks/useGetChamadoById";
import AberturaChamadoDiscente from "./AberturaChamadoDiscente";

/**
 * Tela de verificação de chamado do discente
 * @param {*} user o objeto de usuário
 * @param {*} url a url da api
 * @param {*} token o token da sessão
 * @param {*} toAberturaChamadoDiscente callback de navegação do componente pai que sinaliza
 * para que a tela AberturaChamadoDiscente seja renderizada. 
 * @returns 
 */
const VerificarChamadoDiscente = ({ user, url, token, toAberturaChamadoDiscente }) => {
    const status = "Aberto";
    const [selectedChamadoId, setSelectedChamadoId] = useState("");

    const [target, setTarget] = useState(""); // alvo de navegação / renderização

    //resgatando todos os chamados do discente
    const {
        isLoading: isLoadingGetChamados,
        isError: isErrorGetChamados,
        error: errorGetChamados,
        statusCode: statusCodeGetChamados,
        chamados,
    } = useGetChamadosByUser(
        `${url}/chamado/usuario`,
        null,
        user["matricula"],
        token
    );

    //resgatando detalhes do chamado selecionado (pode ser nulo)
    const {
        isLoading: isLoadingChamado,
        isError: isErrorChamado,
        error: errorChamado,
        statusCode: statusCodeChamado,
        chamado: selectedChamado,
    } = useGetChamadoById(`${url}/chamado`, null, selectedChamadoId, token);

    const handleSelectChamadoChange = (e) => {
        chamados &&
            setSelectedChamadoId(
                chamados.find(
                    (chamado) =>
                        chamado["inicial"]["protocolo"] === e.target.value
                )["inicial"]["protocolo"]
            );
    };

    const statusOf = (code) => {
        switch (code) {
            case 0:
                return "Fechado";
            case 1:
                return "Em Andamento";
            case 2:
                return "Aberto";
            case 3:
                return "Retornado";
        }
    };

    return (
        <div>
        <Header />
        <h1>Verificar Chamados</h1>
        <label>
            <select
                name="chamados"
                style={{ marginTop: "20px", fontSize: "medium" }}
                onChange={handleSelectChamadoChange}
            >
                {chamados &&
                    chamados.map((chamado, key) => (
                        <option
                            key={key}
                            value={chamado["inicial"]["protocolo"]}
                        >
                            {chamado["inicial"]["protocolo"]}
                        </option>
                    ))}
            </select>
        </label>
        <h3>
            Status: {selectedChamado && statusOf(selectedChamado["status"])}
        </h3>
        <h3>Parecer: {selectedChamado && selectedChamado["parecer"]}</h3>
        <p
            style={{
                color: "#000",
                fontSize: "medium",
                width: "500px",
                marginTop: "6px",
                margin: "0 auto",
            }}
        >
            STATUS: {selectedChamado && statusOf(selectedChamado["status"])}
        </p>
        <p
            style={{
                color: "#000",
                fontSize: "medium",
                width: "500px",
                marginTop: "6px",
                margin: "0 auto",
            }}
        >
            PARECER: {selectedChamado && selectedChamado["parecer"]}
        </p>
        {/* Indicador de carregamento, estilizar como desejado... */}
        {(isLoadingGetChamados || isLoadingChamado) && (
            <h1>Carregando...</h1>
        )}
        <button name="novo" onClick={()=>{toAberturaChamadoDiscente()}}>Novo</button>
        <Footer pos="fixed" bot={0} />
    </div>
    );
};

export default VerificarChamadoDiscente;
