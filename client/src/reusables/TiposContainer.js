import React, { Component } from 'react'
import ProductContainer from './ProductContainer'
import axios from 'axios'

class Tipos extends Component{

    constructor(props){
        super(props)

        this.state = {
            product : []
        }

    }

    async componentDidMount(){
        try{
            const res = await axios.get(`http://localhost:5000/users/products/${this.props.tipos}`)
            this.setState({
                product : res.data
            })
        }
        catch(err){

        }
    }

    render(){

        const divStyle = {
            display: 'flex',
            flexDirection: 'row'
        }
        const innerDivStyle= {
            marginRight:'2%'
        }

        return(
            <div>
                <h3>{this.props.tipos}</h3>
                
                <div style={divStyle} >
                {this.state.product.map(function(tipo) {
                    return <div style={innerDivStyle} >
                        <ProductContainer id={tipo._id} nome={tipo.nome} preco={tipo.preco} image={tipo.image} /> 
                        </div>
                })}
            </div>
            </div>
            
        )
    }
}

export default Tipos;