import React from 'react'
import { connect, Connect } from 'react-redux';
import { setRegStatus } from '../../redux/menu/menuAction';
import { useRouter } from 'next/router';
import { setUserPhone,setUserActive } from '../../redux/user/userAction';
import firebase, { auth, googleProvider, createUserProfileDocument,firestore } from '../../firebase/firebaseUtility';
import { Button, Checkbox, Form, Input,Space } from 'antd';
import Axios from 'axios';
const LoginComponent = ({setRegStatus,setUserPhone,setUserActive}) => {
    const form = Form.useForm();
    const router= useRouter()
    const [userInput,setUserInput]=React.useState('') //email or mobile
    const [inputText,setInputText]=React.useState('')
    const [userText,setUserText]=React.useState('')
    const [pwdText,setPwdText]=React.useState('')
    const[mConfirm,setMconfirm]=React.useState(false) //mobile confirm for otp
    const [msg,setMsg]=React.useState('')
    const [msgPwd,setMsgPwd]=React.useState('')
    const [error,setError]=React.useState(true)
    const [erPwd,setErPwd]=React.useState(true)
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);
    var recaptchaVerifier=null;
    const [capthaVerifier,setCapthaVerifier]=React.useState(false)
    const[isLoading,setIsLoading]=React.useState(false)
    const[otpBtnClick,setOtpBtnClick]=React.useState(false)
    const [erMsg,setErMsg]=React.useState('')
    var recaptchaWrapperRef=null
    const getUserVerify=async (userId)=>{

      const {data} = await Axios.post(`/api/user/getEmailVerify`,{email:userId})
      //console.log('data',data)
      if (data.length>=1) {
          return true //profile existed
      } else {
          return false//profile not existed
      }
      
  }
    const onFinish = async(values) => {
        //console.log('Success:', values);
        if(erPwd && error ){
            alert('enter all input')
        }else{
          if(userInput=='mobile'){
            setUserActive(true)
            if(mConfirm){
              window.confirmationResult.confirm(pwdText).then((result) => {
                const user = result.user;
                setUserPhone(user.phoneNumber)
                const userRef = firestore.collection("users").doc(user.uid);
                userRef.get().then((snapShot)=>{
                  if (snapShot.exists) {
                    //setLoginStep('mobile')//used in search component
                    //toggleModalVisible()
                    //console.log('snapShot.data()',snapShot.data())
                    
                  }else{
                      //console.log('snapShot.data()',snapShot.data())
                      //this.setState({ loginStep: 'm-success', otpUser: user })
                      //setLoginStep('m-success')
                  }
                })
              }).catch((error) => {
                alert(error)
                setUserActive(false)
              });
            }else{
              alert('You r not Sending OTP')
              setUserActive(false)
            }
            
          }else{
            //alert('You r in email')
            setUserActive(true)
            const userId=userText.toString().trim()
            const userVerify= await getUserVerify(userId)
            if (userVerify) {
              setErMsg('')
              try {
              
                await firebase.auth().signInWithEmailAndPassword(userId, pwdText)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                })
                .catch((error) => {
                    
                    setErMsg(error.message)
                    setUserActive(false)
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });
                
                
               
            } catch (error) {
                console.error(error);
                setUserActive(false)
            }
            } else {
              setErMsg('Email not registerd ')
              setUserActive(false)
            }
            
          }
        }
        

    };
    React.useEffect(() => {
      if (pwdText!=='') {
          setMinutes(0);
                                  setSeconds(0);
                                  setOtpBtnClick(false)
      }
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
    
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
          } else {
            setSeconds(59);
            setMinutes(minutes - 1);
          }
        }
      }, 1000);
    
      return () => {
        clearInterval(interval);
      };
    }, [seconds,pwdText]);
    
      const onTextPasswordChange=(e)=>{
        setPwdText(e)
        if(e.length<1){
          setErPwd(true)
          setMsgPwd('Please Enter Valid Password')
        }else{
          setErPwd(false)
          setMsgPwd('')
        }
      }
      const onTextChange=(e)=>{
          //console.log('userinput',e)
          setUserText(e)
          const result = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(e)
          let tempValue=''
          if (!isNaN(+e) && e.length > 9  ){
            tempValue='mobile'
            setUserInput('mobile')
            
            if (e.length ==10 && tempValue=='mobile'){
              setMsg('')
              setInputText(e)
              setError(false)
              //console.log('text', 'mobile number')
            }else{
              setError(true)
              setMsg('invalid mobile number')
              //console.log('text', 'invalid mobile number')
            }
            
            
        }else{
        
          tempValue='email'
          setUserInput('email')
            if (result){
              setMsg('')
              setError(false)
                //console.log('text', ' valid email id')
            }else{
              setMsg('invalid email id')
              setError(true)
              //console.log('text', ' invalid email id')
            }
            
        }
        
        
    }
    const configureCaptcha = (id) => {
      if (recaptchaVerifier  && recaptchaWrapperRef){
        recaptchaVerifier.clear()
        recaptchaWrapperRef.innerHTML = `<div id="captchaVerify"></div>`
        setCapthaVerifier(false)
      }
      recaptchaVerifier = new firebase.auth.RecaptchaVerifier('captchaVerify', {
          'size': 'invisible',
          'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              //this.onBtnClick(id);
              setCapthaVerifier(true)
              //console.log("Recaptca varified")
          },
          defaultCountry: "IN"
      });
      
      
      
  }
  const getNumberVerify=async (inputText)=>{

    const {data} = await Axios.post(`/api/user/fetchUserByPhone`, { number: inputText })
    //console.log('data',data)
    if (data.length>=1) {
        return true //profile existed
    } else {
        return false//profile not existed
    }
    
}
    const getOtp= async()=>{
      setIsLoading(true)
      const phoneNumber = "+91" + inputText
      const nVerify=await getNumberVerify(inputText)
      if (nVerify) {
        setErMsg('')
        configureCaptcha()
          const appVerifier = recaptchaVerifier;
          setOtpBtnClick(true)
          setMinutes(1);
          setSeconds(30);
          firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setMconfirm(true)
          setIsLoading(false)
          
          alert("An OTP has been sent to your mobile number")
          //console.log("OTP has been sent")
          
          // ...
      }).catch((error) => {
          // Error; SMS not sent
          // ...
          //alert(error)
          setMconfirm(false)
          setOtpBtnClick(false)
          setMinutes(0);
          setSeconds(0);
          setIsLoading(false)
          
          recaptchaVerifier.clear()
          alert(error)
      });
                            
      } else {
        setErMsg('mobile number not registered')
        setIsLoading(false)
        //setUserActive(false)
          
      }
      
      
      
    }

  //console.log('userInput',userInput)
  return (
      <>
          
          <div className='login-form'>
            <div className='user-name mb-3'>
              <Input placeholder='Email ID Or Phone Number' 
                onChange={(e)=>onTextChange(e.target.value)}
                />
              <a className='text-danger' href="#">{msg}</a>
            </div>
            <div className='password mb-3'>
              <Space direction='horizontal'>
              <Input.Password 
              placeholder={userInput=='mobile'?'OTP':'Password'}
              style={{width:userInput=='mobile'?'100%':'156%'}}
                onChange={(e)=>onTextPasswordChange(e.target.value)} 
      
              />
              {userInput!=='mobile'?
              <></>
              :
              <Button
                loading={isLoading}
                disabled={seconds > 0 || minutes > 0}
                style={{
                  width: '114%',
                }}
                onClick={()=>getOtp()}
              >
                Send OTP
              </Button>
              }
              
              </Space>
              {otpBtnClick?
              <div className="countdown-text">
              {seconds > 0 || minutes > 0 ? (
                <p>
                  Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </p>
              ) : (
                <p>Didn't recieve code? please Resend</p>
              )}
        
              
            </div>
              
              :<></>}
              <a className='text-danger' href="#">{msgPwd}</a>
            </div>
            <div className="eltio_k2">
											<a className='link-c-blue' href="#">Lost Your Password?</a>
										</div>
            
            <div class="form-group d-flex mg-b-0">
              <button onClick={()=>onFinish()} class="btn btn-brand-01 btn-uppercase flex-fill">Sign In</button>
              <a onClick={()=>router.push('/register')} href="#" class="btn btn-white btn-uppercase flex-fill mg-l-10">Sign Up</a>
            </div>    
              {erMsg && <p className='text-danger'>{erMsg}</p>}
           
          </div>
         
    <div ref={ref =>recaptchaWrapperRef = ref}>
                            <div id="captchaVerify"></div>
                        </div>
      </>
  )
}
const mapDispatchToProps=dispatch=>({
  setRegStatus:data=>dispatch(setRegStatus(data)),
  setUserPhone:(phone)=>dispatch(setUserPhone(phone)),
  setCurrentUser: cUser => dispatch(setCurrentUser(cUser)),
  setUserActive:data=>dispatch(setUserActive(data))
})
export default connect(null,mapDispatchToProps) (LoginComponent)