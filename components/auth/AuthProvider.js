import React from 'react'
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect'
import { setCurrentUser,setUserActive } from '../../redux/user/userAction';
import { selectCuser } from '../../redux/user/userSelector';
import { createUserProfileDocument, auth } from '../../firebase/firebaseUtility';
import {useRouter} from 'next/router';
import Axios from 'axios';
import { selectRegStatus } from '../../redux/menu/menuSelector';
import { setRegStatus } from '../../redux/menu/menuAction';
const AuthProvider = ({children,setCurrentUser,cUser,setUserActive,regStatus,setRegStatus}) => {
    const router=useRouter()
    //console.log('cuser,',cUser)
    async function addUserInfoToAdbook(id,dName,email,mNo){
        
            await Axios.post(`api/user/insertUserInfo`,
                {
                    userId: id,
                    userName: dName,
                    email:email,
                    mNo:mNo
                    
                }
            )
                .then(({data}) => {
                //console.log("during fetch",data);
                if(data==1){
                    alert('successfully signed in')
                    setUserActive(false)
                    setRegStatus(false)
                    //setTimeout(() =>setUserActive(false), 4000);
                    router.push('/')
                }else{
                    alert('error')
                    setUserActive(false)
                    setRegStatus(false)
                }
                
                    
                    
    
                })
        }
    React.useEffect(()=>{
        let isLoad=true;
        if (regStatus) {
            if(cUser == null){
                auth.onAuthStateChanged(async userAuth => {
                     //console.log(userAuth)
     
                     if (userAuth) {
                         //setUserActive(true) //for loading 
                         const userRef = await createUserProfileDocument(userAuth);
                         userRef.onSnapshot(snapShot => {
                             //console.log('snapshot', snapShot())
                             
                             setCurrentUser({
                                 id: snapShot.id,
                                 ...snapShot.data()
                             })
                             if(snapShot.data()!==undefined){
                                 if(isLoad==true){
                                     if (regStatus) {
                                         addUserInfoToAdbook(snapShot.id,snapShot.data().displayName,snapShot.data().email,snapShot.data().mNo)
                                     }
                                      
                                 
                                 }
                          
                             }
                             
                             
                         })
                     }
                 })
             }
        } else {
            if(cUser == null){
                auth.onAuthStateChanged(async userAuth => {
                     //console.log(userAuth)
     
                     if (userAuth) {
                         //setUserActive(true) //for loading 
                         const userRef = await createUserProfileDocument(userAuth);
                         userRef.onSnapshot(snapShot => {
                             //console.log('snapshot', snapShot())
                             
                             setCurrentUser({
                                 id: snapShot.id,
                                 ...snapShot.data()
                             })
                             setUserActive(false)
                             router.push('/')
                             
                             
                         })
                     }
                 })
             } 
        }
        
        
    },[cUser,regStatus])
  return (
    <>
    {regStatus?<></>:children}
    </>
  )
}
const mapStateToProps = createStructuredSelector({
    cUser: selectCuser,
    regStatus:selectRegStatus
})
const mapDispatchToProps=dispatch=>({
    setCurrentUser: cUser => dispatch(setCurrentUser(cUser)),
    setUserActive:data=>dispatch(setUserActive(data)),
    setRegStatus:data=>dispatch(setRegStatus(data))
  })
export default connect(mapStateToProps,mapDispatchToProps) (AuthProvider)