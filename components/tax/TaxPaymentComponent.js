import React from 'react'
import { Button, Checkbox, Form, Input,Table,Card,Empty,Spin, Select} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import Axios from 'axios';
import MakeTaxPaymentComponent from '../payment/MakeTaxPaymentComponent';
import { createStructuredSelector } from 'reselect';
import { selectCuser, selectHouseVerify } from '../../redux/user/userSelector';
import { connect } from 'react-redux';

const TaxPaymentComponent = ({cUser,hVerify}) => {
    const router= useRouter()
    const [form] = Form.useForm();
    const [taxData,setTaxData]=React.useState(null)
    const [selctionData,setSelectionData]=React.useState(null)
    const [tAmt,setTamt]=React.useState(0)
    const [loading,setLoading]=React.useState(false)
    const[hnData,setHnData]=React.useState(null)
    const[houseNo,setHouseNo]=React.useState(null) //addres number

  const onChangeSelect=(value)=>{
    console.log('select',value)
    setHouseNo(value)
  }
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
          title: 'Date',
          dataIndex: 'dddocdt',
          key: 'dddocdt',
          
          render: text => <a>{text}</a>,
        },
        {
          title: 'Amount',
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
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectionData(selectedRows)
            const sum=selectedRows.reduce((a,v) =>  a = a + parseFloat(v.ddamount), 0 )
            setTamt(sum.toFixed(2))
          //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', sum);
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
          name: record.name,
        }),
      };
      const getHouseTaxData=(id)=>{
        try {
          setLoading(true)
        Axios.post(`/api/getTaxPayment`,{ hNo:id})
            .then(({ data }) => {
                const tempData=[]
                //console.log('api-taxi-data',data)
                
                data.forEach((element,idx) => {
                    //console.log('element',element)
                    tempData.push({key:element.DDDOCNO,sNo:idx+1,desc:element.DL01,dddocdt:element.DDDOCDT,ddamount:element.DDAMOUNT,ddan:element.DDAN,dddocno:element.DDDOCNO,ddrefno
                    :element.DDREFNO,ddid:element.DDID})
                  });

                setTaxData(tempData.length>=1?tempData:null)
                setLoading(false)
                
            })
        } catch (error) {
          setLoading(false)
        }
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
      //console.log('loading',loading)
      React.useEffect(()=>{
        let isAppSubsribed=true
        if (isAppSubsribed) {
            //getHouseTaxData(cUser.hNo)
            if (houseNo!==null) {
              getHouseTaxData(houseNo)
            }
           //getAllHouseNumber(cUser.id)
        }
      },[cUser,houseNo])
      //console.log('tamount',Number(tAmt))
  return (
    <>
    <Spin spinning={loading}>
      <div className="row">
        
          <div className="caption1 mt-10">
            <h3>{'TAX PAYMENTS'}</h3>
            <p>Amount shown is outstanding towards your account. To avoid additional fees, please pay.</p>
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

          {taxData !== null ?
            <>

              <div className='col-md-6'>
                <div className='scheme-block'>

                  <Table 
                  loading={loading}
                  bordered
                    rowSelection={{
                      type: 'checkbox',
                      ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={taxData}
                  />


                </div>
              </div>
              <div className='col-md-6'>
                <MakeTaxPaymentComponent tAmt={tAmt} selctionData={selctionData} />

              </div>

            </>

            :
            <>
              
            </>

          }

      </div>
    </Spin >



      </>
  )
}
const mapStateToProps=createStructuredSelector({
  cUser:selectCuser,
  hVerify:selectHouseVerify
})
export default connect(mapStateToProps) (TaxPaymentComponent)