import React from 'react'
import { connect, Connect } from 'react-redux';
import { setRegStatus } from '../../redux/menu/menuAction';
import { setUserActive } from '../../redux/user/userAction';
import { auth, createUserProfileDocument } from '../../firebase/firebaseUtility';
import { Button, Checkbox, Form, Input, InputNumber,Select  } from 'antd';
import { useRouter } from 'next/router';
import Axios from 'axios';
const { Option } = Select;

const RegistrationComponent = ({setRegStatus,setUserActive}) => {
    const router=useRouter()
   
    const [form] = Form.useForm();
    const[wardList,setWardList]=React.useState(null)
    const[isLoading,setIsLoading]=React.useState(false)
    const createUser=async(values)=>{
        try {
                    setUserActive(true)
                    const email= values.email
                    const pwd= values.password
                    const displayName= values.username
                    const hNo=values.hNo
                    const aNo=values.aNo
                    const wNo=values.wNo.substring(1)
                    const { user } = await auth.createUserWithEmailAndPassword(email, pwd);
                    await createUserProfileDocument(user, {displayName,hNo,aNo,wNo});
        } catch (error) {
            console.error(error.message);
           setUserActive(false)
        }
    }
    const[msg,setMsg]=React.useState("")
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
    const onFinish =(values) => {

        //console.log('Success:', values);

        
            Axios.post(`/api/getHouseNumberInfo`,{hNo:values.hNo})
            .then(({data})=>{
                if (data==1) {
                    //console.log('data',data)
                    setMsg('The user allready Registerd for this house no')
                } else {
                    //console.log('data',data)
                    setMsg('')
                    setRegStatus(true)
                   createUser(values) 
                }
            })
            
        
        
      }
    
      const onFinishFailed = (errorInfo) => {
        setUserActive(false)
        //alert(errorInfo.Firebase)
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
                          type:"email",
                          message: 'Please input your Email!',
                      },
                  ]}
              >
                  <Input placeholder='Enter your Email' />
              </Form.Item>

              <Form.Item
                name="aNo"
                
                label="Adhaar Number"
                rules={[{ required: true,message: 'Please input your adhaar  number!' }]}
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
        <Select onClick={()=>selectHandeler()}
        loading={isLoading}
        placeholder="Select ward no"
        >
            {wardList!==null?
            wardList.map((v,vx)=>
            <Select.Option key={vx} value={v.KY}>{v.DL01}</Select.Option>
            )
            
        :<></>}
          
        </Select>
      </Form.Item>
                </div>
            </div>
            
            
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
                {msg && <p className='text-danger'>{msg}</p>}
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