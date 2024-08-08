import { reactive} from 'vue'
import axios from '@/utils/axios'
export const getUserMe = async()=>{
  if (localToken) {
    const response = await axios.get('/user/me')
    if (response?.status == 200) {
      const { user } = useUserStore()
      user.token = localToken
      user.loggedIn = true
      Object.entries(response.data).forEach(([key, value]) => {
        user[key] = value
      })
    } else {
      const error = response
      if (error.response.status == 401) localStorage.removeItem('token')
    }
  }
}

