import React from 'react'

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import UnderDevelopComponent from '../components/error/UnderDevelopComponent';

import HomeComponent from '../components/home/HomeComponent';
import ProtectRoute from '../components/layout/ProtectRoute';
import PendingProfileComponent from '../components/profile/PendingProfileComponent';
import { selectCuser } from '../redux/user/userSelector';
const index = ({cUser}) => {
   
    return (
        <>
        <ProtectRoute>
            {/*<HomeComponent/>*/}
            <PendingProfileComponent cUser={cUser}/>
          </ProtectRoute>
        </>
    )
}
const mapStateToProps=createStructuredSelector({
    cUser:selectCuser
})
export default connect(mapStateToProps)(index)