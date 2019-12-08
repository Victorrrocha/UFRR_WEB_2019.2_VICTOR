import React, {Component} from 'react'
import axios from 'axios'

import MyBids from '../reusables/MyBidsContainer'

class Lances extends Component {
    
    constructor(props){
        super(props)

        this.state ={
            lances : []
        }
    }

    async componentDidMount(){
        try{
            const res = await axios.get('http://localhost:5000/users/meuslances')
            this.setState({
                lances : res.data
            })
            console.log("LANCES IN MY STATE", this.state.lances)
        }catch(err){
            console.log(err)
        }
    }


    
    render(){

        const divStyle = {
            maxWidth: 'fit-content'
        }

        const innerDivStyle= {
            textAlign: 'center',
            marginRight:'2%'
        }

        return(
            <div style={divStyle}>
                {
                    this.state.lances.map( function(lance) {
                        return(
                            <div style={innerDivStyle}>
                                <MyBids lance={lance.lance} nome={lance.ProdNome} status={lance.status} prodID={lance.prodID} userID={lance.userID} />
                            </div>
                        )  
                    })
                }
            </div>
        )
    }
}

export default Lances