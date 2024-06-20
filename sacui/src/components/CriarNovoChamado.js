import Footer from "./Footer"
import Header from "./Header"
import WaterMark from "./WaterMark"
import "./CriarNovoChamado.css"
import { useState } from "react"
import { useCreateTipoChamado } from "../hooks/useCreateTipoChamado"


/**
 * Tela para criar um novo tipo de chamado
 * 
 * @param {*} user O objeto de usuário
 * @param {*} url A url da api
 * @param {*} token O token de autenticação 
 * @param {*} returnToParent Callback para fechar esta tela
 * @returns 
 */
const CriarNovoChamado = ({ user, url, token, returnToParent }) => {
  const [motivos, setMotivos] = useState(['']);
  const [nomeTipo, setNomeTipo] = useState(null);
  const [prioridade, setPrioridade] = useState(0);
  const {commit, isLoading, isError, error, statusCode} = useCreateTipoChamado(`${url}/tipochamado`, token)


  const adicionarMotivo = () => {
    if (motivos.every(motivo => motivo.trim() !== '')) {
        setMotivos([...motivos, '']);
    } else {
        alert("Por favor, preencha todos os motivos antes de adicionar um novo.");
    }
  };

  const handleMotivoChange = (index, value) => {
    const novosMotivos = [...motivos];
    novosMotivos[index] = value;
    setMotivos(novosMotivos);
  };

  const resgatarMotivos = () => {
    return motivos.filter(motivo => motivo.trim() !== '');
  };

  const close = () => {
    returnToParent()
  }

  const save = async () => {
    if (!nomeTipo){
      alert("Preencha o nome do tipo!")
      return;
    }

    if (resgatarMotivos().length == 0){
      alert("Preencha com possíveis motivos!")
      return;
    }

    console.log(nomeTipo)
    console.log(resgatarMotivos())
    console.log(prioridade)

    await commit({
      tipo: nomeTipo,
      motivos: [...resgatarMotivos()],
      prioridade: Number(prioridade)
    })

    close() //fechar após salvar
  }

  return (
    <div>
        <Header />
        <WaterMark />
        <h1>CRIAR NOVO CHAMADO</h1>
        <label className="novochamado">
            <span>Nome do chamado:</span>
            <input type="text" name="nome" placeholder="Digite um nome para o novo chamado" value={nomeTipo} onChange={(e)=>{setNomeTipo(e.target.value)}} />
            <span>Possíveis motivos:</span>
            {motivos.map((motivo, index) => (
              <input
                  key={index}
                  type="text"
                  name={`motivo${index}`}
                  value={motivo}
                  onChange={(e) => handleMotivoChange(index, e.target.value)}
                  placeholder="Digite uma opção..."
              />
            ))}
            <button type="button" onClick={adicionarMotivo}>Adicionar Motivo</button>
            <span>Prioridade:</span>
            <select name="prioridade" value={prioridade} onChange={(e)=>{setPrioridade(e.target.value)}}>
                <option value={0}>Baixa</option>
                <option value={1}>Média</option>
                <option value={2}>Alta</option>
            </select>
            <div>
                <button onClick={close}>Cancelar</button>
                <button onClick={save}>Salvar</button>
            </div>
        </label>
        <Footer pos={"fixed"} bot={0} />
    </div>
  )
}

export default CriarNovoChamado