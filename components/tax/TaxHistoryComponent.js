import React from 'react'
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { selectCuser } from '../../redux/user/userSelector';
import { Button, Checkbox, Form, Input,Table,Card,Empty,Spin} from 'antd';

import { useRouter } from 'next/router';
import Axios from 'axios';
const TaxHistoryComponent = ({cUser}) => {
    const [taxData,setTaxData]=React.useState(null)
    const [selctionData,setSelectionData]=React.useState(null)
    const [tAmt,setTamt]=React.useState(0)
    const [loading,setLoading]=React.useState(false)
    //------------------------------
    React.useEffect(()=>{
        let isApiSubscribed = true;
        setLoading(true)
        if(isApiSubscribed){
            Axios.post(`/api/getTaxPayment/byUserId`,{ uid:cUser.id})
            .then(({ data }) => {
                const tempData=[]
                //console.log('api-tax-data',data)
                
                data.forEach((element,idx) => {
                    //console.log('element',element)
                    tempData.push({key:element.dddocno,sNo:idx+1,desc:element.ddrmk,ddrefnopy:element.ddrefnopy,ddpydt:element.ddpydt,ddamount:element.ddamount,ddan:element.ddan,dddocno:element.dddocno,ddrefno
                    :element.ddrefno,ddid:element.ddid})
                  });

                setTaxData(tempData.length>=1?tempData:null)
                setLoading(false)
                
            })
        }
        return () => {
            // cancel the subscription
            isApiSubscribed = false;
          };
    },[cUser])
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
          
          render: text => <a>{text}</a>,
        },
        {
          title: 'Amount(Rs)',
          dataIndex: 'ddamount',
          key: 'ddamount',
          width:'100px',
          render: (text,record) =>{
            //console.log('record',record)
            return(
              <a>{text}</a>
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
                    {taxData!==null?
                        <div className='scheme-block'>
                             <Spin spinning={loading}>  
                            <Table bordered 
                            /*rowSelection={{
                                type:'checkbox',
                                ...rowSelection,
                            }}*/
                            columns={columns} 
                            dataSource={taxData} 
                            />
                        </Spin> 
                        
                        </div>
                    :
                    <>
                      <p className='text-red'>No Data Found</p>
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                      </>
                    }
                </div>
            </div>
        </>
  )
}
const mapStateToProps=createStructuredSelector({
    cUser:selectCuser
  })
export default connect(mapStateToProps) (TaxHistoryComponent)