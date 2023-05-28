import React from 'react'
import Image from 'next/image'
import RegistrationComponent from '../login/RegistrationComponent'
const RegisterComponent = () => {
  return (
    <>
    <div className="signup-panel">
    <div className='login-content'>
        <div className="m-logo text-center">
              <Image src={'https://res.cloudinary.com/depg2aab2/image/upload/v1665069084/vp/nagoa/logo_kb3vep.png'} height={139} width={96} alt="Village Panchayats"/>
              <h2>Village Panchayats</h2>
              <h4>Government of Goa</h4>

          </div>
      </div>

      <div className="signup-sidebar">
        <div className="signup-sidebar-body">
          <a href="dashboard-one.html" className="sidebar-logo mg-b-10"><span>Village Panchayat ,Nagoa</span></a>
          <h4 className="signup-title">Create New Account!</h4>
          <h5 className="signup-subtitle">It's free and only takes a minute.</h5>

          <div className="signup-form">
            <RegistrationComponent/>
          
          </div>
          
        </div>
      </div>
    </div>

    </>
  )
}

export default RegisterComponent