import React from 'react'
import Image from 'next/image'
import {Space} from 'antd'
import {useRouter} from 'next/router'
import LoginComponent from './LoginComponent'
const LoginPageComponent = () => {
    const router=useRouter()
  return (
    <>
    <div className="signin-panel">
      <div className='login-content'>
        <div className="m-logo text-center">
              <Image src={'https://res.cloudinary.com/depg2aab2/image/upload/v1665069084/vp/nagoa/logo_kb3vep.png'} height={139} width={96} alt="Village Panchayats"/>
              <h2>Village Panchayats</h2>
              <h4>Government of Goa</h4>

          </div>
      </div>
        

      <div className="signin-sidebar">
        <div className="signin-sidebar-body">
        
        
          <a href="#" className="sidebar-logo mg-b-40"><span>Village Panchayat, Chicalim</span></a>
          <h4 className="signin-title">Welcome back!</h4>
          <h5 className="signin-subtitle">Please signin to continue.</h5>

          <div className="signin-form">
            <LoginComponent/>
            

            

            {/*<div className="divider-text mg-y-30">Or</div>

            <a href="dashboard-one.html" className="btn btn-facebook btn-uppercase btn-block">Login with google</a>*/}
          </div>
          <p className="mg-t-auto mg-b-0 tx-sm tx-color-03">By signing in, you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a></p>
        </div>
      </div>
    </div>
    </>
  )
}

export default LoginPageComponent