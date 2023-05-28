import { Card, Button, Checkbox, Form, Input, InputNumber,Select, Spin  } from 'antd'
import React from 'react'
import Axios from 'axios';
import TextArea from 'antd/lib/input/TextArea';
import { useRouter } from 'next/router';
import UploadImageComponent from './UploadImageComponent';
const { Option } = Select;


    
const UserProfileComponent = () => {
    const[userData,setUserData]=React.useState(null)
    const[isLoading,setIsLoading]=React.useState(false)
    const[defaultValue,setDefaultValue]=React.useState(null)
    const [fileList, setFileList] = React.useState([]) //for upload image
    const[isUpload,setIsUpload]=React.useState(false)//for upload image
    const router=useRouter()

    
    const getUserProfileData=(id)=>{
        try {
            setIsLoading(true)
            Axios.post('/api/user/getUserProfileData',{uId:id})
           .then(({data})=>{
                setUserData(data[0])
                if (data!==undefined) {
                    
                }
                form.setFieldsValue({
                    username:data[0].m_name,
                    email:data[0].UID,
                    aNo:data[0].m_AadharID,
                    hNo:data[0].m_hno,
                    wNo:data[0].m_partno,
                    vId:data[0].m_ecno,
                    add1:data[0].m_add1,
                    taluka:data[0].m_taluka,
                    state:data[0].m_state,


                })
                setIsLoading(false)
           })
        } catch (error) {
            setIsLoading(false)
        }
    }
    
    React.useEffect(()=>{
        let isAppSubscribed=true;
        if (isAppSubscribed) {
            getUserProfileData(router.query.uId)
            

        }
        
    },[router])
    const [form] = Form.useForm();
    const onFinish =(values) => {
        try {
            setIsLoading(true)
            Axios.put('/api/user/updateUserInfo',{
                userId:router.query.uId,
                vId:values.vId,
                add1:values.add1,
                taluka:values.taluka,
                state:values.state
            }).then(({data})=>{
                //console.log('update result',data)
                getUserProfileData(router.query.uId)
            })
        } catch (error) {
            
        }
    }
    const onFinishFailed = (errorInfo) => {

    }
    //console.log('userdata=',userData)
  return (
      <div>

          <div className="caption1">
              <h3>{'My Profile'}</h3>
              <p>Enter the details to get Your tax payments list and details.</p>
          </div>
          <Card>
            <Spin spinning={isLoading}>
              <Form
                  layout="vertical"
                  form={form}
                  className='login-form'
                  name="basic"
                initialValues={
                   { remeber:true}
                }
                  
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
              >
                  <div className='row'>
                      <div className='col-md-6'>
                          <div className='l-box'>
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
                                  <Input placeholder='Enter your full name' disabled  />
                              </Form.Item>
                              <Form.Item
                                  className='link-c-blue'
                                  label="Email"
                                  name="email"
                                  rules={[
                                      {
                                          required: true,
                                          type: "email",
                                          message: 'Please input your Email!',
                                      },
                                  ]}
                              >
                                  <Input placeholder='Enter your Email' disabled />
                              </Form.Item>
                              <Form.Item
                                  name="aNo"
                                  label="Adhaar Number"
                                  rules={[{ required: true, message: 'Please input your adhaar  number!' }]}
                              >
                                  <Input disabled />
                              </Form.Item>
                              <Form.Item
                                  name="hNo"
                                  label="House Number"
                                  rules={[{ required: true, message: 'Please input your House number!' }]}
                              >
                                  <Input disabled />
                              </Form.Item>
                              <Form.Item
                                  className='link-c-blue'
                                  label="Ward Number"
                                  name="wNo"
                                  rules={[
                                      {
                                          required: true,
                                          message: 'Please input your Ward No!',
                                      },
                                  ]}
                              >
                                  <Input disabled />
                              </Form.Item>
                              <Form.Item
                                  className='link-c-blue'
                                  label="Voter Id No"
                                  name="vId"
                                  rules={[
                                      {
                                          required: true,
                                          message: 'Please input your Voter id',
                                      },
                                  ]}
                              >
                                  <Input />
                              </Form.Item>
                          </div>
                      </div>
                      <div className='col-md-6'>
                          <div className='r-box'>
                              
                              <Form.Item
                                  name="add1"
                                  label="Address"
                                  rules={[{ required: true, message: 'Please input your address' }]}
                              >
                                  <TextArea rows={4} />
                              </Form.Item>
                              <Form.Item
                                  name="taluka"
                                  label="Taluka"
                                  rules={[{ required: true, message: 'Please input your Taluka!' }]}
                              >
                                  <Input />
                              </Form.Item>
                              <Form.Item
                                  name="state"
                                  label="State"
                                  rules={[{ required: true, message: 'Please input your State!' }]}
                              >
                                  <Input />
                              </Form.Item>
                              <div className='img-box'>
                                {/*<UploadImageComponent fileList={fileList} setFileList={setFileList}/>*/}
                              </div>
                              <Form.Item>

                  <Button className='mt-2 btn btn-brand-01 btn-uppercase btn-block' htmlType="submit">
                  Update Profile
                  </Button>
              </Form.Item>
                          </div>
                      </div>
                  </div>
              </Form>
              </Spin>
          </Card>
      </div>
  )
}

export default UserProfileComponent