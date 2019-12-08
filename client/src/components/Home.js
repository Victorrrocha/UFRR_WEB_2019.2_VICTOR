import React, {Component} from 'react'

import Tipos from '../reusables/TiposContainer'

class Home extends Component {

    constructor(props){
        super(props)

        this.state = {
            tipos : [ 'Livros', 'Roupas', 'Brinquedos', 'Jogos', 'Automóveis', 'Variados' ]
        }
    }

    render(){
        
        return(
            <div>
                
                {this.state.tipos.map( (tipos) => {
                    return(
                        <Tipos tipos={tipos} />
                    ) 
                }  )}
           </div>
        )
    }
}


export default Home