import React, {Component} from 'react'
import axios from 'axios'

import ProductContainer from '../reusables/ProductContainer'

class Dashboard extends Component {

    constructor(props){
        super(props)

        this.state = {
            products:  []
        }
    }

    //GET FROM THE DB
    async componentDidMount(){    
        try{
            const res = await axios.get('http://localhost:5000/users/myproducts')
            this.setState({
                products: res.data
            })
            console.log(res.data)
        }catch(err){
            console.log(err)
        }
    }

    async deleteProd(prodID) {
        try{
            await axios.delete(`http://localhost:5000/users/myproducts/delete/${prodID}`)
        }catch(err){
            console.log(err)
        }
    } 

    render(){

        const divStyle = {
            display: 'flex',
            flexDirection: 'row'
        }
        const innerDivStyle= {
            marginRight:'2%',
            textAlign: 'center'
        }

        return(
            <div style={divStyle}>
                {this.state.products.map( product => 
                  <div style={innerDivStyle}>
                            <ProductContainer id={product._id} nome={product.nome} preco={product.preco} image={product.image} />
                            <button className="btn btn-danger" onClick={() => this.deleteProd(product._id)} style={{marginTop: '10px'}}>Delete</button>
                    </div>
                
                )}
            </div>
        )
    }
}


export default Dashboard