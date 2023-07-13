import React from 'react'
import Image from 'next/image'
import PrintButtonComponent from '../../components/receipt/PrintButtonComponent'

const index = () => {
  return (
    <div>receipt 

        <PrintButtonComponent taxId={1}/>
    </div>

  )
}

export default index