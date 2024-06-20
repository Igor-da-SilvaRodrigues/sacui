import { useEffect, useState } from "react"

/**
 * Executa um GET request no endpoint especificado.
 * 
 * @param {string} url a url do endpoint
 * @param {object} params os parametros de query, como paginação por exemplo
 * @param {object} headers os headers, como Authorization e Content-Type
 * @param {boolean} shouldExecute flag para desativar o comportamento do hook. Se falso, nenhuma requisição é enviada. Default = true
 * @returns 
 */
export const useGet = (url, params, headers, shouldExecute = true) => {
    const [isLoading, setIsLoading] = useState(false);
    
    const [error, setError] = useState(null);
    const [isError, setIsError] = useState(false);

    const [response, setResponse] = useState(null);
    const [statusCode, setStatusCode] = useState(null);

    useEffect(()=>{
        if(!shouldExecute){
            return; // não fazer nada caso a flag seja falsa
        }

        const doGet = async()=>{
            setIsLoading(true);
            setIsError(false);
            
            //ignorando parâmetros nulos 
            let filteredParams = {}
            for (let key in params){
                if(params[key] !== null){
                    filteredParams[key] = params[key]
                }
            }

            try{
                const response = await fetch(
                    url + new URLSearchParams(filteredParams),
                    {
                        method: "GET",
                        headers: headers,
                    }
                )
                setStatusCode(response.status);
                setResponse(response);
            }catch(error){
                setError(error);
                setIsError(true);
            }finally{
                setIsLoading(false);
            }
        }
        doGet();//execute get
    }, [url, params, shouldExecute]);

    return { isLoading, isError, error, statusCode, response}
}