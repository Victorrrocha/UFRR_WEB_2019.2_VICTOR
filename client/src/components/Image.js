import React, {Component} from 'react'
import axios from 'axios'

export class Image extends Component{
    
    state = {
        image: []
    }

    async componentDidMount(){
        const res = await axios.get('http://localhost:5000/api/photos')
        console.log("getting image", res)
    }

    render(){
        return(
            <div>
                <h1>image here</h1>
            </div>
        )
    }
}


export default Image