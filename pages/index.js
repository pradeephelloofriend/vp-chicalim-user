import React from 'react'

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import UnderDevelopComponent from '../components/error/UnderDevelopComponent';

import HomeComponent from '../components/home/HomeComponent';
import ProtectRoute from '../components/layout/ProtectRoute';
const Index = () => {
   
    return (
        <>
        <ProtectRoute>
            {/*<HomeComponent/>*/}
            <UnderDevelopComponent/>
          </ProtectRoute>
        </>
    )
}

export default Index