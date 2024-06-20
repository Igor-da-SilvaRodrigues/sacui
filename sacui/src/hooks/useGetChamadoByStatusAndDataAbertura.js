import { useEffect, useState } from "react"
import { useGet } from "./useGet"

/**
 * Hook que resgata uma lista de todos os chamados filtrados por status e data de abertura.
 * Caso a data de fim não seja especificada, não haverá limite superior. 
 * E caso a data de início não seja especificada, não haverá limite inferior.
 * Caso nenhuma data seja especificada, não haverá limite algum
 * 
 * Consome o endpoint {@link https://igor-da-silvarodrigues.github.io/sacapi/#/Chamado/getChamadoByStatusAndDataAbertura getChamadoByStatusAndDataAbertura}
 * @param {*} url a url do endpoint
 * @param {*} params os parâmetros de query que controlam paginação. Se nulo, não haverá paginação
 * @param {*} status O status que deseja resgatar
 * @param {*} dataInicio A data de menor valor do período (inclusivo) -- A data mais antiga
 * @param {*} dataFim A data de maior valor do período (inclusivo) -- A data mais recente
 * @param {*} token O token de sessão
 */
export const useGetChamadoByStatusAndDataAbertura = (url, params, token) => {
    const [chamados, setChamados] = useState(null);

    const {isLoading, isError, error, statusCode, response} = useGet(`${url}?`, params,{
            'Authorization': `Bearer ${token}`
        }
    )

    useEffect(() => {
        const treatData = async () => {
            //inicialmente, os dados serão nulos pois a requisição ainda não terminou. Trataremos os dados
            //somente quando a requisição terminar e der tudo certo
            if(!isError && response != null && statusCode === 200){
                console.log("Completed getChamadoByStatusAndDataAbertura");
                setChamados(await response.json());
            }
        }
        treatData();
    },
    //dependemos destas variáveis, repetiremos o tratamento caso elas mudem, pois significa que a requisição terminou
    [isError, statusCode, response]);

    //retornamos muitas informações , mas o principal aqui é statusCode e isError para conhecer o estado da requisição
    //e chamados que são os dados em si.
    return {isLoading, isError, error, statusCode, chamados}
}