import { Button } from 'antd'
import React from 'react'
import Image from 'next/image'
import govgoalogo from '../../public/img/receipt20.png'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PrintButtonComponent = ({taxId}) => {

  const generatePDF = () => {
    const input = document.getElementById('pdf-content');
  
    html2canvas(input)
      .then((canvas) => {
        const pdf = new jsPDF();
  
        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('output.pdf');
      });
  };


  return (
    <div>
      <div id="pdf-content">
      <div className="row">
        <div className='col-lg-4 col-md-4 col-sm-6'>
          <div className='center-img'><Image className='image' alt="example" src={govgoalogo}/></div>
          
        </div>
        <div className='col-lg-4 col-md-4 col-sm-6'>
          <div className='hdr-pd'>
            <h2 style={{ textAlign: "center" }}>Village Panchayat of Chicalim, Chicalim, Mormugao - Goa.</h2>
          </div>
        </div>
        <div className='col-lg-4 col-md-4 col-sm-6'>
        </div>
      </div>

      <div className="row">
        <div className='col-lg-12 col-md-12 col-sm-6'>
          <h3 style={{ textAlign: "center" }}>Receipt</h3>
        </div>

        <div className='col-lg-12 col-md-12 col-sm-6'>
          <div className='container-receipt sp-top'>
            <p>Sub :- Auto Generated Receipt towards Taxes and Fees Payment.</p>
            <p>Receipt No & Date :-  ____________ {taxId}</p>
          </div>
        </div>

        <div className='col-lg-12 col-md-12 col-sm-6'>
          <div className='container-receipt sp-top'>
            <p>We are in receipt of Total Amount ______  vide reference number ________ dated _______</p>
            <br />

            <p>Details as follows:-</p>
            <p>House Tax (D01) : Hno ________ against Doc No ______ dated _____Amount Rs._______</p>
            <p>Light Tax (D10) : Hno ________ against Doc No ______ dated _____Amount Rs.______</p>
            <br />

            <p>This receipt is valid subject to realization of payment as per reference given.</p>
          </div>
          
        </div>
      </div>

      <div className="row">
        <div className='col-lg-10 col-md-10 col-sm-8'>
        </div>
        <div className='col-lg-2 col-md-2 col-sm-4'>
          <p className='sgn-sp'>Sarpanch</p>
        </div>
      </div>
      </div>

      
      <Button onClick={generatePDF}>View/Print</Button>
    </div>
  )
}

export default PrintButtonComponent




