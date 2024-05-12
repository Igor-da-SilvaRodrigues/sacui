import { useCallback, useEffect, useState } from "react";

/**
 * Prepara um POST request no endpoint especificado, utilizando um Content-Type de application/json.
 * 
 * O header Content-Type não precisa ser especificado para usar este hook, pois ele usa application/json por padrão.
 * 
 * Este hook retorna um método que deve ser chamado para especificar os dados a serem inseridos. Chamar este hook inicialmente não causa nenhuma inserção no backend
 * @param {string} url a url do endpoint 
 * @param {*} headers os headers, como Authorization ou qualquer outro necessário
 * @returns 
 */
export const usePost = (url, headers) => {
    const [response, setResponse] = useState(null)
    const [statusCode, setStatusCode] = useState(null)
    const [error, setError] = useState(null)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const commit = useCallback(async (requestBody) => {
        if (requestBody == null){
            console.log("Abortando POST, corpo nulo")
            return
        }
        setIsLoading(true)
        setIsError(false)

        try {
            const response = await fetch(
                url,
                {
                    method: "POST",
                    headers: {...headers, 'Content-Type': 'application/json'},
                    body: JSON.stringify(requestBody)
                }
            )
            setStatusCode(response.status)
            setResponse(response)
        } catch(error){
            setError(error)
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }, [url])

    return {commit, isLoading, isError, error, statusCode, response }
}