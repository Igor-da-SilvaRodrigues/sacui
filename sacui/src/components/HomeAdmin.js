import React, { useEffect, useRef, useState } from 'react'
import {
    MDBContainer, MDBRow, MDBCol,
    MDBTable, MDBTableHead, MDBTableBody,
    MDBBtn, MDBCheckbox, MDBIcon,
    MDBPagination, MDBPaginationItem, MDBPaginationLink
} from 'mdb-react-ui-kit';
import SorteableTable from './SorteableTable';
import './HomeAdmin.css'
import { useGetAllChamados } from '../hooks/useGetAllChamados';

/**
 * Representa a tela home do admin, contendo uma lista de todos os chamados e botões para o tratamento dos chamados.
 * @param {object} user dados do usuário, contendo nome, matrícula e status de admin.
 * @param {string} url A url da api.
 * @param {string} token o token da sessão. 
 * @returns 
 */
const HomeAdmin = ({ user, url, token }) => {
    const [params, setParams] = useState({ page: 0, size: 10 })
    const { isLoading, isError, error, statusCode, chamados } = useGetAllChamados(`${url}/chamado?`, params, token);
    const [chamadosData, setChamadosData] = useState(null);
    const [selectedList, setSelectedList] = useState([]);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortType, setSortType] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        //aqui deve ser feitos qualquer tratamento dos dados. 
        //Por exemplo, poderia-se traduzir os numeros de prioridade para palavras e melhorar o entendimento do usuário.
        //quando chamados forem populados, iserir a checkbox
        if (chamados != null) {
            const newChamados = [...chamados];
            setChamadosData(newChamados);
        }
    }, [chamados])

    useEffect(()=>{

        if(sortType != null && sortOrder != null){
            setParams({
                page: pageNumber,
                size: pageSize,
                sort: `${sortType},${sortOrder}`
            });
        }else{
            setParams({
                page: pageNumber,
                size: pageSize
            });    
        }
    }, [pageNumber, pageSize, sortOrder, sortType]);


    //headers da tabela, cada um com um nome e nome de display, e funcionalidade de sort para apenas alguns.
    const headers = [
        { nome: "protocolo", nomeDisplay: "Protocolo" },
        {
            nome: "prioridade", nomeDisplay: "Prioridade", doSort: (ordem, sujeito) => {
                console.log(ordem, sujeito);
                setSortOrder(ordem);
                setSortType("tipoChamado.prioridade");
            }
        },
        {
            nome: "status", nomeDisplay: "Status", doSort: (ordem, sujeito) => {
                console.log(ordem, sujeito);
                setSortOrder(ordem);
                setSortType("status");
            }
        },
        {
            nome: "dataAbertura", nomeDisplay: "Data de Abertura", doSort: (ordem, sujeito) => {
                console.log(ordem, sujeito);
                setSortOrder(ordem);
                setSortType("dataAbertura");
            }
        }
    ]

    const caption = "Lista de chamados"

    const nextPage = () => {
        setPageNumber(pageNumber + 1);
        
        // setParams({
        //     page: pageNumber,
        //     size: pageSize,
        //     sort: `${sortType},${sortOrder}`
        // });
    }

    const prevPage = () => {
        setPageNumber(pageNumber - 1);
    }

    return (
        <MDBContainer className=' pb-3 pt-3'>
            {/* Título de boas vindas */}
            <MDBRow className='m-1  mb-5'>{/* margin 1 */}
                <MDBCol className='text-center'>
                    <h1>Olá, {user.nome} 👋</h1>
                </MDBCol>
            </MDBRow>

            {/* Tabela de chamados */}
            <MDBRow className=''>
                <MDBCol className=''>
                    {/* Temos que tomar cuidado aqui para não perder o estado de SorteableTable. Se ele não for renderizado
                    seu estado será perdido, isso inclui sua ordenação interna. Para solucionar isso, nunca deixamos
                    de renderizar a tabela, a não ser que um erro ocorra, onde seria aceitável perder o estado do componente */}

                    {/* Como alternativa, poderiamos modificar a tabela e externalizar o estado de sort para HomeAdmin,
                    e passarmos o estado de sort como props para a tabela. Porém, conceitualmente, para mim faz menos sentido
                    que o estado de sort seja externo à tabela */}

                    {/* E estéticamente falando, acho feio que a tabela desapareça durante o carregamento. Acho mais correto
                    que o elemento que sinaliza o carregamento seja o que aparece e desaparece quando necessário. O que evita
                    todo o problema de uma vez, permitindo que a tabela fique sempre visível. */}
                    {<p style={{ visibility: isLoading ? "visible" : "hidden" }}>Carregando...</p>}
                    {
                        isError ? console.log(error) && <p>Um erro ocorreu</p> :
                            chamadosData != null ? <SorteableTable
                                headers={headers}
                                data={chamadosData}
                                caption="Lista de chamados"
                                selectable={true}
                                onSelect={(value, isSelected) => {
                                    if (isSelected) {
                                        //adicionar a lista
                                        setSelectedList([...selectedList, value])
                                    } else {
                                        //remover da lista
                                        setSelectedList(selectedList.filter((item) => item["protocolo"] != value["protocolo"]))
                                    }
                                }}
                                onClearSelection={() => {
                                    setSelectedList([]);
                                    console.log("Seleção limpa")
                                }}
                            >
                                
                            <MDBPagination  className='justify-content-center m-0 text-sm'>
                                <MDBPaginationItem className='me-2 shadow-sm rounded border'>
                                    <MDBPaginationLink href='#' onClick={(e)=>{
                                        e.preventDefault();
                                        if(pageNumber > 0){
                                            prevPage();
                                        }
                                    }} className='p-4'>«</MDBPaginationLink>
                                </MDBPaginationItem>
                                <MDBPaginationItem>
                                    <MDBPaginationLink className='p-4'>{pageNumber}</MDBPaginationLink>
                                </MDBPaginationItem>
                                <MDBPaginationItem className='ms-2 shadow-sm rounded border'>
                                    <MDBPaginationLink href='#' onClick={(e)=>{
                                        e.preventDefault();
                                        nextPage();
                                        }} className='p-4'>»</MDBPaginationLink>
                                </MDBPaginationItem>
                            </MDBPagination>
                                
                            </SorteableTable>
                                : <p>Você não deveria estar vendo isso...</p>
                    }
                </MDBCol>
            </MDBRow>

            {/* botões de interação */}
            <div className='mt-5 d-flex justify-content-between'>
                <MDBBtn className='me-4 pe-5 ps-5 c-primary' >Criar</MDBBtn>
                <MDBBtn className='pe-5 ps-5 c-secondary' color='secondary' onClick={() => { console.log(selectedList) }}>Revisar</MDBBtn>
                <MDBBtn className='ms-4 pe-5 ps-5' color='danger'>Sair</MDBBtn>
            </div>
        </MDBContainer>
    )
}

export default HomeAdmin