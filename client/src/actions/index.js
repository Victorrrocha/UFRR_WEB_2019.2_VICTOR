import axios from 'axios'
import {AUTH_SIGN_UP, AUTH_SIGN_OUT, AUTH_SIGN_IN, AUTH_ERROR} from './types'

export const oauthFacebook = data => {
    return async dispatch => {
        console.log('[Action creator] signUp called')
        const res = await axios.post('http://localhost:5000/users/signup/oauth/facebook', {
            access_token: data
        })
    
        dispatch({
            type: AUTH_SIGN_UP,
            payload: res.data.token
        })

        localStorage.setItem('JWT_TOKEN', res.data.token)
        axios.defaults.headers['Authorization'] = res.data.token
    }
}

export const signUp = data => {
    // send data to make http req to the BE
    // take the BE res (jwtoken)
    // dispatch user just signup
    // save the jwt in our localstorage
    return async dispatch => {
        try{
            console.log('[Action creator] signUp called')
            const res = await axios.post('http://localhost:5000/users/signup', data)
            console.log('res', res)

            console.log('[Action creator] signUp dispatched an action')
            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.token
            })

            localStorage.setItem('JWT_TOKEN', res.data.token)
            axios.defaults.headers['Authorization'] = res.data.token
        } catch(err){
            dispatch({
                type: AUTH_ERROR,
                payload: 'email is already in use'
            })
            console.log('err', err)
        }
    }
}

export const signIn = data => {
    return async dispatch => {
        try{
            const res = await axios.post('http://localhost:5000/users/signin', data)
            console.log(res)
            
            dispatch({
                type: AUTH_SIGN_IN,
                payload: res.data.token
            })
    
            localStorage.setItem('JWT_TOKEN', res.data.token)
            axios.defaults.headers['Authorization'] = res.data.token
        }
        catch(err){
            dispatch({
                type: AUTH_ERROR,
                payload: 'User not registered'
            })
            console.log('err', err)
        }
    }
}

 
export const signOut = () => {
    return dispatch => {
        localStorage.removeItem('JWT_TOKEN')
        axios.defaults.headers['Authorization'] = ''
        dispatch({
            type: AUTH_SIGN_OUT,
            payload: ''
        })
    }
}

// PASSPARAMETER TO BACKEND
// ERROR - PROBLEMA COM O REDUX
// export const addProducts = async (data) => {
//     try{
//         console.log('[Trying to add product]', data)
//         const res = await axios.post('http://localhost:5000/users/myproducts/addnewproduct', data)
//         console.log('res', res)
//         //axios.defaults.headers['Authorization'] = res.data.token
//     } catch(err) {
//         console.log(err)
//     }
    
// }