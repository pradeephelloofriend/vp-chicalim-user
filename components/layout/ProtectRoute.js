import React from 'react'
import { useRouter } from 'next/router';
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { selectCuser } from '../../redux/user/userSelector';
import LoginPageComponent from '../login/LoginPageComponent';
const ProtectRoute = ({children,cUser}) => {
    const router=useRouter()
    React.useEffect(()=>{
        if(cUser==null){
            if(router.pathname=='register'){
                router.push('/register')
            }else{
                router.push('/login')
            }
            
        }else{
            router.push('/')
        }
    },[cUser])
        
        return (
            <>
            {cUser!==null?children:<></>}
            </>
        )
}
const mapStateToProps=createStructuredSelector({
    cUser:selectCuser
})
export default connect(mapStateToProps) (ProtectRoute)