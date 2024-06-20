import { useState, useEffect } from "react"
import { useGet } from "./useGet";

/**
 * Hook que resgata todos os setores
 * 
 * Consome o endpoint {@link https://igor-da-silvarodrigues.github.io/sacapi/#/Setor/findAllSetores findAllSetores}
 * @param {*} url a url do endpoint
 * @param {*} token O token de autenticação
 */
export const useGetAllSetores = (url, token) => {
    const [setores, setSetores] = useState(null);

    const { isLoading, isError, error, statusCode, response } = useGet(`${url}?`, null, {
        'Authorization': `Bearer ${token}`
    })

    useEffect(() => {
        const treatData = async () => {
            //inicialmente, os dados serão nulos pois a requisição ainda não terminou. Trataremos os dados
            //somente quando a requisição terminar e der tudo certo
            if (!isError && response != null && statusCode === 200){
                console.log("Completed useGetAllSetores")
                setSetores(await response.json())
            }
        }
        treatData()
    },
     //dependemos destas variáveis, repetiremos o tratamento caso elas mudem, pois significa que a requisição terminou
     [isError, statusCode, response]
    )

    //retornamos muitas informações , mas o principal aqui é statusCode e isError para conhecer o estado da requisição
    //e setores que são os dados em si.
    return { isLoading, isError, error, statusCode, setores };
}