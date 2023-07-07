import React from 'react'
import { connect, Connect } from 'react-redux';
import { setRegStatus } from '../../redux/menu/menuAction';
import { setUserActive } from '../../redux/user/userAction';
import firebase, { auth, googleProvider, createUserProfileDocument,firestore } from '../../firebase/firebaseUtility';
import { Button, Checkbox, Form, Input, InputNumber,Select, Space  } from 'antd';
import { useRouter } from 'next/router';
import Axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import LoginWithPhoneComponent from './LoginWithPhoneComponent';
const { Option } = Select;

const RegistrationComponent = ({setRegStatus,setUserActive}) => {
    var recaptchaVerifier=null;
    var recaptchaWrapperRef=null
    const router=useRouter()
   
    const captchaRef = React.useRef(null)
    const [form] = Form.useForm();

    /**phone verification */
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [verificationCode, setVerificationCode] = React.useState('');
     const [verificationId, setVerificationId] = React.useState('');
     const [hVerifiy, setHVerify] = React.useState(false); //house verify
     const [erMsg,setErMsg]=React.useState('')
     const[erPhone,setErPhone]=React.useState('')
     const [isValidNo,setIsValidNo]=React.useState(false)
     const[otpBtnClick,setOtpBtnClick]=React.useState(false)
     //const [isLoading,setIsLoading]
    
    
    const onChangeMobile=(e)=>{
        setPhoneNumber(e)
        const reg = new RegExp(/^[0-9]{10}$/);
        setIsValidNo(reg.test(Number(e)))
        //console.log(reg.test(Number(e)))

    }
      
    const[wardList,setWardList]=React.useState(null)
    const[isLoading,setIsLoading]=React.useState(false)
    
    const[msg,setMsg]=React.useState("")
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);
    const selectHandeler=()=>{
        try {
            setIsLoading(true)
            Axios.get(`api/getWardNumberInfo`)
        .then(({data})=>{
            setWardList(data)
            setIsLoading(false)
            //console.log('data',data)
        })
        } catch (error) {
            setIsLoading(false)
        }
        
        //alert('hhggg')
    }
    const resendOTP = () => {
        setMinutes(1);
        setSeconds(30);
      };
    
    const getUserVerify=async (mNo,email)=>{

        const {data} = await Axios.post(`/api/user/getUserVerify`,{mNo:mNo,email:email})
        //console.log('data',data)
        if (data.length>=1) {
            return true //profile existed
        } else {
            return false//profile not existed
        }
        
    }
    const onFinish =async(values) => {
        
        const email= values.email
        const pwd= values.password
        const displayName= values.username
        const mNo=values.mobNo
        //const hNo=values.hNo
        //const wNo=values.wNo
        const userVerify= await getUserVerify(mNo,email)

    //console.log('hData',userVerify)
    if (userVerify) {
        setErMsg('Email  allready registered')
    } else {
        setErMsg('')
        if (verificationCode!=='') {
            setUserActive(true)
            window.confirmationResult.confirm(verificationCode)
            .then((result) => {
                //const user = result.user;
                //console.log('result',result)
                var credential = firebase.auth.EmailAuthProvider.credential(email, pwd)
                auth.currentUser.linkWithCredential(credential)
                .then(async(usercred) => {
                    var user = usercred.user;
                    await createUserProfileDocument(user,{displayName,mNo});
                    //console.log("Account linking success", user);
                }).catch((error) => {
                    //console.log("Account linking error", error);
                });
               
                setRegStatus(true)
            }).catch((error)=>{
                //console.log(error.message.firebase)
                setErMsg(error.message)
                setVerificationId('')
                setRegStatus(false)
                setUserActive(false)
                setMinutes(0);
                setSeconds(0);
                setOtpBtnClick(false)
            })
            setErMsg('')
        } else {
            setErMsg('Mobile Number not verified')
        }

    }

        
        
    }
    /*const onFinish =(values) => {
        setRegStatus(true)
        createUser(values,)
     }*/
    
      const onFinishFailed = (errorInfo) => {
        setUserActive(false)
        //alert(errorInfo.Firebase)
        //console.log('Failed:', errorInfo);
      };
      const handleSendCode = () => {
        
        if (phoneNumber!=='') {
            setIsLoading(true)
            
            setErPhone('')
            
            if(!window.recaptchaVerifier){
                window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('captchaVerify', {
                    size: 'invisible',
                })
           }
           const appVerifier=window.recaptchaVerifier
          //window.recaptchaVerifier.render();
            /*recaptchaVerifier = new firebase.auth.RecaptchaVerifier('captchaVerify', {
                size: 'invisible',
            });*/
            try {
                Axios.post(`/api/user/fetchUserByPhone`, { number: phoneNumber })
                    .then(({ data }) => {
                        //console.log('data', data)
                        if (data.length >= 1) {
                            setErMsg('mobile number allredy registered')
                            
                            setIsLoading(false)
                        } else {
                            setErMsg('')
                            setMinutes(1);
                            setSeconds(30);
                            setOtpBtnClick(true)
                            //console.log('phoneNumber', phoneNumber)
                            firebase.auth().signInWithPhoneNumber('+91' + phoneNumber, appVerifier)
                                .then((verificationId) => {
                                    window.confirmationResult = verificationId;
                                    //console.log('verificationId', verificationId)
                                    setVerificationId(verificationId);
                                    setIsLoading(false)
                                    
                                    //recaptchaVerifier.clear()
                                })
                                .catch((error) => {
                                    //console.error('error',error);
                                    window.recaptchaVerifier.clear()
                                    setIsLoading(false)
                                    setMinutes(0);
                                    setSeconds(0);
                                    setOtpBtnClick(false)
                                });
                        }
                    })
            } catch (error) {
                window.recaptchaVerifier.clear()
                setIsLoading(false)
            }
        } else {
            setErPhone('Enter mobile number')
        }
    };
    React.useEffect(() => {
        if (verificationCode!=='') {
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
      }, [seconds,verificationCode]);
  return (
      <>
          <Form
              layout="vertical"
              form={form}
              className='login-form'
              name="basic"

              initialValues={{
                  remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
          >
              <Form.Item
                  className='link-c-blue'
                  
                  name="username"
                  rules={[
                      {
                          required: true,
                          message: 'Please input your username!',
                      },
                  ]}
              >
                  <Input placeholder='Enter your full name' />
              </Form.Item>
              <Form.Item
                  className='link-c-blue'
                  
                  name="email"
                  rules={[
                      {
                          required: true,
                          type: "email",
                          message: 'Please input your Email!',
                      },
                  ]}
              >
                  <Input placeholder='Enter your Email' />
              </Form.Item>
              
                <Form.Item
                  name="mobNo"
                 
                  rules={[
                      {
                          required: true,
                          pattern: new RegExp(/^[0-9]{10}$/),
                          message: 'Please enter valid Mobile number!'
                      }]}
              >
                <Space direction='horizontal'>
                <Input 
                id='send-code-button'
                placeholder='Enter your Mobile Number'
                style={{width:isValidNo?'100%':'170%'}}
                  onChange={(e) => onChangeMobile(e.target.value)} 
                //addonAfter={isValidNo?<a className='hover' onClick={() => handleSendCode()}>Send OTP</a>:<></>}
                />
                
                {isValidNo?
                <Button
                loading={isLoading}
                disabled={seconds > 0 || minutes > 0}
                style={{
                  width: '135%',
                }}
                onClick={() => handleSendCode()}
              >
                Send OTP
              </Button>
                :<></>

                }
                </Space>
                  
                  
                  
              </Form.Item>
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
              
              {erPhone && <a className='text-danger'>{erPhone}</a>}
              {verificationId && 
              <Form.Item
              name="otp"
              label="Enter OTP"
                  rules={[
                      {
                          required: true,
                          message: 'Please enter valid Mobile number!'
                      }]}
              >
            <Input value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)}  />
              </Form.Item>
              
              }
              {/*<Form.Item
                          name="hNo"
                            rules={[{ required: true, message: 'Please input your House number!' }]}
                      >
                          <Input placeholder='House Number' />
                      </Form.Item>
                      <Form.Item 
                          name="wNo"

                          rules={[
                              {
                                  required: true,
                                  message: 'Please input your password!',
                              },
                          ]}>
                          <Select onClick={() => selectHandeler()}
                              loading={isLoading}
                              placeholder="Select ward no"
                          >
                              {wardList !== null ?
                                  wardList.map((v, vx) =>
                                      <Select.Option key={vx} value={v.KY}>{v.DL01}</Select.Option>
                                  )

                                  : <></>}

                          </Select>
                      </Form.Item>*/}
              
              {/*<Form.Item
                  name="aNo"

                  label="Adhaar Number"
                  rules={[{ required: true, message: 'Please input your adhaar  number!' }]}
              >
                  <Input />
              </Form.Item>
              <div className='row'>
                  <div className='col-6'>
                      <Form.Item
                          name="hNo"

                          label="House Number"
                          rules={[{ required: true, message: 'Please input your House number!' }]}
                      >
                          <Input />
                      </Form.Item>
                  </div>
                  <div className='col-6'>
                      <Form.Item label="Ward Number"
                          name="wNo"

                          rules={[
                              {
                                  required: true,
                                  message: 'Please input your password!',
                              },
                          ]}>
                          <Select onClick={() => selectHandeler()}
                              loading={isLoading}
                              placeholder="Select ward no"
                          >
                              {wardList !== null ?
                                  wardList.map((v, vx) =>
                                      <Select.Option key={vx} value={v.KY}>{v.DL01}</Select.Option>
                                  )

                                  : <></>}

                          </Select>
                      </Form.Item>
                  </div>
              </div>*/}


              <Form.Item

                  
                  name="password"
                  rules={[
                      {
                          required: true,
                          message: 'Please input your password!',
                      },
                  ]}
              >
                  <Input.Password placeholder='Enter password'/>
              </Form.Item>

              <div class="form-group mg-b-30">
                  <div class="custom-control custom-checkbox">
                      <input type="checkbox" class="custom-control-input" id="agree" />
                      <label class="custom-control-label tx-sm" for="agree">I have read and agree to your <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a></label>
                  </div>
              </div>


              

              <Form.Item >

                  <Button disabled={verificationId!==''?false:true} className='mt-2 btn btn-brand-03 btn-uppercase btn-block' htmlType="submit">
                      Register Now
                  </Button>
              </Form.Item>
              
              {/*<Form.Item >

                  <Button   className='mt-2 btn btn-brand-02 btn-uppercase btn-block' htmlType="submit">
                      Register with Number
                  </Button>
              </Form.Item>*/}
             
              <div className="form-group text-center mb-0">
                  {msg && <p className='text-danger'>{msg}</p>}
                  {erMsg && <p className='text-danger'>{erMsg}</p> }
                  
              </div>
              
          </Form>
          <div ref={ref =>recaptchaWrapperRef = ref}>
                            <div id="captchaVerify"></div>
                        </div>
          
          
          <div className="form-group text-center mb-0">
          <p className="extra">Allready a member?<a onClick={() => router.push('/login')} href="#et-register-wrap" className="link-c-blue"> Login Wow</a></p>
          </div>

      </>
  )
}
const mapDispatchToProps=dispatch=>({
    setRegStatus:data=>dispatch(setRegStatus(data)),
    setUserActive:data=>dispatch(setUserActive(data))
  })
export default connect(null,mapDispatchToProps) (RegistrationComponent)