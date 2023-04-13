import React from 'react'
//import  './canvasStyles.css';
import { connect } from 'react-redux';

import {selectUserActive} from '../../redux/user/userSelector'
import { Spin,Empty } from 'antd';

import { createStructuredSelector } from 'reselect';
const OverlayComponent = ({userActive}) => {
    //active ? "active off_canvars_overlay" :"off_canvars_overlay"
    return (
        <section className={userActive? "active off_canvars_overlay" :"off_canvars_overlay"}>
                <div className='container' style={{display:'flex',justifyContent:'center',alignItems:'center',alignContent:'center',height:'100%'}}>
                    <Spin  tip="Loading..." size="large"/>
                </div>
        </section>
    )
}
const mapStateToProps = createStructuredSelector({
    userActive:selectUserActive,
    
})

export default connect(mapStateToProps) (OverlayComponent)
