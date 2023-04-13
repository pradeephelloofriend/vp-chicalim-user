import React from 'react'
import { connect, Connect } from 'react-redux';
import {createStructuredSelector} from 'reselect'
import {selectRegStatus} from '../../redux/menu/menuSelector'
import { Modal, Toast } from 'react-bootstrap';
import LoginComponent from '../login/LoginComponent';
import RegistrationComponent from '../login/RegistrationComponent';

const LoginModalComponent = ({show,onHide,regStatus}) => {
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
                {regStatus?
                <RegistrationComponent/>
                :
                <LoginComponent/>
                }
                
                
              </Modal.Body>

          </Modal>
      </>
  )
}
const mapStateToProps=createStructuredSelector({
  regStatus:selectRegStatus
})
export default connect(mapStateToProps) (LoginModalComponent)