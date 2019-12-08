import React from 'react'
import { Link } from 'react-router-dom'

import style from './MyBidsContainer.module.css'

const MyBids = (props) => {
    
    return(
        <div className={style.card}>
            <div className={style.nome}>
                {props.nome}
            </div>
            <div className={style.lance}>
                {props.lance}
            </div>
            <div className={style.buttonsPlace}>
                {!props.status
                ?
                <button className="btn btn-warning">Pendente</button>
                :
                <Link className="btn btn-success" type="submit" to={{ pathname : `/chat/${props.prodID}`, prodID: props.prodID }}>Ir para o Chat</Link>
                // <button className="btn btn-success">Ir para o Chat</button>
                }
            </div>
        </div>
    )
}

export default MyBids