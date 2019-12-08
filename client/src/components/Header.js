import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {connect } from 'react-redux'

import * as actions from '../actions'


class Header extends Component{

    constructor(props){
        super(props)
        this.signOut = this.signOut.bind(this)
    }

    signOut(){
        console.log('sign out got called');
        this.props.signOut()
    }

    render(){
        const headerStyle = {
            color: 'white',
            backgroundColor:  '#8265F2',
            marginBottom:'30px'
        }

        return(
            <nav className="navbar navbar-expand-lg navbar-dark" style={headerStyle}>
                <Link className="navbar-brand" to="/" key="homepage">Haggle</Link>

                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav ml-auto">
                        { !this.props.isAuth ? [
                            <li className="nav-item">
                            <Link className="nav-link" to="/signup" key="signUp">Sign Up</Link>
                            </li>,
                            <li className="nav-item">
                                <Link className="nav-link" to="/signin" key="signIn">Sign In</Link>
                            </li>
                        ] : null }
                        { this.props.isAuth ? 
                        [
                            <li className="nav-item">
                            <Link className="nav-link" to="/dashboard" key="dashboard">Meus Produtos</Link>
                            </li>,
                            <li className="nav-item">
                            <Link className="nav-link" to="/meuslances" key="lances">Meus Lances</Link>
                            </li>,
                            <li className="nav-item">
                            <Link className="nav-link" to="/addProduct" key="vender">Adicionar Produto</Link>
                            </li>,
                            <li className="nav-item">
                                <Link className="nav-link" to="/signout" onClick={this.signOut} key="signOut">Sign Out</Link>
                            </li>
                        ]
                        : null}
                        
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state){
    return {
        isAuth: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, actions)(Header)