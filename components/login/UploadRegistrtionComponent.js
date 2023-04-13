import React from 'react'
import { connect, Connect } from 'react-redux';
import { setUserUploadStatus,setRegCertData } from '../../redux/menu/menuAction';
import { Button, Checkbox, Form, Input, InputNumber } from 'antd';
const UploadRegistrtionComponent = ({setUserUploadStatus,appId,setRegCertData}) => {
    const [form] = Form.useForm();
    //console.log(appId)
    const onFinish = (values) => {
        setUserUploadStatus(true)
        setRegCertData({appId:appId,appType:'IC',regStatus:'Y'})
        //console.log('Success:', values);
      };
    
      const onFinishFailed = (errorInfo) => {
        //console.log('Failed:', errorInfo);
      };
  return (
      <>
          <div className="text-center mb-4">
              <h2 className="m-0 link-c-blue">Please fill all the information below</h2>
          </div>
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
                  name="Email"
                  
                  rules={[
                      {
                          required: true,
                          message: 'Please input your Email!',
                      },
                  ]}
              >
                  <Input placeholder='Enter your Email' />
              </Form.Item>
              <Form.Item
                name="adhar"
                label="Adhar Number"
                rules={[{ required: true, message: 'Please input your Adhar Number!' }]}
            >
                <Input placeholder='Aadhar Number' />
            </Form.Item>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
                <Input addonBefore={'+91'} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                  className='link-c-blue'
                  label="Application Number"
                  name="appNo"
                  //initialValue={appId}
              >
                  <Input value={appId} disabled />
              

                  <Button className='mt-2 bg-c-blue text-white' htmlType="submit">
                      Submit
                  </Button>
              </Form.Item>
              
          </Form>
      </>
  )
}
const mapDispatchToProps=dispatch=>({
    setUserUploadStatus:data=>dispatch(setUserUploadStatus(data)),
    setRegCertData:(data)=>dispatch(setRegCertData(data))
  })
export default connect(null,mapDispatchToProps) (UploadRegistrtionComponent)