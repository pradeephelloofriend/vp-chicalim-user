import React from 'react'
import firebase, { auth, googleProvider, createUserProfileDocument,firestore } from '../../firebase/firebaseUtility';
import { Button, Checkbox, Divider, Form, Input, InputNumber,Select, Space  } from 'antd';
import Axios from 'axios';
const LoginWithPhoneComponent = () => {
    const [form] = Form.useForm();
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [verificationCode, setVerificationCode] = React.useState('');
     const [verificationId, setVerificationId] = React.useState('');
     const [mVerifiy, setMVerify] = React.useState(false);
     const [erMsg,setErMsg]=React.useState('')
     const[erPhone,setErPhone]=React.useState('')
     const [isValidNo,setIsValidNo]=React.useState(false)
     const onChangeMobile=(e)=>{
        setPhoneNumber(e)
        const reg = new RegExp(/^[0-9]{10}$/);
        setIsValidNo(reg.test(Number(e)))
        //console.log(reg.test(Number(e)))

    }
    const handleSendCode = () => {
        if (phoneNumber!=='') {
            setErPhone('')
            const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('send-code-button', {
                size: 'invisible',
            });
            try {
                Axios.post(`/api/user/fetchUserByPhone`, { number: phoneNumber })
                    .then(({ data }) => {
                        //console.log('data', data)
                        if (data.length >= 1) {
                            setErMsg('mobile number allredy registered')
                        } else {
                            setErMsg('')
                            //console.log('phoneNumber', phoneNumber)
                            firebase.auth().signInWithPhoneNumber('+91' + phoneNumber, recaptchaVerifier)
                                .then((verificationId) => {
                                    window.confirmationResult = verificationId;
                                    //console.log('verificationId', verificationId)
                                    setVerificationId(verificationId);
                                })
                                .catch((error) => {
                                    console.error(error);
                                    recaptchaVerifier.clear()
                                });
                        }
                    })
            } catch (error) {
                recaptchaVerifier.clear()
            }
        } else {
            setErPhone('Enter mobile number')
        }
    };
    const handleVerifyCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
    
        firebase.auth().signInWithCredential(credential)
          .then((userCredential) => {
            // User signed in successfully
          })
          .catch((error) => {
            console.error(error);
          });
      };
    const onFinish =(values) => {
       
        const displayName= values.name
        const mNo=phoneNumber
        if (verificationCode!=='') {
            window.confirmationResult.confirm(verificationCode).then(async(result) => {
                const user = result.user;
                //console.log('user',user)
                await createUserProfileDocument(user, {displayName,mNo});
            })
            setErMsg('')
        } else {
            setErMsg('Mobile Number not verified')
        }
        
    }
    
      const onFinishFailed = (errorInfo) => {
       
        //alert(errorInfo.Firebase)
        //console.log('Failed:', errorInfo);
      };
  return (
    <div>
        
        <Form
              layout="vertical"
              form={form}
              className='login-form'
              name="LoginwithPhone"

              initialValues={{
                  remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
          >
            <Form.Item
                  className='link-c-blue'
                  
                  name="name"
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
              
              <Form.Item >

                  <Button   className='mt-2 btn btn-brand-02 btn-uppercase btn-block' htmlType="submit">
                      Register with Number
                  </Button>
              </Form.Item>
              {erMsg && <p className='text-danger'>{erMsg}</p>}
          </Form>
    </div>
  )
}

export default LoginWithPhoneComponent