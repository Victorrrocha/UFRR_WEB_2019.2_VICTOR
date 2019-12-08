import React  from 'react'
import { Link } from 'react-router-dom'
import prodContainer from './productContainer.module.css'

const ProductContainer = (props) => {

    return(
        <div className={prodContainer.card}>

            <div className={prodContainer.imageContainer}>
                <img className={prodContainer.img} src={props.image} alt="Not images available" />
            </div>

            <div className={prodContainer.prodInfo}>
                <div className={prodContainer.name}>{props.nome}</div>
                <div className={prodContainer.preco}>R$ {props.preco}</div>
                <Link className={prodContainer.button} to={{ pathname : `/productpage/${props.id}`, id: props.id }}> Ver lances! </Link>
            </div>
        </div>
    )
}

export default ProductContainer;