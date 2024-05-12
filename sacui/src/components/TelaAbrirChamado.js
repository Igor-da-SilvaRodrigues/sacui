import React, { useEffect, useState } from 'react'
import {
    MDBContainer,
    MDBBtn, MDBTextArea
} from 'mdb-react-ui-kit';
import { useGetAllTipoChamado } from '../hooks/useGetAllTipoChamado';
import { useCreateChamado } from '../hooks/useCreateChamado';

/**
 * Representa a tela de abertura de chamados
 * @param {object} user dados do usuário, contendo nome, matrícula e status de admin.
 * @param {string} url A url da api.
 * @param {string} token o token da sessão. 
 * @param {*} onAbrirChamado um callback que será chamado quando um chamado for aberto com sucesso, pode ser usado caso exista alguma operação do componente pai que dependa do sucesso da abertura do chamado, como por exemplo, o desmontamento/fechamento deste componente
 * @param {*} onError um callback que será chamado quando algo der errado na abertura, e caso o componente pai deseje tratar esse erro de alguma forma. O callback recebe um objeto contendo os erros como argumento no seguinte formato:{errorCreateChamado, errorTipoChamado}.
 * @returns 
 */
const TelaAbrirChamado = ({ user, url, token, onAbrirChamado, onError}) => {
    const { isLoading: isLoadingTipoChamado, isError: isErrorTipoChamado, error: errorTipoChamado, statusCode: statusCodeTipoChamado, tipos } = useGetAllTipoChamado(`${url}/tipochamado?`, token)
    const [selectedTipo, setSelectedTipo] = useState(null)
    const [selectedMotivo, setSelectedMotivo] = useState(null)
    const [justificativa, setJustificativa] = useState("")
    const {commit, isLoading: isLoadingCreateChamado, isError: isErrorCreateChamado, error: errorCreateChamado, statusCode: statusCodeCreateChamado, chamado} = useCreateChamado(`${url}/chamado?`, token)

    const handleSelectChamadoChange = (e)=>{
        setSelectedTipo(tipos.find(tipo => tipo["tipo"] === e.target.value))
    }

    const handleSelectMotivoChange = (e)=>{
        setSelectedMotivo(e.target.value)
    }
    const handleJustificativaChange = (e)=>{
        setJustificativa(e.target.value)
    }

    //abrir chamado
    const handleSubmit = (e) => {
        e.preventDefault()
        commit({
            "idTipoChamado": selectedTipo["tipo"],
            "idMotivo": selectedMotivo,
            "justificativa": justificativa,
            "dataAbertura": "2012-12-24",//a data vai ser sobrescrita pela data atual no backend
            "idDiscente": user["matricula"]
          })
    }

    //lógica para acionar os callbacks
    useEffect(()=>{
        //caso algum erro tenha ocorrido, não faça nada e chame o callback de erro
        if(isErrorCreateChamado || isErrorTipoChamado){
            onError != undefined && onError({errorCreateChamado, errorTipoChamado}); // execute onError apenas se ele for fornecido
        }else if(chamado != null && statusCodeCreateChamado === 200){//chamado ainda pode ser nulo mesmo que não haja erro, evitando chamar callback neste caso.  
            onAbrirChamado != undefined && onAbrirChamado();//execute onAbrirChamado apenas se ele for fornecido
        }
    }, [chamado, statusCodeCreateChamado, isErrorCreateChamado, isErrorTipoChamado])

    return (
        <MDBContainer className='mt-5 border rounded col-6 p-5 pb-4'>
            {/* Título de boas vindas */}
            <h3 className='mb-5'>Abrir chamado</h3>


            <form action="#" onSubmit={handleSubmit} className='d-grid gap-3'>
                <div className='d-flex'>
                    Chamado
                    <select defaultValue={"default"} className=' ms-3 border rounded flex-fill bg-white text-dark' onChange={handleSelectChamadoChange}>
                        <option value="default"> -- Por favor selecione uma opção -- </option>
                        {tipos != null && tipos.map((value, index) => {
                            return <option key={index} value={value["tipo"]}>{value["tipo"]}</option>
                        })}
                    </select>
                </div>
                <div className='d-flex'>
                    Motivo
                    <select defaultValue={"default"} className=' ms-3 border rounded flex-fill bg-white text-dark' onChange={handleSelectMotivoChange}>
                        <option value="default"> -- Por favor selecione uma opção -- </option>
                        {selectedTipo != null && selectedTipo["motivos"].map((value, index) => {
                            return <option key={index} value={value}>{value}</option>
                        })}
                    </select>
                </div>
                <MDBTextArea label='Justificativa' rows={4} onChange={handleJustificativaChange}></MDBTextArea>
                <MDBBtn type='submit'>Enviar</MDBBtn>
            </form>
            <span style={{ visibility: isLoadingTipoChamado || isLoadingCreateChamado ? "visible" : "hidden" }} className=''>Carregando...</span>
        </MDBContainer>
    )
}

export default TelaAbrirChamado