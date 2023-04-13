import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectRegCertData } from '../../redux/menu/menuSelector';
import UploadRegistrtionComponent from '../login/UploadRegistrtionComponent'

import { Modal, Toast } from 'react-bootstrap';
import uniqid from 'uniqid';
const UploadUserNewModalComponent = ({show,onHide,regCertData}) => {
    React.useEffect(()=>{
        if(regCertData!==null){
            if(regCertData.regStatus=='Y'){
                onHide()
            }
        }
        
    },[regCertData])
  return (
    <>
          <Modal
              show={show}
              onHide={() => onHide()}
              className="modal-login"
              size="md"
              autoFocus={false}
              aria-labelledby="contained-modal-title-vcenter"
              centered
          >
              <button onClick={() => onHide()} type="button" className="close">
              <i class="fa fa-times " aria-hidden="true"></i>
              </button>
              <Modal.Body className='p-5 '>
                <UploadRegistrtionComponent appId={uniqid('IC-')}/>
              </Modal.Body>

          </Modal>
      </>
  )
}
const mapStateToProps=createStructuredSelector({
    regCertData:selectRegCertData
})
export default connect(mapStateToProps) (UploadUserNewModalComponent)