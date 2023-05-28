import { Card,Button, Result, Spin } from 'antd'
import React from 'react'
import Axios from 'axios';
import { useRouter } from 'next/router';
const PendingProfileComponent = ({cUser}) => {
    const router=useRouter()
    const[status,setStatus]=React.useState('N')
    const[isLoading,setIsLoading]=React.useState(false)
    const getUserData=(id)=>{
        try {
            setIsLoading(true)
           Axios.post('/api/user/getUserStatus',{uId:id})
           .then(({data})=>{
                setStatus(data[0].m_istatus)
                setIsLoading(false)
           })
        } catch (error) {
            
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
    //console.log('status',status)
    return (
        
        <div className='pen-profile mt-10 mb-10'>
            <Spin spinning={isLoading}>
            {status=='N'?
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
            }
            
            </Spin>
        </div>
    )
}

export default PendingProfileComponent