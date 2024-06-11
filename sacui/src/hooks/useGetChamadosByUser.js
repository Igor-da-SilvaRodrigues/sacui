import { useEffect, useState } from "react"
import { useGet } from "./useGet"

/**
 * Hook que resgata uma lista de todos os chamados de um usuário.
 * 
 * Consome o endpoint {@link https://igor-da-silvarodrigues.github.io/sacapi/#/Chamado/getAllChamadosByUsuario getAllChamadosByUsuario}
 * @param {*} url a url do endpoint
 * @param {*} params os parametros de query que controlam a paginação. Se nulo, não haverá paginação.
 * @param {*} userId O Id do usuário que deseja resgatar os chamados
 * @param {*} token o token de sessão
 * @returns 
 */
export const useGetChamadosByUser = (url, params, userId, token) => {
    const [chamados, setChamados] = useState(null);

    const effectiveUrl = `${url}/${userId}` // definindo url do request
    
    const {isLoading, isError, error, statusCode, response} = useGet(url, params, {
        'Authorization': `Bearer ${token}`
    })

    useEffect(()=>{
        const treatData = async () => {
            //inicialmente, os dados serão nulos pois a requisição ainda não terminou. Trataremos os dados
            //somente quando a requisição terminar e der tudo certo
            if(!isError && response != null &&  statusCode === 200){
                console.log("Completed useGetChamadosByUser");
                setChamados(await response.json());
            }
        }
        treatData();
        
    }, 
    //dependemos destas variáveis, repetiremos o tratamento caso elas mudem, pois signifia que a requisição terminou
    [isError, statusCode, response]);

    //retornamos muitas informações , mas o principal aqui é statusCode e isError para conhecer o estado da requisição
    //e chamados que são os dados em si.
    return {isLoading, isError, error, statusCode, chamados}
}