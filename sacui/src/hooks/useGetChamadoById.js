import { useEffect, useState } from "react";
import { useGet } from "./useGet";

/**
 * Hook que resgata os detalhes de um chamado.
 *
 * Consome o endpoint {@link https://igor-da-silvarodrigues.github.io/sacapi/#/Chamado/getChamadoById getChamadoById}
 * @param {*} url a url do endpoint
 * @param {*} params os parametros de query que controlam a paginação. Se nulo, não haverá paginação.
 * @param {*} chamadoId O Id do chamado que deseja resgatar as informações
 * @param {*} token o token de sessão
 * @returns
 */
export const useGetChamadoById = (url, params, chamadoId, token) => {
  const [chamado, setChamado] = useState(null);

  //não executar nada por padrão, porque o ID pode estar nulo
  const [shouldExecute, setShouldExecute] = useState(false);

  const { isLoading, isError, error, statusCode, response } = useGet(
    `${url}/${chamadoId}?`,
    params,
    {
      Authorization: `Bearer ${token}`,
    },
    shouldExecute
  );

  //ativando a funcionalidade se  o chamado não for nulo, e desativando caso seja
  useEffect(() => {
    if (chamadoId === null || chamadoId === "") {
      setShouldExecute(false);
    } else {
      setShouldExecute(true);
    }
  }, [chamadoId]);

  useEffect(
    () => {
      const treatData = async () => {
        //inicialmente, os dados serão nulos pois a requisição ainda não terminou. Trataremos os dados
        //somente quando a requisição terminar e der tudo certo
        if (!isError && response != null && statusCode === 200) {
          console.log("Completed useGetChamadosByUser");
          setChamado(await response.json());
        }
      };
      treatData();
    },
    //dependemos destas variáveis, repetiremos o tratamento caso elas mudem, pois significa que a requisição terminou
    [isError, statusCode, response]
  );

  //retornamos muitas informações , mas o principal aqui é statusCode e isError para conhecer o estado da requisição
  //e chamados que são os dados em si.
  return { isLoading, isError, error, statusCode, chamado };
};
