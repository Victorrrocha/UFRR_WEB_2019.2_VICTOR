import React, {useState} from 'react'
import style from './BidContainer.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const BidContainer = (props) => {
    


    const [status, changeStatus] = useState(false)

    const acceptOffer = async () => {
        changeStatus(true)
        await axios.put(`http://localhost:5000/users/aceitarlance/${props.prodID}&${props.userID}`)
    }

    
    return(
        <div className={style.card}>
            <div className={style.lance}>
                Eu dou {props.lance}
            </div>
            {/* <p>{props.lance}</p>
            <p>{props.userID}</p>
            <p>{props.prodID}</p> */}
            <div className="row">
                {(status === false) 
                ?[
                <div className="col">
                    <button className="btn btn-success" type="submit" onClick={acceptOffer}>Accept</button>
                </div>,
                <div className="col">
                    <button className="btn btn-danger" type="submit" >Decline</button>
                </div>]
                :
                <div className="col">
                    {/* link pro chat */}
                    <Link className="btn btn-warning" type="submit" to={{ pathname : `/chat/${props.prodID}`, prodID: props.prodID }}>Ir para o Chat</Link>
                    {/* <button className="btn btn-warning" type="submit">Ir para o Chat</button> */}
                </div>
                }
                
            </div>
        </div>
    )
}

export default BidContainer