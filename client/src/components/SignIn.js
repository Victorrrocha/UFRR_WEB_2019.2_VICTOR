import React, {Component} from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login'

import * as actions from '../actions'
import CustomInput from './CustomInput'

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.responseGoogle = this.responseGoogle.bind(this)
        this.responseFacebook = this.responseFacebook.bind(this)
    }
    ///local sign up ////////////////////
    async onSubmit (formData) {
        await this.props.signIn(formData)
        if(!this.props.errorMessage){
            this.props.history.push('/dashboard')
        }
    }
    /////////////////////////////////////
    async responseGoogle(res){
        await this.props.oauthGoogle(res.accessToken)
    }

    async responseFacebook(res){
        await this.props.oauthFacebook(res.accessToken)
        if(!this.props.errorMessage){
            this.props.history.push('/dashboard')
        }
    }

    render(){
        const {handleSubmit } = this.props
        return( 
            <div className="row">
                <div className="col" >
                    <form onSubmit={handleSubmit(this.onSubmit)}>
                        <fieldset>
                            <Field 
                                name="email"
                                type="text"
                                id="email"
                                label="Enter your email"
                                placeholder="example@email.com"
                                component={CustomInput}
                            />
                        </fieldset>
                        <fieldset>
                            <Field 
                                name="password"
                                type="password"
                                id="password"
                                label="Enter your password"
                                placeholder="password"
                                component={CustomInput}
                            />
                        </fieldset>

                        {this.props.errorMessage ?
                        <div className="alert alert-danger">
                            {this.props.errorMessage}
                        </div>
                        : null}

                        <button type="submit" className="btn btn-primary">Sign In</button>
                    </form>
                </div>

                <div className="col" >
                    <div className="text-center">
                        <div className="alert alert-primary">
                            Or use third-party authentication
                        </div>
                        <FacebookLogin 
                            appId="1542496562572761"
                            autoLoad={false}
                            textButton="Facebook"
                            fields="name,email,picture"
                            callback={this.responseFacebook}
                            cssClass="btn btn-outline-primary"
                        />
                        <GoogleLogin
                            clientID = '907892541631-81g125g4kthufo8fe1g1kc6tarqvbpnh.apps.googleusercontent.com'
                            buttonText="Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                        />
                    </div>
                </div>
            </div>
            
        )
    }
}

function mapStateToProps(state) {
    return{
        errorMessage: state.auth.errorMessage
    }
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signin' })
)(SignIn)