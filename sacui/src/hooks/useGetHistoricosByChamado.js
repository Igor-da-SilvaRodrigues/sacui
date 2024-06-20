import React, { useEffect, useState } from 'react'
import { useGet } from "./useGet"

/**
 * Hook que resgata todos os históricos de um chamado
 * 
 * Consome o endpoint {@link https://igor-da-silvarodrigues.github.io/sacapi/#/Historico/findHistoricosByChamado findHistoricosByChamado}
 * @param {*} url a url do endoint
 * @param {*} params os parâmetros, como ordenação e paginação
 * @param {*} protocolo O protocolo do chamado em questão
 * @param {*} token O token de autenticação
 * @returns 
 */
export const useGetHistoricoByChamado = (url, params, protocolo, token) => {
  const [historicos, setHistoricos] = useState(null)
  
  const {isLoading, isError, error, statusCode, response} = useGet(`${url}/${protocolo}?`, params, {
    'Authorization': `Bearer ${token}`
  })

  useEffect(() => {
    const treatData = async () => {
      //inicialmente, os dados serão nulos pois a requisição ainda não terminou. Trataremos os dados
      //somente quando a requisição terminar e der tudo certo
      if (!isError && response != null && statusCode === 200){
        console.log("Completed useGetHistoricoByChamado")
        setHistoricos(await response.json())
      }
    }
    treatData()

  },//dependemos destas variáveis, repetiremos o tratamento caso elas mudem, pois significa que a requisição terminou
  [isError, statusCode, response]);

  //retornamos muitas informações , mas o principal aqui é statusCode e isError para conhecer o estado da requisição
  //e historicos que são os dados em si.
  return {isLoading, isError, error, statusCode, historicos}
}

