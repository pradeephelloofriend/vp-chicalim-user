import { Card,Button, Result, Spin, Checkbox, Form, Input, InputNumber,Select, Space,Alert } from 'antd'
import React from 'react'
import Axios from 'axios';
import { useRouter } from 'next/router';
import Marquee from 'react-fast-marquee';
import { setHouseVerify } from '../../redux/user/userAction';
import { connect } from 'react-redux';
const { Option } = Select;
const {TextArea}=Input
const PendingProfileComponent = ({cUser,setHouseVerify}) => {
    const router=useRouter()
    const[pData,setPdata]=React.useState(null)
    const[isLoading,setIsLoading]=React.useState(false)
    const[isLoading1,setIsLoading1]=React.useState(false)
    const[wardList,setWardList]=React.useState(null)
    const[hVerify,setHverify]=React.useState('')
    const [erMsg,setErMsg]=React.useState('')
    const[hnVerify,setHnVerify]=React.useState(null)
    const[avilable,setAvilable]=React.useState('')
    const [hOwnerName,setHOwnerName]=React.useState('')
    const [wardNo,setWardNo]=React.useState('')
    const [houseNo,setHouseNo]=React.useState('')
    const [form] = Form.useForm();
    const verifyHouseNumber= async()=>{
        try {
        setErMsg('')
        setIsLoading1(true)
        Axios.post(`/api/user/verifyHouseNumber`,{wNo:wardNo,hNo:houseNo})
        .then(({data})=>{
            console.log('verify house number',data)
            if (data.length>=1) {
                setHOwnerName(data[0].m_name)
                form.setFieldsValue({hwName:data[0].m_name})
            }else{
                setHOwnerName('N/A')
                form.setFieldsValue({hwName:'N/A'})
                
            }
            setIsLoading1(false)
            
        })
        } catch (error) {
            setErMsg(error.message)
            setIsLoading1(false)
        }
        
    }
    console.log('wardNumber',hOwnerName)
    const onFinish =async(values) => {
        //const hvData=await sendNewRequest(values.wNo,values.hNo)
        if (hOwnerName!=='') {
            try {
                setIsLoading(true)
                Axios.post(`/api/user/sendNewRequest`,{wNo:values.wNo,hNo:values.hNo,userId:cUser.id,hwName:values.hwName})
                .then(({data})=>{
                    getUserData(cUser.id)
                    setIsLoading(false)
                })
            } catch (error) {
                setIsLoading(false)
            }
        } else {
            setErMsg('Please verify your house number')
        }

        
        //console.log('hvData',hvData)
       
    }
    const onFinishFailed = (errorInfo) => {
       
    };
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
    
    const getUserData=(id)=>{
        try {
            setIsLoading(true)
           Axios.post('/api/user/checkHouseNumberConfirmation',{uId:id})
           .then(({data})=>{
            console.log('hose',data)
                setPdata(data)
                if (data.length>=1) {
                    setHverify(data[0]) //store in state
                    setHouseVerify(data[0]) //store in redux
                    
                }
                setIsLoading(false)
           })
        } catch (error) {
            setIsLoading(false)
        }

    }
    React.useEffect(()=>{
        //console.log('user',cUser)
        let isAppSubscribed=true;
        if (isAppSubscribed) {
            getUserData(cUser.id)
        }
        return()=>{
            isAppSubscribed=false
        }
    },[cUser])
    //console.log('status',pData)
    return (
        
        <div className='pen-profile mt-10 mb-10'>
            <Spin spinning={isLoading}>
                {pData!==null?
                pData.length>=1?
                <>
                
                </>
                :
                <div className='row'>
                    <div className='col-md-6'>
                    <Card>
                    <div className='welcome-head mb-10'>
                        <h5 className='text-danger'>Please update your <strong>House Number</strong> and <strong>Ward Number</strong> !!</h5>
                    </div>
                    <div className='p-update-form'>
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
                          name="wNo"

                          rules={[
                              {
                                  required: true,
                                  message: 'Please input your password!',
                              },
                          ]}>
                          <Select 
                          onChange={(value)=>setWardNo(value)}
                          onClick={() => selectHandeler()}
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
                        <Form.Item
                          name="hNo"
                            rules={[{ required: true, message: 'Please input your House number!' }]}
                      >
                         <Input 
                         onChange={(e)=>{
                            setHouseNo(e.target.value)
                            setHOwnerName('')}
                        } 
                         style={{width:'100%'}} 
                         placeholder='House Number' 
                         addonAfter={<a onClick={()=>verifyHouseNumber()}>Verify</a>} 
                         />
                        
                      </Form.Item>
                      {hOwnerName&&
                      
                      <Form.Item
                        label="House Owner Name"
                        name="hwName"
                          
                        >
                       <Input style={{width:'100%'}} defaultValue={hOwnerName} value={hOwnerName} placeholder='House Owner Name' />
                      
                    </Form.Item>
                      }
                      
                      <Form.Item >

                  <Button  className='mt-2 btn btn-brand-03 btn-uppercase btn-block' htmlType="submit">
                      Submit Now
                  </Button>
              </Form.Item>
                    </Form>
                    {erMsg&&<p className='text-danger'>{erMsg}</p>}
                    </div>
                    
                </Card>
                    </div>
                    <div className='col-md-6'></div>
                </div>
                
                :<></>}
                {hVerify &&
                
                    <>
                    {hVerify.ur_status=="N"?
                    <Alert
                    closable
                    banner
                    message={
                      <Marquee pauseOnHover gradient={false}>
                        Your request has been sent, 
                      </Marquee>
                    }
                  />
                    :hVerify.ur_status=="C"?
                    <Alert
                    type="success"
                    closable
                    banner
                    message={
                      <Marquee pauseOnHover gradient={false}>
                        {hVerify.ur_remark} 
                      </Marquee>
                    }
                  />
                  :<Alert
                  type='error'
                  closable
                  banner
                  message={
                    <Marquee pauseOnHover gradient={false}>
                      {hVerify.ur_remark}, 
                    </Marquee>
                  }
                />}
                    </>
                }
            {/*status=='N'?
            <Card>
            <Result
                title="Please update your profile"
                extra={
                    <Button type="primary" key="console" 
                    onClick={()=>router.push({
                        pathname:'/profile',
                        query:{uId:cUser.id,hNo:cUser.hNo}
                    })}>
                        Update here
                    </Button>
                }
            />
        </Card>
            :
            <></>
            */}
            
            </Spin>
        </div>
    )
}
const mapDispatchToProps=dispatch=>({
    setHouseVerify:(data)=>dispatch(setHouseVerify(data))
})
export default connect(null,mapDispatchToProps) (PendingProfileComponent)