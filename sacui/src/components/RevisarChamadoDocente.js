import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import "./RevisarChamadoDocente.css";
import WaterMark from "./WaterMark";
import { useGetChamadoById } from "../hooks/useGetChamadoById";
import { useGetAllSetores } from "../hooks/useGetAllSetores";
import { ChamadoStatus, statusFromString } from "../enums/ChamadoStatus";
import ConfirmModal from "./ConfirmModal";
import { useUpdateChamado } from "../hooks/useUpdateChamado";

/**
 * 
 * @param {*} user  O objeto de usuário
 * @param {*} url A url da api
 * @param {*} token O token de autenticação
 * @param {*} chamados Uma lista com os chamados a serem revisados
 * @param {*} returnToParent um callback para fechar este componente
 * @returns 
 */
const RevisarChamadoDocente = ({ user, url, token, chamados, returnToParent }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [newChamadoList, setNewChamadoList] = useState([])

  //lista com valores booleanos que irão impedir que requisições sejam repetidas desnecessariamente
  //começa com um valor true no índice 0 para permitir a requisição inicial
  const [shouldFetchList, setShouldFetchList] = useState([true])

  const { isLoading: isLoadingChamado, isError: isErroChamado, error: errorChamado, statusCode: statusCodeChamado, chamado } = useGetChamadoById(`${url}/chamado`, chamados[selectedIndex], token, shouldFetchList[selectedIndex]);
  const { isLoading: isLoadingSetores, isError: isErrorSetores, error: errorSetores, statusCode: statusCodeSetores, setores } = useGetAllSetores(`${url}/setor`, token);
  const {commit: commitUpdate, isLoading: isLoadingUpdate, isError: isErrorUpdate, error: errorUpdate, statusCode: statusCodeUpdate} = useUpdateChamado(`${url}/chamado`, token)
  const [displayModal, setDisplayModal] = useState(false)
  const [displayCancelar, setDisplayCancelar] = useState(false)

  //definindo os valores dos novos chamados que serão inseridos na API como uma atualizações
  //inicialmente eles tem o valor do chamado selecionado, mas são """"mutável"""".
  useEffect(()=>{
    // so fazer algo se a requisição for bem sucedida
    if (isErroChamado || statusCodeChamado != 200 || chamado == null){return;}
    
    //carregando a lista de trabalho
    const lista = [...newChamadoList]
    const listaFetch = [...shouldFetchList]

    if (listaFetch.length <= 1){
      // se a lista de fetch ainda estiver no estado inicial, significa que esta é a primeira requisição do ciclo de vida
      //vamos preenche-la com True, para permitir requisições para todos os items da lista de chamado
      for (let i = 0; i < chamados.length; i++){
        listaFetch[i] = true;
      }
    }


    //caso a posição da lista estivesse vazia, significa que essa é a primeira vez que ESSE chamado é carregado
    //inserimos ele na lista de trabalho
    if (newChamadoList[selectedIndex] == null){
      lista[selectedIndex] = {...chamado}
      lista[selectedIndex].originalStatus = chamado.status

      //a partir de agora essa posição está preenchida e não deverá ser substituída por requisições da api
      //para evitar requisições desnecessárias na API marcaremos este índice como false na lista 'shouldFetchList'
      listaFetch[selectedIndex] = false;
    }

    //persistindo mudanças, isso deve ter incrementado o progresso de alteração da pilha de trabalho do usuário,
    //quaisquer mudanças serão persistidas nos items da lista 'newChamadoList', enquanto estes índices não irão gerar mais requisições GET
    setNewChamadoList(lista)
    setShouldFetchList(listaFetch)

  },[isErroChamado, statusCodeChamado, chamado])



  const oldchamados = [
    {
      prot: 123456,
      mot: "Declaração",
      just: "Preciso reativar o Bilhete Único",
    },
  ];

  const responsaveis = ["Secretaria", "Coordenação", "Reitoria"];

  const status = ["Aberto", "Em andamento", "Retornado", "Fechado"];
  
  //mudando status do novo chamado
  const handleStatusChange = (e) => {
    const lista = [...newChamadoList]
    const chamado = {...newChamadoList[selectedIndex], status: e.target.value}

    lista[selectedIndex] = {...chamado}
    setNewChamadoList(lista)
  }

  //mudando o setor do novo chamado
  const handleSetorChange = (e) => {
    const lista = [...newChamadoList]
    const chamado = {...newChamadoList[selectedIndex], setor: e.target.value}

    lista[selectedIndex] = {...chamado}
    setNewChamadoList(lista)
  }

  const handleParecerChange = (e) => {
    const lista = [...newChamadoList]
    const chamado = {...newChamadoList[selectedIndex], parecer: e.target.value}

    lista[selectedIndex] = {...chamado}
    setNewChamadoList(lista)
  }

  const prevChamado = () => {
    if (selectedIndex == 0){
      setSelectedIndex(chamados.length - 1)
    } else {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  const nextChamado = () => {
    if (selectedIndex >= chamados.length-1){
      setSelectedIndex(0)
    } else {
      setSelectedIndex(selectedIndex + 1)
    }
  }
  
  const saveChanges = () => {
    setDisplayModal(true)
  }
  const cancelChanges = () => {
    setDisplayModal(false)
  }

  const confirmChanges = async () => {
    const list = [...newChamadoList]

    for (let i = 0; i < list.length; i++){
      const body = {}
      body.idUsuario = user.matricula
      body.protocolo = list[i].protocolo
      body.status = Number(list[i].status)
      
      if(list[i].parecer){
        body.parecer = list[i].parecer
      }
      if(list[i].setor){
        body.idSetor = list[i].setor
      }
      
      if(list[i].originalStatus != ChamadoStatus.FECHADO){
        const promise = commitUpdate(body);
        
        if(i == list.length-1){
          //estamos no último request, após finalizarmos ele, fecharemos a tela.
          promise.then(()=>{close()})
        }
      }
    }
    setDisplayModal(false)
  }

  const requestClose = () => {
    setDisplayCancelar(true)
  }

  const cancelClose = () => {
    setDisplayCancelar(false)
  }

  const close = () => {
    returnToParent()
  }

  return (
    <div key={new Date().getTime}>
      <ConfirmModal shouldDisplay={displayModal} text="Você tem certeza de que deseja confirmar essas mudanças? Essa ação não pode ser desfeita!" onYes={confirmChanges} onNo={cancelChanges}>
        <div>{newChamadoList && newChamadoList.map((chamado,index) => (
          <div style={{margin: "10px", border: "1px solid lightgray", color:"black", padding:"5px"}}>
            <div style={{color:"red", display:((chamado.originalStatus == ChamadoStatus.FECHADO) ? "block" : "none")}}>Chamado encerrado, não será alterado!</div>
            <div>
              <h5 style={{display:"inline-block"}}>Protocolo:</h5>
              <span style={{color:"black", fontWeight:"normal", marginLeft: '10px'}}>{chamado.protocolo}</span>
            </div>
            <div>
              <span style={{color:"black", fontWeight:"bold"}}>Setor responsável:</span>
              <span style={{color:"black", fontWeight:"normal", marginLeft: '10px'}}>{chamado.setor}</span>
            </div>
            <div>
              <span style={{color:"black", fontWeight:"bold"}}>Parecer:</span>
              <p style={{color:"black", padding:"0px", margin:"0px"}}>{chamado.parecer}</p>
            </div>
            <div>
              <span style={{color:"black", fontWeight:"bold"}}>Status:</span>
              <span style={{color:"black", fontWeight:"normal", marginLeft: '10px'}}>{chamado.status}</span>
            </div>
          </div>
        ))}</div>
      </ConfirmModal>
      <ConfirmModal shouldDisplay={displayCancelar} text="Você tem certeza que deseja descartar essas alterações e retornar para a tela inicial?" onYes={close} onNo={cancelClose} />

      <Header />
      <WaterMark />
      <h1 style={{ marginBottom: "10px" }}>Revisar Chamados - {`(${selectedIndex+1}/${chamados.length})`}</h1>
      <div className="bloco">
        <div className="chamado">
          <h3>Chamado:</h3>
          <p>{newChamadoList[selectedIndex] && newChamadoList[selectedIndex].protocolo}</p>
          <h3>Motivo:</h3>
          <p>{newChamadoList[selectedIndex] && newChamadoList[selectedIndex].motivo}</p>
          <h3>Justificativa:</h3>
          <p>{newChamadoList[selectedIndex] && newChamadoList[selectedIndex].justificativa}</p>
        </div>
        <div className="revisao">
          <h3>Setor responsável:</h3>

          {/* essa expressão seta o Setor responsável como ele achou no chamado resgatado, mas apenas se o chamado e o status não forem nulos */}
          <select 
            name="responsavel"
            value={(newChamadoList[selectedIndex] == null || newChamadoList[selectedIndex].setor == null) ? "" : newChamadoList[selectedIndex].setor}
            onChange={handleSetorChange}
            disabled={newChamadoList && newChamadoList[selectedIndex] && newChamadoList[selectedIndex].originalStatus == ChamadoStatus.FECHADO}
          >
            {setores && setores.map((setor) => (
              <option key={setor.setor} value={setor.setor}>{setor.setor}</option>
            ))}
            <option key ={""} value={""}>Nenhum</option>
          </select>

          <h3>Parecer:</h3>

          <textarea className="nota"
            name="parecer"
            placeholder="Nota técnica."
            value={(newChamadoList[selectedIndex] == null || newChamadoList[selectedIndex].parecer == null )? "" : newChamadoList[selectedIndex].parecer}
            rows={10}
            cols={50}
            style={{ resize: "none" }}
            onChange={handleParecerChange}
            disabled={newChamadoList && newChamadoList[selectedIndex] && newChamadoList[selectedIndex].originalStatus == ChamadoStatus.FECHADO}
          ></textarea>

          <h3>Status:</h3>

          {/* essa expressão seta o status como ele achou, mas apenas se o chamado e o status não forem nulos */}
          <select 
            name="status"
            value={(newChamadoList[selectedIndex] == null || newChamadoList[selectedIndex].status == null) ? "" : newChamadoList[selectedIndex].status}
            onChange={handleStatusChange}
            disabled={newChamadoList && newChamadoList[selectedIndex] && newChamadoList[selectedIndex].originalStatus == ChamadoStatus.FECHADO}
          >
            {status.map((status) => (
              <option key={status} value={statusFromString(status)}>{status}</option>
            ))}
          </select>

        </div>
      </div>
      <button onClick={prevChamado}>Anterior</button>
      <button onClick={nextChamado}>Próximo</button>
      <button>Histórico</button>
      <button onClick={saveChanges}>Salvar</button>
      <button onClick={requestClose}>Fechar</button>
      <Footer pos={"fixed"} bot={0} />
    </div>
  );
};

export default RevisarChamadoDocente;
