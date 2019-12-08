import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
import axios from 'axios'

import * as serviceWorker from './serviceWorker';
import App from './components/App'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Lances from './components/Lances'
import AddProduct from './components/AddProducts'
import ProductPage from './components/ProductPage'
import Chat from './components/Chat'

import reducers from './reducers'
import authGuard from './components/HOCs/authGuard'


const jwtToken = localStorage.getItem('JWT_TOKEN')
axios.defaults.headers['Authorization'] = jwtToken

ReactDOM.render(
    <Provider store={createStore(reducers, {
        auth :{
            token: jwtToken,
            isAuthenticated: jwtToken ? true : false
        }
    }, applyMiddleware(reduxThunk))}>
        <BrowserRouter>
            <App>
                <Route exact path="/" component={Home} />
                <Route exact path="/dashboard" component={authGuard(Dashboard)} />
                <Route exact path="/addProduct" component={authGuard(AddProduct)} />
                <Route exact path="/meuslances" component={authGuard(Lances)} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/productpage/:id" component={authGuard(ProductPage)} />
                <Route exact path="/chat/:prodID" component={authGuard(Chat)}/>
            </App>
        </BrowserRouter>
    </Provider>
    
    , document.querySelector('#root'))

serviceWorker.unregister();
