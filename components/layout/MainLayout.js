import React from 'react'
import { Layout } from 'antd';
import {useRouter} from 'next/router'
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { selectToggleActive } from '../../redux/menu/menuSelector'
import { selectCuser } from '../../redux/user/userSelector'
import AuthProvider from '../auth/AuthProvider';
import SidebarComponent from '../sidebar/SidebarComponent';
import HeaderComponent from '../header/HeaderComponent';

const MainLayout = ({children,toggleActive,cUser}) => {
    const router=useRouter()
    //console.log('main-layout-router',router)
    const {pathname}=router
    const{iscomplete}=router.query
    
    return (
        <>
            <AuthProvider>
                
                {cUser !== null ?
                    <div className={toggleActive ? 'toggle-sidebar' : ''}>
                        <SidebarComponent />
                        <Layout className="content content-page">
                            <HeaderComponent cUser={cUser} />
                            <div className='content-body'>
                                {children}
                            </div>

                        </Layout>
                    </div>
                    :
                    <>
                        {children}
                    </>
                }


            </AuthProvider>

        </>
    )
}
const mapStateToProps=createStructuredSelector({
   toggleActive:selectToggleActive ,
   cUser:selectCuser
})
export default connect(mapStateToProps) (MainLayout)