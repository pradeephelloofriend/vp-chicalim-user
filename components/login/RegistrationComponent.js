import React from 'react'
import { connect, Connect } from 'react-redux';
import { setRegStatus } from '../../redux/menu/menuAction';
import { setUserActive } from '../../redux/user/userAction';
import { auth, createUserProfileDocument } from '../../firebase/firebaseUtility';
import { Button, Checkbox, Form, Input, InputNumber } from 'antd';
import { useRouter } from 'next/router';
const RegistrationComponent = ({setRegStatus,setUserActive}) => {
    const router=useRouter()
    const [form] = Form.useForm();
    const onFinish = async(values) => {

        //console.log('Success:', values);
        try {
            setUserActive(true)
            const email= values.email
            const pwd= values.password
            const displayName= values.username
            const { user } = await auth.createUserWithEmailAndPassword(email, pwd);
            await createUserProfileDocument(user, {displayName});
        }catch (error) {
            alert(error.message)
            
           console.error(error.message);
           setUserActive(false)
        }
        
      };
    
      const onFinishFailed = (errorInfo) => {
        setUserActive(false)
        alert(errorInfo.Firebase)
        //console.log('Failed:', errorInfo);
      };
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
                  label="Full Name"
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
                  label="Email"
                  name="email"
                  rules={[
                      {
                          required: true,
                          message: 'Please input your Email!',
                      },
                  ]}
              >
                  <Input placeholder='Enter your Email' />
              </Form.Item>
              {/*<Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
                <Input addonBefore={'+91'} style={{ width: '100%' }} />
            </Form.Item>*/}
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

              <div class="form-group mg-b-30">
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="agree"/>
                <label class="custom-control-label tx-sm" for="agree">I have read and agree to your <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a></label>
              </div>
            </div>

              <Form.Item>

                  <Button className='mt-2 btn btn-brand-01 btn-uppercase btn-block' htmlType="submit">
                  Create New Account
                  </Button>
              </Form.Item>
              <div className="form-group text-center mb-0">
                  <p className="extra">Allready a member?<a onClick={() => router.push('/login')} href="#et-register-wrap" className="link-c-blue"> Login Wow</a></p>
              </div>
          </Form>
      </>
  )
}
const mapDispatchToProps=dispatch=>({
    setRegStatus:data=>dispatch(setRegStatus(data)),
    setUserActive:data=>dispatch(setUserActive(data))
  })
export default connect(null,mapDispatchToProps) (RegistrationComponent)