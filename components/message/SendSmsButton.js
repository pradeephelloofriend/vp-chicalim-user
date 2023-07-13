import { Button } from 'antd';
import React from 'react'

//const client = require('twilio')(process.env.TWILO_SID, process.env.TWILO_TOKEN);
import Axios from 'axios';
const SendSmsButton = () => {
    const sendMsg=()=>{
      Axios.post(`/api/message/sendSMS`,{})
      .then(({data})=>{
        console.log('data-sms',data)
      })
        /*client.messages
        .create({
                from: process.env.TWILO_NUMBER,
            to: '+918249396180'
        })
        .then(message => console.log(message.sid))
        .done();*/
    }
  return (
    <div>
        <Button onClick={()=>sendMsg()}>Send Message</Button>
    </div>
  )
}

export default SendSmsButton