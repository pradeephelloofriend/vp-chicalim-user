import React from 'react'
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { selectCuser } from '../redux/user/userSelector';
import ProtectRoute from '../components/layout/ProtectRoute'
import LoginPageComponent from '../components/login/LoginPageComponent'

const login = ({cUser}) => {
  return (
    <>
        {cUser==null?
        <LoginPageComponent/>
        :
        <></>}
        
        
    </>
  )
}
const mapStateToProps=createStructuredSelector({
  cUser:selectCuser
})
export default connect(mapStateToProps) (login)