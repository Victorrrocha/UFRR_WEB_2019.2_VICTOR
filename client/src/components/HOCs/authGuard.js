import React, {Component} from 'react'
import { connect } from 'react-redux'

export default (OriginalComponent) => {
    class MixedComponent extends Component{

        componentDidMount(){
            if(this.props.isAuth && this.props.jwtToken){
                console.log('user is allowed')
            }else{
                console.log('User not allowed')
                this.props.history.push('/')
            }
        }
        componentDidUpdate(){
            if(this.props.isAuth && this.props.jwtToken){
                console.log('user is allowed')
            }else{
                console.log('User not allowed')
                this.props.history.push('/')
            }
        }

        render(){
            return <OriginalComponent {...this.props} />
        }
    }

    function mapStateToProps(state){
        return{
            isAuth: state.auth.isAuthenticated,
            jwtToken: state.auth.token
        }
    }
    return connect(mapStateToProps)(MixedComponent)
}