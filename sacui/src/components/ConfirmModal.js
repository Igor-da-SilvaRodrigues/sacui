import React, { useEffect, useState } from 'react'
import "./ConfirmModal.css";
/**
 * Exibe um prompt de confirmação
 * @param {} shouldDisplay valor booleano que controla se o componente deve esta visível ou não 
 * @param {*} text Texto a ser exibido no prompt
 * @param {*} onYes Callback que será executada ao receber uma resposta positiva
 * @param {*} onNo  Callback que será executada ao receber uma resposta negativa
 * @returns 
 */
const ConfirmModal = ({shouldDisplay, text, onYes, onNo, children}) => {
    const [display, setDisplay] = useState("none")

    useEffect(() => {
        if (shouldDisplay){
            setDisplay("block")
        }else{
            setDisplay("none")
        }
    }, [shouldDisplay])

  return (
    <div id={"myModal"} className={"modal"} style={{display:display}}>
        <div className="modal-content">
          <span className="close" onClick={onNo}>&times;</span>
          <p className="modal-text">{text}</p>
          <div className='modal-children'>{children}</div>
          <button id="confirmBtn" onClick={onYes}>Confirm</button>
        </div>
    </div>
  )
}

export default ConfirmModal