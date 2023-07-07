import React from 'react'
import { connect, Connect } from 'react-redux';
import { setRegStatus } from '../../redux/menu/menuAction';
import { useRouter } from 'next/router';
import { setUserPhone,setUserActive } from '../../redux/user/userAction';
import firebase, { auth, googleProvider, createUserProfileDocument,firestore } from '../../firebase/firebaseUtility';
import { Button, Checkbox, Form, Input } from 'antd';
const LoginComponent = ({setRegStatus,setUserPhone,setUserActive}) => {
    const [form] = Form.useForm();
    const router= useRouter()
    
    const onFinish = async(values) => {
        //console.log('Success:', values);
        setUserActive(true)
        try {
          const userId=values.email.toString().trim()
          await firebase.auth().signInWithEmailAndPassword(userId, values.password)
          .then((userCredential) => {
              // Signed in
              var user = userCredential.user;
          })
          .catch((error) => {
              //message.error(error.message);
              
              //setTimeout(() =>this.setState({error:''}), 4000);
              //console.log('error',error.message)
              alert(error.message)
              setUserActive(false)
              var errorCode = error.code;
              var errorMessage = error.message;
          });
          
          
         
      } catch (error) {
          console.error(error);
      }
        

    };
    const onFinishFailed = (errorInfo) => {
      setUserActive(false)
      //alert(errorInfo.Firebase)
      //console.log('Failed:', errorInfo);
    };
      
    
    
  //console.log('userInput',userInput)
  return (
      <>
          
          <div className='login-form'>
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
                  label="Email"
                  name="email"
                  rules={[
                      {
                          required: true,
                          type:"email",
                          message: 'Please input your Email!',
                      },
                  ]}
              >
                  <Input placeholder='Enter your Email' />
              </Form.Item>
              <Form.Item

                  label="Password"
                  name="password"
                  rules={[
                      {
                          required: true,
                          message: 'Please input your password!',
                      },
                  ]}
              >
                  <Input.Password />
              </Form.Item>
              <Form.Item>

                  <Button className='mt-2 btn btn-brand-01 btn-uppercase btn-block' htmlType="submit">
                  Sign in
                  </Button>
              </Form.Item>
          </Form>
            
            <div className="eltio_k2" style={{textAlign:'right',marginBottom:10}}>
											<a className='link-c-blue' href="#">Lost Your Password?</a>
										</div>
            
            <div class="form-group d-flex mg-b-0">
              <a onClick={()=>router.push('/register')} href="#" class="btn btn-white btn-uppercase flex-fill mg-l-10">Sign Up</a>
            </div>    
        
           
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