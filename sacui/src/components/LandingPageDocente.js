import React, { useEffect, useState } from "react";
import "./LandingPageDocente.css";
import Footer from "./Footer";
import Header from "./Header";
import { useGetChamadoByStatusAndDataAbertura } from "../hooks/useGetChamadoByStatusAndDataAbertura";

import { ChamadoStatus } from "../enums/ChamadoStatus";
import RevisarChamadoDocente from "./RevisarChamadoDocente";
import CriarNovoChamado from './CriarNovoChamado';

/**
 *
 * @param {*} user O objeto de usuário
 * @param {*} url A url da api
 * @param {*} token O token de autenticação
 * @returns
 */
const LandingPageDocente = ({ user, url, token }) => {
    const [selectedList, setSelectedList] = useState([]);
    const [navigationTarget, setNavigationTarget] = useState("");

    //estado dos chamados abertos
    const [showDatesAberto, setShowDatesAberto] = useState(false);
    const [paramAberto, setParamAberto] = useState({
        status: ChamadoStatus.ABERTO,
    });
    const {
        isLoading: isLoadingAberto,
        isError: isErrorAberto,
        error: errorAberto,
        statusCode: statusCodeAberto,
        chamados: chamadosAberto,
    } = useGetChamadoByStatusAndDataAbertura(
        `${url}/chamado/byStatusAndDataAbertura`,
        paramAberto, //params
        token
    );

    //estado dos chamados em andamento
    const [showDatesEmAndamento, setShowDatesEmAndamento] = useState(false);
    const [paramEmAndamento, setParamEmAndamento] = useState({
        status: ChamadoStatus.EM_ANDAMENTO,
    });
    const {
        isLoading: isLoadingEmAndamento,
        isError: isErrorEmAndamento,
        error: errorEmAndamento,
        statusCode: statusCodeEmAndamento,
        chamados: chamadosEmAndamento,
    } = useGetChamadoByStatusAndDataAbertura(
        `${url}/chamado/byStatusAndDataAbertura`,
        paramEmAndamento, //params
        token
    );

    // estado dos chamados fechados
    const [showDatesFechado, setShowDatesFechado] = useState(false);
    const [paramFechado, setParamFechado] = useState({
        status: ChamadoStatus.FECHADO,
    });
    const {
      isLoading: isLoadingFechado,
      isError: isErrorFechado,
      error: errorFechado,
      statusCode: statusCodeFechado,
      chamados:chamadosFechado,
    } = useGetChamadoByStatusAndDataAbertura(
      `${url}/chamado/byStatusAndDataAbertura`,
      paramFechado, //params
      token
    );

    // estado dos chamados retornados
    const [showDatesRetornado, setShowDatesRetornado] = useState(false);
    const [paramRetornado, setParamRetornado] = useState({
        status: ChamadoStatus.RETORNADO,
    })
    const {
      isLoading: isLoadingRetornado,
      isError: isErrorRetornado,
      error: errorRetornado,
      statusCode: statusCodeRetornado,
      chamados:chamadosRetornado,
    } = useGetChamadoByStatusAndDataAbertura(
      `${url}/chamado/byStatusAndDataAbertura`,
      paramRetornado, //params
      token
    );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    //handler para o radio group de datas dos chamados abertos
    const handleDataChangeAberto = (e) => {
        if (e.target.value === "0") {
            setShowDatesAberto(true);
        } else {
            setShowDatesAberto(false);

            //selecionado data por n dias atrás. Set dataFim como a data atual.
            //set dataInicio como n dias atrás

            const today = new Date();
            const nDaysAgo = new Date();
            nDaysAgo.setDate(today.getDate() - Number(e.target.value));

            let newParam = {
                status: ChamadoStatus.ABERTO,
                dataFim: new Date().toISOString().split("T")[0],
                dataInicio: nDaysAgo.toISOString().split("T")[0], // feio d+
            };
            setParamAberto(newParam);
        }
    };
    //handler para o selecionador de data inicio dos chamados abertos
    const handleDataInicioChangeAberto = (e) => {
        if (e.target.value == null) {
            return;
        }
        setParamAberto({ ...paramAberto, dataInicio: e.target.value });
    };

    //handler para o selecionador de data fim dos chamados abertos
    const handleDataFimChangeAberto = (e) => {
        if (e.target.value == null) {
            return;
        }
        setParamAberto({ ...paramAberto, dataFim: e.target.value });
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    //handler para o radio group de datas dos chamados em andamento
    const handleDataChangeEmAndamento = (e) => {
        if (e.target.value === "0") {
            setShowDatesEmAndamento(true);
        } else {
            setShowDatesEmAndamento(false);

            //selecionado data por n dias atrás. Set dataFim como a data atual.
            //set dataInicio como n dias atrás

            const today = new Date();
            const nDaysAgo = new Date();
            nDaysAgo.setDate(today.getDate() - Number(e.target.value));

            let newParam = {
                status: ChamadoStatus.EM_ANDAMENTO,
                dataFim: new Date().toISOString().split("T")[0],
                dataInicio: nDaysAgo.toISOString().split("T")[0],
            };
            setParamEmAndamento(newParam);
        }
    };
    //handler para o selecionador de data inicio dos chamados em andamento
    const handleDataInicioChangeEmAndamento = (e) => {
        if (e.target.value == null) {
            return;
        }
        setParamEmAndamento({ ...paramEmAndamento, dataInicio: e.target.value });
    };

    //handler para o selecionador de data fim dos chamados em andamento
    const handleDataFimChangeEmAndamento = (e) => {
        if (e.target.value == null) {
            return;
        }
        setParamEmAndamento({ ...paramEmAndamento, dataFim: e.target.value });
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    //handler para o radio group de datas dos chamados fechados
    const handleDataChangeFechado = (e) => {
        if (e.target.value === "0") {
            setShowDatesFechado(true);
        } else {
            setShowDatesFechado(false);

            //selecionado data por n dias atrás. Set dataFim como a data atual.
            //set dataInicio como n dias atrás

            const today = new Date();
            const nDaysAgo = new Date();
            nDaysAgo.setDate(today.getDate() - Number(e.target.value));

            let newParam = {
                status: ChamadoStatus.FECHADO,
                dataFim: new Date().toISOString().split("T")[0],
                dataInicio: nDaysAgo.toISOString().split("T")[0],
            };
            setParamFechado(newParam); 
        }
    };
    //handler para o selecionador de data inicio dos chamados fechados
    const handleDataInicioChangeFechado = (e) => {
        if (e.target.value == null) {
            return;
        }
        setParamFechado({ ...paramFechado, dataInicio: e.target.value });
    };

    //handler para o selecionador de data fim dos chamados fechados
    const handleDataFimChangeFechado = (e) => {
        if (e.target.value == null) {
            return;
        }
        setParamFechado({ ...paramFechado, dataFim: e.target.value });
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    //handler para o radio group de datas dos chamados retornados
    const handleDataChangeRetornado = (e) => {
        if (e.target.value === "0") {
            setShowDatesRetornado(true);
        } else {
            setShowDatesRetornado(false);

            //selecionado data por n dias atrás. Set dataFim como a data atual.
            //set dataInicio como n dias atrás

            const today = new Date();
            const nDaysAgo = new Date();
            nDaysAgo.setDate(today.getDate() - Number(e.target.value));

            let newParam = {
                status: ChamadoStatus.RETORNADO,
                dataFim: new Date().toISOString().split("T")[0],
                dataInicio: nDaysAgo.toISOString().split("T")[0],
            };
            setParamRetornado(newParam); 
        }
    };
    //handler para o selecionador de data inicio dos chamados fechados
    const handleDataInicioChangeRetornado = (e) => {
        if (e.target.value == null) {
            return;
        }
        setParamRetornado({ ...paramRetornado, dataInicio: e.target.value });
    };

    //handler para o selecionador de data fim dos chamados abertos
    const handleDataFimChangeRetornado = (e) => {
        if (e.target.value == null) {
            return;
        }
        setParamRetornado({ ...paramRetornado, dataFim: e.target.value });
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    const addOrRemoveSelection = (event, protocolo) => {
        if (event.target.checked){
            setSelectedList([...selectedList,protocolo]);
        }else{
            //define a lista como todos os itens que não são iguais ao protocolo, removendo-o
            setSelectedList(selectedList.filter((i)=>{return i!=protocolo}))
        }
    }

    useEffect(()=>{
        console.log(selectedList)
    },[selectedList])

    const navigateToRevisar = () => {
        if (selectedList.length == 0){
            alert("Selecione pelo menos um chamado para continuar.")
        }else{
            setNavigationTarget("revisar")
        }
    }

    const returnToThis = () => {
        setSelectedList([]);
        setNavigationTarget("");
        
        //chamado set para forçar a atualização das tabelas
        setParamAberto({...paramAberto})
        setParamEmAndamento({...paramEmAndamento})
        setParamFechado({...paramFechado})
        setParamRetornado({...paramRetornado})

    }
    const page = (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Header />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <h3>
                    Você está logado como {user.nome} - Mat.: {user.matricula}
                </h3>
                <h1>Revisão de Chamados</h1>
                {/* Table de chamados abertos */}
                <table>
                    <thead>
                        <tr>
                            <th
                                colSpan={8}
                                style={{
                                    color: "#fff",
                                    backgroundImage:
                                        "linear-gradient(to top, #063E63, #549BC7)",
                                }}
                            >
                                ABERTOS
                            </th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>CHAMADO</th>
                            <th>PRIORIDADE</th>
                            <th>ALUNO</th>
                            <th>MATRÍCULA</th>
                            <th>ABERTURA</th>
                            <th>MODIFICAÇÃO</th>
                            <th>FECHAMENTO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chamadosAberto &&
                            chamadosAberto.map((aberto, index) => (
                                <tr key={aberto.protocolo}>
                                    <td>
                                        <input type="checkbox" checked={selectedList.includes(aberto.protocolo)} onChange={(e) => addOrRemoveSelection(e, aberto.protocolo)}/>
                                    </td>
                                    <td>{aberto.protocolo}</td>
                                    <td>{aberto.prioridade}</td>
                                    <td>{aberto.aluno}</td>
                                    <td>{aberto.matricula}</td>
                                    <td>{aberto.dataAbertura}</td>
                                    <td>{aberto.dataMod ? aberto.dataMod.split('T')[0]:""}</td>
                                    <td>{aberto.dataFechamento}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <label>
                    <span>Período:</span>
                    <input
                        type="radio"
                        name="periodo"
                        value={30}
                        onChange={handleDataChangeAberto}
                    />
                    30 dias
                    <input
                        type="radio"
                        name="periodo"
                        value={60}
                        onChange={handleDataChangeAberto}
                    />
                    60 dias
                    <input
                        type="radio"
                        name="periodo"
                        value={90}
                        onChange={handleDataChangeAberto}
                    />
                    90 dias
                    <input
                        type="radio"
                        name="periodo"
                        value={0}
                        onChange={handleDataChangeAberto}
                    />
                    Outro
                </label>
                {showDatesAberto && (
                    <div
                        style={{
                            display: "flex",
                            width: "fit-content",
                            margin: "0 auto",
                            marginTop: "10px",
                            marginBottom: "10px",
                        }}
                    >
                        <input
                            type="date"
                            name="dataInicial"
                            onChange={handleDataInicioChangeAberto}
                        />
                        <p style={{ color: "#000", fontSize: "medium" }}>até</p>
                        <input
                            type="date"
                            name="dataFinal"
                            onChange={handleDataFimChangeAberto}
                        />
                    </div>
                )}
                {/* Table de chamados em andamento */}
                <table>
                    <thead>
                        <tr>
                            <th
                                colSpan={8}
                                style={{
                                    color: "#fff",
                                    backgroundImage:
                                        "linear-gradient(to top, #063E63, #549BC7)",
                                }}
                            >
                                EM ANDAMENTO
                            </th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>CHAMADO</th>
                            <th>PRIORIDADE</th>
                            <th>ALUNO</th>
                            <th>MATRÍCULA</th>
                            <th>ABERTURA</th>
                            <th>MODIFICAÇÃO</th>
                            <th>FECHAMENTO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chamadosEmAndamento && chamadosEmAndamento.map((chamado, index) => (
                            <tr key={chamado.protocolo}>
                                <td>
                                    <input type="checkbox" onChange={(e) => addOrRemoveSelection(e, chamado.protocolo)}/>
                                </td>
                                <td>{chamado.protocolo}</td>
                                <td>{chamado.prioridade}</td>
                                <td>{chamado.aluno}</td>
                                <td>{chamado.matricula}</td>
                                <td>{chamado.dataAbertura}</td>
                                <td>{chamado.dataMod ? chamado.dataMod.split('T')[0]:""}</td>
                                <td>{chamado.dataFechamento}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <label>
                    <span>Período:</span>
                    <input
                        type="radio"
                        name="periodo"
                        value={30}
                        onChange={handleDataChangeEmAndamento}
                    />
                    30 dias
                    <input
                        type="radio"
                        name="periodo"
                        value={60}
                        onChange={handleDataChangeEmAndamento}
                    />
                    60 dias
                    <input
                        type="radio"
                        name="periodo"
                        value={90}
                        onChange={handleDataChangeEmAndamento}
                    />
                    90 dias
                    <input
                        type="radio"
                        name="periodo"
                        value={0}
                        onChange={handleDataChangeEmAndamento}
                    />
                    Outro
                </label>
                {showDatesEmAndamento && (
                    <div
                        style={{
                            display: "flex",
                            width: "fit-content",
                            margin: "0 auto",
                            marginTop: "10px",
                            marginBottom: "10px",
                        }}
                    >
                        <input type="date" name="dataInicial" onChange={handleDataInicioChangeEmAndamento}/>
                        <p style={{ color: "#000", fontSize: "medium" }}>até</p>
                        <input type="date" name="dataFinal" onChange={handleDataFimChangeEmAndamento} />
                    </div>
                )}
                {/* Table de chamados retornados */}
                <table>
                    <thead>
                        <tr>
                            <th
                                colSpan={8}
                                style={{
                                    color: "#fff",
                                    backgroundImage:
                                        "linear-gradient(to top, #063E63, #549BC7)",
                                }}
                            >
                                RETORNADOS
                            </th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>CHAMADO</th>
                            <th>PRIORIDADE</th>
                            <th>ALUNO</th>
                            <th>MATRÍCULA</th>
                            <th>ABERTURA</th>
                            <th>MODIFICAÇÃO</th>
                            <th>FECHAMENTO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chamadosRetornado && chamadosRetornado.map((chamado, index) => (
                            <tr key={chamado.protocolo}>
                                <td>
                                    <input type="checkbox" onChange={(e) => addOrRemoveSelection(e, chamado.protocolo)}/>
                                </td>
                                <td>{chamado.protocolo}</td>
                                <td>{chamado.prioridade}</td>
                                <td>{chamado.aluno}</td>
                                <td>{chamado.matricula}</td>
                                <td>{chamado.dataAbertura}</td>
                                <td>{chamado.dataMod ? chamado.dataMod.split('T')[0]:""}</td>
                                <td>{chamado.dataFechamento}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <label>
                    <span>Período:</span>
                    <input
                        type="radio"
                        name="periodo"
                        value={30}
                        onChange={handleDataChangeRetornado}
                    />
                    30 dias
                    <input
                        type="radio"
                        name="periodo"
                        value={60}
                        onChange={handleDataChangeRetornado}
                    />
                    60 dias
                    <input
                        type="radio"
                        name="periodo"
                        value={90}
                        onChange={handleDataChangeRetornado}
                    />
                    90 dias
                    <input
                        type="radio"
                        name="periodo"
                        value={0}
                        onChange={handleDataChangeRetornado}
                    />
                    Outro
                </label>
                {showDatesRetornado && (
                    <div
                        style={{
                            display: "flex",
                            width: "fit-content",
                            margin: "0 auto",
                            marginTop: "10px",
                            marginBottom: "10px",
                        }}
                    >
                        <input type="date" name="dataInicial" onChange={handleDataInicioChangeRetornado}/>
                        <p style={{ color: "#000", fontSize: "medium" }}>até</p>
                        <input type="date" name="dataFinal" onChange={handleDataFimChangeRetornado}/>
                    </div>
                )}
                {/* Table de chamados encerrados */}
                <table>
                    <thead>
                        <tr>
                            <th
                                colSpan={8}
                                style={{
                                    color: "#fff",
                                    backgroundImage:
                                        "linear-gradient(to top, #063E63, #549BC7)",
                                }}
                            >
                                ENCERRADOS
                            </th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>CHAMADO</th>
                            <th>PRIORIDADE</th>
                            <th>ALUNO</th>
                            <th>MATRÍCULA</th>
                            <th>ABERTURA</th>
                            <th>MODIFICAÇÃO</th>
                            <th>FECHAMENTO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chamadosFechado && chamadosFechado.map((chamado, index) => (
                            <tr key={chamado.protocolo}>
                                <td>
                                    <input type="checkbox" onChange={(e) => addOrRemoveSelection(e, chamado.protocolo)}/>
                                </td>
                                <td>{chamado.protocolo}</td>
                                <td>{chamado.prioridade}</td>
                                <td>{chamado.aluno}</td>
                                <td>{chamado.matricula}</td>
                                <td>{chamado.dataAbertura}</td>
                                <td>{chamado.dataMod ? chamado.dataMod.split('T')[0]:""}</td>
                                <td>{chamado.dataFechamento}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <label>
                    <span>Período:</span>
                    <input
                        type="radio"
                        name="periodo"
                        value={30}
                        onChange={handleDataChangeFechado}
                    />
                    30 dias
                    <input
                        type="radio"
                        name="periodo"
                        value={60}
                        onChange={handleDataChangeFechado}
                    />
                    60 dias
                    <input
                        type="radio"
                        name="periodo"
                        value={90}
                        onChange={handleDataChangeFechado}
                    />
                    90 dias
                    <input
                        type="radio"
                        name="periodo"
                        value={0}
                        onChange={handleDataChangeFechado}
                    />
                    Outro
                </label>
                {showDatesFechado && (
                    <div
                        style={{
                            display: "flex",
                            width: "fit-content",
                            margin: "0 auto",
                            marginTop: "10px",
                            marginBottom: "10px",
                        }}
                    >
                        <input type="date" name="dataInicial" onChange={handleDataInicioChangeFechado}/>
                        <p style={{ color: "#000", fontSize: "medium" }}>até</p>
                        <input type="date" name="dataFinal" onChange={handleDataFimChangeFechado}/>
                    </div>
                )}
                <div>
                    <button onClick={(e) => navigateToRevisar()}>Revisar</button>
                    <button onClick={(e) => {setNavigationTarget("novoChamado")}}>Criar novo chamado</button>
                </div>
            </div>

            <Footer mtop="10px" />
        </div>
    );

    return (
        <>
            {navigationTarget === "" && page}
            {navigationTarget === "revisar" && <RevisarChamadoDocente user={user} url={url} token={token} chamados={selectedList} returnToParent={returnToThis}></RevisarChamadoDocente>}
            {navigationTarget === "novoChamado" && <CriarNovoChamado></CriarNovoChamado>}
        </>
    );
};

export default LandingPageDocente;
