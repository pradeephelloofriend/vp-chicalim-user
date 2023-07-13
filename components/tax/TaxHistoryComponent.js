import React from 'react'
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { selectCuser } from '../../redux/user/userSelector';
import { Button, Checkbox, Form, Input,Table,Card,Empty,Spin, Select} from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import Axios from 'axios';
const TaxHistoryComponent = ({cUser}) => {
    const [taxData,setTaxData]=React.useState(null)
    const [selctionData,setSelectionData]=React.useState(null)
    const [tAmt,setTamt]=React.useState(0)
    const [loading,setLoading]=React.useState(false)
    const[hnData,setHnData]=React.useState(null)
    const[houseNo,setHouseNo]=React.useState(null) //addres number
    //------------------------------
    const onChangeSelect=(value)=>{
      console.log('select',value)
      setHouseNo(value)
    }

    const[isLoading,setIsLoading]=React.useState(false)
      const selectHandeler=()=>{
        try {
            setIsLoading(true)
            Axios.post(`/api/user/getAllHouseNoByUid`,{uId:cUser.id})
            .then(({data})=>{
              setHnData(data)
              setIsLoading(false)
            }).catch((error)=>{
              setIsLoading(false)
            })
        } catch (error) {
            setIsLoading(false)
        }
        
        //alert('hhggg')
    }
    const getTaxHistoryData=(houseNo)=>{
      try {
        setLoading(true)
        Axios.post(`/api/getTaxPayment/byUserId`,{ uid:houseNo})
            .then(({ data }) => {
                const tempData=[]
                //console.log('api-tax-data',data)
                
                data.forEach((element,idx) => {
                    //console.log('element',element)
                    tempData.push({key:element.DDDOCNO,sNo:idx+1,desc:element.DDRMK,ddrefnopy:element.DDREFNOPY,ddpydt:element.DDPYDT,ddamount:element.DDAMOUNT,ddan:element.DDAN,dddocno:element.DDDOCNO,ddrefno
                    :element.DDREFNO,ddid:element.DDID})
                  });

                setTaxData(tempData.length>=1?tempData:null)
                setLoading(false)
                
            }).catch((error)=>{
              setLoading(false)
            })
      } catch (error) {
        setLoading(false)
      }
    }
    React.useEffect(()=>{
        let isApiSubscribed = true;
        ////setLoading(true)
        if(isApiSubscribed){
            if (houseNo!==null) {
              getTaxHistoryData(houseNo)
            }
        }
        return () => {
            // cancel the subscription
            isApiSubscribed = false;
          };
    },[cUser,houseNo])
    //----------
    const columns = [
        {
          title: 'Sr. No',
          dataIndex: 'sNo',
          key: 'sNo',
          width:'70px',
          render: text => <a>{text}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'desc',
            key: 'desc',
            
            render: text => <a>{text}</a>,
          },
          {
            title: 'Payment ID',
            dataIndex: 'ddrefnopy',
            key: 'ddrefnopy',
            
            render: text => <a>{text}</a>,
          },
        {
          title: 'Payment Date',
          dataIndex: 'ddpydt',
          key: 'ddpydt',
          
          render: text => <a>{moment(text).format("DD/MM/YYYY")}</a>,
        },
        {
          title: 'Amount(Rs)',
          dataIndex: 'ddamount',
          key: 'ddamount',
          width:'100px',
          render: (text,record) =>{
            //console.log('record',record)
            return(
              <a>₹{text}</a>
            )
          }
        },
        
      ]
    return (
        <>
            <div className="row">
                <div className='col-12 mt-10 mb-10'>
                    <div className="caption1">
                        <h3>{'TAX PAYMENTS HISTORY'}</h3>
                        <p>Enter the details to get Your tax payments list and details.</p>
                    </div>
                    <div className='mb-10'>
            <div>
            <a>Select House Number</a>
            </div>
             <Select 
             style={{width:'30%'}}
             onClick={() => selectHandeler()}
             //onChange={(value)=>onChangeSelect(value)}
             onSelect={(value)=>onChangeSelect(value)}
             loading={isLoading}
             placeholder="Select House Number"
             >
              {
                hnData!==null?
                hnData.map((h,hx)=>
                <Select.Option key={hx} value={h.m_an}>{h.m_hno}</Select.Option>
                )
                :<></>
              }
              
             </Select>
          </div>
                    
                        <div className='scheme-block'>
                               
                            <Table 
                            loading={loading}
                            bordered 
                            /*rowSelection={{
                                type:'checkbox',
                                ...rowSelection,
                            }}*/
                            columns={columns} 
                            dataSource={taxData!==null?taxData:[]} 
                            />
                        
                        
                        </div>
                    
                </div>
            </div>
        </>
  )
}
const mapStateToProps=createStructuredSelector({
    cUser:selectCuser
  })
export default connect(mapStateToProps) (TaxHistoryComponent)