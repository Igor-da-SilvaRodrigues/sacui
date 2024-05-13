import { useState, useEffect } from "react"
import { useGet } from "./useGet"

/**
 * Hook que resgata uma lista de todos os tipos de chamado
 * 
 * Consome o endpoint {@link https://igor-da-silvarodrigues.github.io/sacapi/#/TipoChamado/findAllTipoChamado findAllTipoChamado}
 * @param {*} url a url do endpoint
 * @param {*} token o token de sessão
 */
export const useGetAllTipoChamado = (url, token) => {
    const [tipos, setTipos] = useState(null);

    const { isLoading, isError, error, statusCode, response } = useGet(url, null, {
        'Authorization': `Bearer ${token}`
    })

    useEffect(() => {
        const treatData = async () => {
            //inicialmente, os dados serão nulos pois a requisição ainda não terminou. Trataremos os dados
            //somente quando a requisição terminar e der tudo certo
            if (!isError && response != null && statusCode === 200) {
                console.log("Completed useGetAllTipoChamado");
                setTipos(await response.json());
            }
        }
        treatData();
    },
        //dependemos destas variáveis, repetiremos o tratamento caso elas mudem, pois signifia que a requisição terminou
        [isError, statusCode, response]);

    //retornamos muitas informações , mas o principal aqui é statusCode e isError para conhecer o estado da requisição
    //e 'tipos' que são os dados em si.
    return { isLoading, isError, error, statusCode, tipos }
}