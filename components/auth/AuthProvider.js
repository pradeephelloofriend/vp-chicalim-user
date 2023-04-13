import React from 'react'
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect'
import { setCurrentUser,setUserActive } from '../../redux/user/userAction';
import { selectCuser } from '../../redux/user/userSelector';
import { createUserProfileDocument, auth } from '../../firebase/firebaseUtility';
import {useRouter} from 'next/router';

const AuthProvider = ({children,setCurrentUser,cUser,setUserActive}) => {
    const router=useRouter()
    //console.log('cuser,',cUser)
    React.useEffect(()=>{
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
                        alert('successfully signed in')
                        setUserActive(false)
                        //setTimeout(() =>setUserActive(false), 4000);
                        router.push('/')
                        
                    })
                }
            })
        }
        
    },[cUser])
  return (
    <>
    {children}
    </>
  )
}
const mapStateToProps = createStructuredSelector({
    cUser: selectCuser,
})
const mapDispatchToProps=dispatch=>({
    setCurrentUser: cUser => dispatch(setCurrentUser(cUser)),
    setUserActive:data=>dispatch(setUserActive(data))
  })
export default connect(mapStateToProps,mapDispatchToProps) (AuthProvider)