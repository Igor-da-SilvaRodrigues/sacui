import React, { useEffect, useRef, useState } from 'react'
import { 
    MDBContainer, MDBRow, MDBCol,
    MDBTable, MDBTableHead, MDBTableBody,
    MDBBtn, MDBCheckbox, MDBIcon,
    MDBTooltip 
} from 'mdb-react-ui-kit';

/**
 * Uma tabela com cabeçalhos ordenáveis e legenda 
 * @param {*} headers Uma lista de objetos, cada objeto deve ter o nome do cabeçalho ("nome"), seu nome de exibição ("nomeDisplay") e uma função de ordenação ("doSort"). 
 * Esta função de ordenação receberá como argumento o modo de ordenação, que pode ser crescente ("asc") ou decrescente ("desc") E o nome da coluna que está sendo ordenada atualmente ("" se não ordenado) 
 * Se a função de ordenação não estiver presente, a coluna não será ordenável.
 * @param {*} data Uma lista de objetos, cada objeto deve possuir atributos com os nomes dos cabeçálhos
 * @param {*} caption Uma legenda para a tabela.
 * @param {boolean} selectable Se a table possuirá uma coluna para seleção de conteúdo. Caso true, deverá ser passado também um callback para lidar com as mudanças de estado dos items
 * @param {*} onSelect Um callback para receber o item que mudou de estado, e se ele foi selecionado ou descelecionado. Depende de selectable=true
 * @param {*} onClearSelection Um callback para receber o evento emitido quando o usuário preciona o botão de limpar seleção. Útil para atualizar uma lista externa de itens por exemplo. Depende de selectable=true
 * @returns 
 */
const SorteableTable = ({headers, data, caption, selectable, onSelect, onClearSelection, children}) => {
    const [sortOrder, setSortOrder] = useState("asc")
    const [sortType, setSortType] = useState("")
    
    //um array de valores booleanos, cada um representa o estado de check de um item da tabela de mesmo índice.
    const [isSelectedIndexes, setIsSelectedIndexes] = useState(data.map(()=>{
        return false;
    }));
    
    useEffect(()=>{
        //qualquer mudança nos dados provavelmente invalidaria a seleção, então...
        clearSelection();
        onClearSelection();
    }, [data])

    const clearSelection = ()=>{
        //converte todos os items em falso
        setIsSelectedIndexes(isSelectedIndexes.map(()=>{return false;}))
        onClearSelection();
    }

    //configurando sort
    useEffect(()=>{
        //achar header que tenha o nome do tipo atual
        const header = headers.find(h => h["nome"] === sortType);
        //se achar, chame a função de sort do header.
        if(header != undefined && header["doSort"] != undefined){
            //limpe a seleção, pois ela é inválida agora.
            selectable && clearSelection();
            console.log(`sorting ${sortOrder} ${sortType}`);
            header.doSort(sortOrder, sortType);
        }
    }, [sortOrder, sortType])

  return (
    <>
    <div className='border rounded shadow-sm'>
        <MDBTable className='table-hover table-light m-0'>
            <caption className='ms-3 p-0'>{caption}</caption>
            <MDBTableHead className='table-secondary'>
                <tr >
                    {selectable && (<th id='select' className='text-center'>
                        <MDBTooltip title="Limpar seleção" wrapperProps={{size:"sm", onClick:()=>{clearSelection()}}}>
                            <MDBIcon fas icon="sync-alt" />
                        </MDBTooltip>
                    </th> )}
                    {
                        headers.map(
                            (value, index) => {
                                if(value["doSort"] != undefined){
                                    return (
                                    <th scope='col'
                                        onClick={()=>{
                                            if(sortType != value["nome"]){
                                                //se não estiver ordenando, apenas mude o sujeito de ordenação
                                                setSortType(value["nome"])
                                            }else{
                                                //se já estiver ordenando, inverta ordem
                                                
                                                setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                                            }
                                    }}>
                                        {value["nomeDisplay"]}&nbsp;&nbsp;
                                        {
                                            sortType === value["nome"] && (
                                            sortOrder === "asc" ?
                                                <MDBIcon fas icon="caret-up"/>
                                            :
                                                <MDBIcon fas icon="caret-down" />)
                                        }
                                    </th>)
                                }
        
                                return <th scope='col'>{value.nomeDisplay}</th>
                            }
                        )
                    }
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {
                    data.map(
                        (value, index) => {
                            return <tr>
                                {selectable && (<td className='text-center'>
                                    <MDBCheckbox 
                                        checked={isSelectedIndexes[index]}
                                        onChange={
                                            ()=>{
                                                const newIsSelectedIndexes = [...isSelectedIndexes];
                                                //inverter seleção
                                                newIsSelectedIndexes[index] = !isSelectedIndexes[index];

                                                setIsSelectedIndexes(newIsSelectedIndexes);
                                                //chamar callback passando item alterado e valor de seleção
                                                onSelect(value, newIsSelectedIndexes[index]);
                                            }
                                        }
                                    />
                                </td>)}
                                {
                                    headers.map(
                                        (header, headerI) => {
                                                return <td scope="row">
                                                {value[header.nome]}
                                            </td>
                                        }
                                    )
                                }
                            </tr>
                        }
                    )
                }
            </MDBTableBody>
        </MDBTable>
        
    </div>
    <div className='mt-3 p-1 '>
            {children}
    </div>
    </>
  )
}

export default SorteableTable