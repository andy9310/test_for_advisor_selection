import axios from './axios';
import store from '../stores/index'
export const getUserMe = async() =>{
    const localToken = localStorage.getItem('token')
    const localEmail = localStorage.getItem('email')
    if (localToken) {
        const response = await axios.get('/account/'+localEmail)
        if (response?.status == 200) {
            store.state.token = localToken
            store.state.name = store.state.advisor===undefined?
                ( store.state.student===undefined?'管理者':response.data.student.name):response.data.advisor.name
            store.state.email = response.data.email
            store.state.type = store.state.advisor===undefined?
            ( store.state.student===undefined?'admin':'student'):'advisor'
        }else {
            const error = response
            if (error.response.status == 401) localStorage.removeItem('token')
        }
    }
    
}
export const Logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    store.state.token = undefined
    store.state.name = undefined
    store.state.email = undefined
    store.state.type = undefined
}

export const isAuthenticated = async () => {
    if (store.state.token===undefined) {
        await getUserMe()
    }
    return store.state.token===undefined?false:true
}
  