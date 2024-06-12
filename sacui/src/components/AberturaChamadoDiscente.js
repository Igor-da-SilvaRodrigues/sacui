import Footer from "./Footer";
import Header from "./Header";
import React, { useEffect, useState } from 'react'

import { useGetAllTipoChamado } from '../hooks/useGetAllTipoChamado';
import { useCreateChamado } from '../hooks/useCreateChamado';
import "./AberturaChamadoDiscente.css";
import ProtocoloChamado from './ProtocoloChamado'

const AberturaChamadoDiscente = ({ user, url, token }) => {
  const { isLoading: isLoadingTipoChamado, isError: isErrorTipoChamado, error: errorTipoChamado, statusCode: statusCodeTipoChamado, tipos } = useGetAllTipoChamado(`${url}/tipochamado?`, token)
  const [selectedTipo, setSelectedTipo] = useState(null)
  const [selectedMotivo, setSelectedMotivo] = useState(null)
  const [justificativa, setJustificativa] = useState("")
  const { commit, isLoading: isLoadingCreateChamado, isError: isErrorCreateChamado, error: errorCreateChamado, statusCode: statusCodeCreateChamado, chamado } = useCreateChamado(`${url}/chamado?`, token)
  const [target, setTarget] = useState("");
  

  const handleSelectChamadoChange = (e) => {
    setSelectedTipo(tipos.find(tipo => tipo["tipo"] === e.target.value));
  }

  const handleSelectMotivoChange = (e) => {
    setSelectedMotivo(e.target.value)
  }
  const handleJustificativaChange = (e) => {
    setJustificativa(e.target.value)
  }

  //abrir chamado
  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedMotivo == null || selectedTipo == null || selectedMotivo === "default" || !justificativa) {
      alert("Por favor preencha o formulário!")
      return
    }
    commit({
      "idTipoChamado": selectedTipo["tipo"],
      "idMotivo": selectedMotivo,
      "justificativa": justificativa,
      "dataAbertura": "2012-12-24",//a data vai ser sobrescrita pela data atual no backend
      "idDiscente": user["matricula"]
    })
  }

  //redirecionar para pagina tal quando concluir a requisição
  useEffect(()=>{
    if (isLoadingCreateChamado === false && isErrorCreateChamado === false && statusCodeCreateChamado === 200 && chamado != null){
      setTarget("protocolo")
    }
  }, [isLoadingCreateChamado, isErrorCreateChamado, statusCodeCreateChamado, chamado])

  const page = (
    <div>
      <Header />
      <h1 style={{textAlign:'center'}}>Abertura de chamado:</h1>
      <label className="aberturaChamado">
        <span>Chamado</span>
        <select name="tipoChamado" defaultValue={"default"} onChange={handleSelectChamadoChange}>
          <option value="default"> -- Por favor selecione uma opção -- </option>
          {tipos != null && tipos.map((tipoChamado) => (
            <option value={tipoChamado['tipo']}>{tipoChamado['tipo']}</option>
          ))}
        </select>
        <span>Motivo</span>
        <select name="motivo" onChange={handleSelectMotivoChange}>
          <option value="default"> -- Por favor selecione uma opção -- </option>
          {selectedTipo != null && selectedTipo["motivos"].map((motivo) => (
            <option value={motivo}>{motivo}</option>
          ))}
        </select>
        <span>Justificativa:</span>
        <textarea
          name="justificativa"
          placeholder="Detalhe o motivo de seu chamado."
          rows={15}
          style={{ resize: "none" }}
          onChange={handleJustificativaChange}
        ></textarea>
        <input type="submit" className="submit" onClick={handleSubmit}/>
      </label>
      <Footer pos="fixed" bot={0} />
    </div>
  )


  return (
    <>
      {target === "" && page}
      {target === "protocolo" && <ProtocoloChamado chamado={chamado} returnToParent={()=>{setTarget("")}}></ProtocoloChamado>}
    </>
  );
};

export default AberturaChamadoDiscente;
