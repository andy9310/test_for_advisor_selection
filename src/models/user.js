import { student } from './student'
export const registerUser = ()=>({
  email: '',
  password: '',
  student: student(),
})

export const loginUser = ()=>({
    email: '',
    password: '',
})
