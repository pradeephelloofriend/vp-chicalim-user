import React from 'react'
import { connect } from 'react-redux';
import { auth, logout } from '../../firebase/firebaseUtility';
import {setCurrentUser,setUserPhone} from '../../redux/user/userAction';
import { setSeloptUDC } from '../../redux/udc/udcAction';
const LogoutComponent = ({setCurrentUser,setUserPhone}) => {
    React.useEffect(()=>{
        auth.signOut().then(() => {
            setCurrentUser(null)
            setUserPhone('')
            localStorage.clear();
            
            window.location.href = "/"
            
            //auth.signInAnonymously()
        }).catch((error) => {
            // An error happened.
        });
    })
  return (
    <></>
  )
}
const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: cUser => dispatch(setCurrentUser(cUser)),
    setUserPhone:phone=>dispatch(setUserPhone(phone))
})
export default connect(null,mapDispatchToProps) (LogoutComponent)