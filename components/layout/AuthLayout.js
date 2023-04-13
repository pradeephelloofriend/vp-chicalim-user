import React from 'react'
import {useRouter} from 'next/router'
import LoginPageComponent from '../login/LoginPageComponent'
const AuthLayout = ({children,cUser}) => {
    const router=useRouter()
    
  return (
    <>
    {children}
    </>
  )
}

export default AuthLayout