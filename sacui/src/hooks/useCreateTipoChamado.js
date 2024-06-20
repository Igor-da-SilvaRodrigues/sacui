import { useState, useEffect } from "react"
import { usePost } from "./usePost"


/**
 * Hook que cria um tipo de chamado
 * 
 * Consome o endpoint {@link https://igor-da-silvarodrigues.github.io/sacapi/#/TipoChamado/createTipoChamado createTipoChamado}
 * 
 * Este hook não faz o request imediatamente após o uso para evitar a inserção prematura de dados nulos.
 * Em em vez disso, este hook retorna uma função "commit" que deve ser usada para confirmar a inserção (preferencialmente em resposta a algum evento), passando para ela o tipo de chamado que será criado.
 * @param {*} url a url do endpoint
 * @param {*} token o token de sessão
 * @returns
 */
export const useCreateTipoChamado = (url, token) =>{
    const {commit, isLoading, isError, error, statusCode, response} = usePost(`${url}?`, {
        'Authorization': `Bearer ${token}`
    })

    useEffect(()=>{
        const treatData = async () => {
            //inicialmente, os dados serão nulos pois a requisição ainda não terminou
            if(!isError && response != null &&  statusCode === 200){
                console.log("Completed useCreateChamado");
            }
        }
        treatData();
    }, 
    //dependemos destas variáveis, repetiremos o tratamento caso elas mudem , pois signifia que a requisição terminou
    //Isso deve acontecer apenas uma vez, pois este é o comportamento de usePost.
    [isError, statusCode, response]);

    return {commit, isLoading, isError, error, statusCode}
}