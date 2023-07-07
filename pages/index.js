import React from 'react'

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import UnderDevelopComponent from '../components/error/UnderDevelopComponent';

import HomeComponent from '../components/home/HomeComponent';
import ProtectRoute from '../components/layout/ProtectRoute';
import PendingProfileComponent from '../components/profile/PendingProfileComponent';
import { selectCuser } from '../redux/user/userSelector';
import Axios from 'axios';

const index = ({cUser}) => {
   
    return (
        <>
        <ProtectRoute>
            {/*<HomeComponent/>*/}
                    <div className='welcome-head mt-10'>
                        <p className='mb-0' style={{textTransform:'capitalize'}}><b>{cUser.displayName}</b></p>
                        <p>Welcome to Village Panchyat ,Chicalim</p>
                        
                    </div>
            <PendingProfileComponent cUser={cUser}/>
            
          </ProtectRoute>
        </>
    )
}
const mapStateToProps=createStructuredSelector({
    cUser:selectCuser
})
export default connect(mapStateToProps)(index)