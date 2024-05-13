import { useState, useEffect } from "react"
import { usePost } from "./usePost"


/**
 * Hook que cria um chamado
 * 
 * Consome o endpoint {@link https://igor-da-silvarodrigues.github.io/sacapi/#/Chamado/createChamado createChamado}
 * 
 * Este hook não faz o request imediatamente após o uso para evitar a inserção prematura de dados nulos.
 * Em em vez disso, este hook retorna uma função "commit" que deve ser usada para confirmar a inserção (preferencialmente em resposta a algum evento), passando para ela o chamado que será criado.
 * @param {*} url a url do endpoint
 * @param {*} token o token de sessão
 * @returns
 */
export const useCreateChamado = (url, token) =>{
    const [chamado, setChamado] = useState(null)
    const {commit, isLoading, isError, error, statusCode, response} = usePost(url, {
        'Authorization': `Bearer ${token}`
    })

    //lógica para resgatar o chamado que acabou de ser criado
    useEffect(()=>{
        const treatData = async () => {
            //inicialmente, os dados serão nulos pois a requisição ainda não terminou. Trataremos os dados
            //somente quando a requisição terminar e der tudo certo
            if(!isError && response != null &&  statusCode === 200){
                console.log("Completed useCreateChamado");
                setChamado(await response.json());
            }
        }
        treatData();
        
    }, 
    //dependemos destas variáveis, repetiremos o tratamento caso elas mudem , pois signifia que a requisição terminou
    //Isso deve acontecer apenas uma vez, pois este é o comportamento de usePost.
    [isError, statusCode, response]);

    //retornamos o chamado que acabou de ser criado, juntamente com informações relevantes
    return {commit, isLoading, isError, error, statusCode, chamado}
}