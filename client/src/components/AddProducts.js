import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import axios from 'axios'

class AddProduct extends Component {

    // async componentDidMount(){
    //     this.props.getSecret()
    // }

    constructor(props){
        super(props)

        this.state = {
            nome: '',
            tipo: '',
            preco: '',
            image: ''
        }
    }

    nomeHandler = (event) => {
        this.setState({
            nome: event.target.value
        })
    }

    tipoHandler = (event) => {
        this.setState({
            tipo: event.target.value
        })
        console.log(this.state.tipo)
    }

    precoHandler = (event) => {
        this.setState({
            preco: event.target.value
        })
    }

    imageHandler = (event) => {
        this.setState({
            image: event.target.value
        })
    }

    submitHandler = async (event) => {
        event.preventDefault()
        const data = this.state

        try{
            console.log('[Trying to add product]', data)
            const res = await axios.post('http://localhost:5000/users/myproducts/addnewproduct', data)
            console.log('res', res)
        } catch(err) {
            console.log(err)
        }

        if(!this.props.errorMessage){
            this.props.history.push('/dashboard')
        }

    }

    //check if everything is set
    canSubmit(){
        return (this.state.nome !== '' && this.state.tipo !== '' && this.state.preco !== '') ?  true : false;
    }

    render(){

        return(
            //nome, preço e tipo

            <form onSubmit={this.submitHandler}>
                <div className="form-group">
                    <input className="form-control"
                            type="text"
                            placeholder="Nome"
                            value={this.state.nome}
                            onChange = {this.nomeHandler}
                            id="nome"/>
                </div>
                <div className="form-group">
                    <select className="form-control"
                            value={this.state.tipo}
                            onChange = {this.tipoHandler}>
                        <option value=''>----</option>
                        <option value="Livros">Livros</option>
                        <option value="Roupas">Roupas</option>
                        <option value="Jogos">Jogos</option>
                        <option value="Automóveis">Automóveis</option>
                        <option value="Brinquedos">Brinquedos</option>
                        <option value="Variados">Variados</option>
                    </select>
                </div>
                <div className="form-group">
                    <input 
                        className="form-control"
                        type="number"
                        placeholder="Preço"
                        step='0.50'
                        min='0'
                        value={this.state.preco}
                        onChange = {this.precoHandler}
                    />
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-sm">
                            <input
                            type="text"
                            placeholder="URL da imagem"
                            value={this.state.image}
                            onChange = {this.imageHandler}
                            />
                        </div>
                        <div className="col-sm">
                            <input type="file" class="form-control-file"/>
                        </div>
                    </div>
            
                </div>

                <button type="submit" className="btn btn-outline-success" disabled={!this.canSubmit()} >Vender!</button>
            </form>
        
        )
    }
}

function mapStateToProps(state){
    return{
        secret: state.dash.secret
    }
}

export default connect(mapStateToProps, actions)(AddProduct)