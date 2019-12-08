import React, { Component } from 'react'
import axios from 'axios'
import style from '../Styles/ProductPage.module.css'

import BidContainer from '../reusables/BidContainer'

// we are gonna get info from the product and display
// maybe a discription
// A component where we can make our bid and display only for the ower to accept

class ProductPage extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            // id : this.props.location.id,
            id: this.props.location.id,
            product: [],
            bids:[],
            lance: ''
        }
    }

    async componentDidMount(){
        try{
           const res = await axios.get(`http://localhost:5000/users/myproducts/${this.state.id}`)
           //console.log('[Data coming to PP]', res.data.response[0])
           this.setState({
               product: res.data.response[0],
               bids: res.data.response[1]
           })
           //console.log(this.state.product._id)
        }
        catch(err){
            console.log(err)
        }
    }

    submitHandler = async (event) => {
        event.preventDefault()
        try{
            const res = await axios.post(`http://localhost:5000/users/${this.state.product._id}&${this.state.lance}&${this.state.product.nome}`)
            console.log('res', res)
        }catch(err){
            console.log(err)
        }
    }
    
    lanceHandler = (event) =>{
        this.setState({
            lance: event.target.value
        })
        console.log(this.state.lance)
    }

    // now style the shit outta that mf
    render(){
        const divStyle = {
            display: 'block'
        }

        const innerDivStyle= {
            marginBottom:'2%'
        }

        return(
            <div className={style.wrapper}>
                <div className={style.imageDiv} >
                    <img className={style.image} src={this.state.product.image} alt="Want images? go to a museum" />
                </div>
                <div className={style.infoDiv}>
                    <div className={style.titleDiv}>
                        {this.state.product.tipo} - {this.state.product.nome}
                    </div>
                    <div className={style.precoDiv}>
                        R$ {this.state.product.preco}
                    </div>
                    
                    <div className={style.bidContainer}>
                        <div className={style.title}>
                            Dar um lance 
                        </div>
                        <div className={style.bidColumn}>
                            <form onSubmit={this.submitHandler}>
                                <input type="number" value={this.state.lance} onChange={this.lanceHandler} placeholder="00,00"/>
                                <button type="submit" >OK!</button>
                            </form>
                        </div>
                    </div>

                </div>

                <div style={divStyle}>
                    {this.state.bids.map( function(bid) {
                        return(
                            <div style={innerDivStyle}>
                                <BidContainer lance={bid.lance} prodID={bid.prodID} userID={bid.userID} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default ProductPage