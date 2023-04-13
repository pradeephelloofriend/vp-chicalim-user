import React from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Barcode from '../../components/barcode/Barcode'
import HelloWorld from '../../components/barcode/HelloWorld'
const index = () => {
  return (
    <>
    <div>
            <div className={'UIElement'}>
          <Barcode/>
        </div>
    </div>
    
    </>
  )
}

export default index