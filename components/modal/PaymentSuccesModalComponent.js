
import React from 'react'
import { connect } from 'react-redux';
import {Result,Button} from 'antd'
import { createStructuredSelector } from 'reselect';


import { Modal, Toast } from 'react-bootstrap';

const PaymentSuccesModalComponent = ({show,onHide,paymentId}) => {
    
  return (
      <>
          <Modal
              show={show}
              onHide={() => onHide()}
              className="modal-login payment-modal"
              size="sm"
              autoFocus={false}
              aria-labelledby="contained-modal-title-vcenter"
              centered
          >
              <button onClick={() => onHide()} type="button" className="close">
                  <i class="fa fa-times " aria-hidden="true"></i>
              </button>
              <Modal.Body className='p-2'>
                  <Result
                      status="success"
                      title="Successfully Payment Done!"
                      subTitle={"Payment ID:"+ paymentId}
                      extra={[
                          
                          <Button onClick={() => onHide()} key="buy">OK</Button>,
                      ]}
                  />
              </Modal.Body>

          </Modal>
      </>
  )
}

export default PaymentSuccesModalComponent