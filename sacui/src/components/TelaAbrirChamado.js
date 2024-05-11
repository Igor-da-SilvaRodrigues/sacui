import React, { useEffect, useState } from 'react'
import {
    MDBContainer, MDBRow, MDBCol,
    MDBTable, MDBTableHead, MDBTableBody,
    MDBBtn, MDBCheckbox, MDBIcon,
    MDBPagination, MDBPaginationItem, MDBPaginationLink, MDBTextArea
} from 'mdb-react-ui-kit';
import { useGetAllTipoChamado } from '../hooks/useGetAllTipoChamado';

/**
 * Representa a tela de abertura de chamados
 * @param {object} user dados do usuário, contendo nome, matrícula e status de admin.
 * @param {string} url A url da api.
 * @param {string} token o token da sessão. 
 * @returns 
 */
const TelaAbrirChamado = ({ user, url, token }) => {
    const { isLoading, isError, error, statusCode, tipos } = useGetAllTipoChamado(`${url}/tipochamado?`, token)
    const [selectedTipo, setSelectedTipo] = useState(null)
    const [selectedMotivo, setSelectedMotivo] = useState(null)


    const handleSelectChamadoChange = (e)=>{
        setSelectedTipo(tipos.find(tipo => tipo["tipo"] === e.target.value))
    }

    const handleSelectMotivoChange = (e)=>{
        setSelectedMotivo(e.target.value)
        console.log(`Choosing ${e.target.value}`)
    }

    return (
        <MDBContainer className='mt-5 border rounded col-6 p-5 pb-4'>
            {/* Título de boas vindas */}
            <h3 className='mb-5'>Abrir chamado</h3>


            <form action="#" className='d-grid gap-3'>
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
                <MDBTextArea label='Justificativa' rows={4}></MDBTextArea>
                <MDBBtn>Enviar</MDBBtn>
            </form>
            <span style={{ visibility: isLoading ? "visible" : "hidden" }} className=''>Carregando...</span>
        </MDBContainer>
    )
}

export default TelaAbrirChamado