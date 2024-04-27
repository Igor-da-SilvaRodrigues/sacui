import { useEffect, useState } from "react"

/**
 * Executa um GET request no endpoint especificado.
 * 
 * @param {string} url a url do endpoint
 * @param {object} params os parametros de query, como paginação por exemplo
 * @param {object} headers os headers, como Authorization e Content-Type
 * @returns 
 */
export const useGet = (url, params, headers) => {
    const [isLoading, setIsLoading] = useState(false);
    
    const [error, setError] = useState(null);
    const [isError, setIsError] = useState(false);

    const [response, setResponse] = useState(null);
    const [statusCode, setStatusCode] = useState(null);

    useEffect(()=>{
        const doGet = async()=>{
            setIsLoading(true);
            setIsError(false);

            try{
                const response = await fetch(
                    url + new URLSearchParams(params),
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
    }, [url, params]);

    return { isLoading, isError, error, statusCode, response}
}