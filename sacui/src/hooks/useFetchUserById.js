import { useEffect, useState } from "react"

/**
 * Hook que resgata um usuário pela sua matrícula
 * 
 * Consome o endpoint {@link https://igor-da-silvarodrigues.github.io/sacapi/#/Usuario/findUsuarioById findUsuarioById}
 * @param {string} enpointUrl A url do endpoint da api que irá servir o usuário
 * @param {string} matricula a matrícula do usuário
 * @param {string} token O token jwt de sessão.
 * @returns {[data: object, responseCode: number]} Os dados do usuário e o código de resposta. Se o código de resposta não for OK (200), os dados do usuário serão nulos.
 */
export const useFetchUserById = (endpointUrl, matricula, token)=>{
    const [data, setData] = useState(null)
    const [responseCode, setResponseCode] = useState(null)
    useEffect(()=>{
        async function fetchUserById(){
            //resgatando usuário
            const response = await fetch(`${endpointUrl}/usuario/${matricula}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            setResponseCode(response.status)
            if(!response.ok){return;}//abort if not successfull
            
            const json = await response.json()
            setData(json)
        }

        fetchUserById();
    }, [matricula]);

    return [data, responseCode];
}

