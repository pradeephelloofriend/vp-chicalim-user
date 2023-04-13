import React from 'react'
import {connect} from 'react-redux'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { setToggleActive } from '../../redux/menu/menuAction'
const HeaderComponent = ({setToggleActive,cUser}) => {
  const router=useRouter()
    const[uActive,setUActive]=React.useState(false)
    const[nActive,setNActive]=React.useState(false)
    //console.log('uActive',uActive)
  return (
    <>
    <div className="header">
        <div className="header-left">
          <a onClick={()=>setToggleActive()} href="#" className="burger-menu"><i data-feather="menu"></i></a>

          <div className="header-search">
            <i data-feather="search"></i>
            <input type="search" className="form-control" placeholder="What are you looking for?"/>
          </div>
        </div>

        <div className="header-right">
          <a href="#" className="header-help-link"><i data-feather="help-circle"></i></a>
          <div className={nActive?"dropdown dropdown-notification show":"dropdown dropdown-notification"}>
            <a onClick={()=>setNActive(!nActive)} href="#" className="dropdown-link new" data-toggle="dropdown"><i data-feather="bell"></i></a>
            <div className={nActive?"dropdown-menu dropdown-menu-right show":"dropdown-menu dropdown-menu-right"}>
              <div className="dropdown-menu-header">
                <h6>Notifications</h6>
                <a href="#"><i data-feather="more-vertical"></i></a>
              </div>
              <div className="dropdown-menu-body">
                <a href="#" className="dropdown-item">
                  <div className="avatar"><span className="avatar-initial rounded-circle text-primary bg-primary-light">s</span></div>
                  <div className="dropdown-item-body">
                    <p><strong>Socrates Itumay</strong> marked the task as completed.</p>
                    <span>5 hours ago</span>
                  </div>
                </a>
                <a href="#" className="dropdown-item">
                  <div className="avatar"><span className="avatar-initial rounded-circle tx-pink bg-pink-light">r</span></div>
                  <div className="dropdown-item-body">
                    <p><strong>Reynante Labares</strong> marked the task as incomplete.</p>
                    <span>8 hours ago</span>
                  </div>
                </a>
                <a href="#" className="dropdown-item">
                  <div className="avatar"><span className="avatar-initial rounded-circle tx-success bg-success-light">d</span></div>
                  <div className="dropdown-item-body">
                    <p><strong>Dyanne Aceron</strong> responded to your comment on this <strong>post</strong>.</p>
                    <span>a day ago</span>
                  </div>
                </a>
                <a href="#" className="dropdown-item">
                  <div className="avatar"><span className="avatar-initial rounded-circle tx-indigo bg-indigo-light">k</span></div>
                  <div className="dropdown-item-body">
                    <p><strong>Kirby Avendula</strong> marked the task as incomplete.</p>
                    <span>2 days ago</span>
                  </div>
                </a>
              </div>
              <div className="dropdown-menu-footer">
                <a href="#">View All Notifications</a>
              </div>
            </div>
          </div>
          <div className={uActive?"dropdown dropdown-loggeduser show": "dropdown dropdown-loggeduser"}>
            <a onClick={()=>setUActive(!uActive)} href="#" className="dropdown-link" data-toggle="dropdown">
              <div className="avatar avatar-sm">
              <Image className="rounded-circle" src='https://res.cloudinary.com/depg2aab2/image/upload/v1667626182/vp/nagoa/user-min_dbcgcb.jpg' height={32} width={32} alt='' />
              </div>
            </a>
            <div className={uActive?"dropdown-menu dropdown-menu-right show":"dropdown-menu dropdown-menu-right"}>
              <div className="dropdown-menu-header">
                <div className="media align-items-center">
                  <div className="avatar">
                    <Image className="rounded-circle" src='https://res.cloudinary.com/depg2aab2/image/upload/v1667626182/vp/nagoa/user-min_dbcgcb.jpg' height={32} width={32} alt='' />
                    
                  </div>
                  <div className="media-body mg-l-10">
                    <h6>{cUser.displayName}</h6>
                    <span>{cUser.email}</span>
                  </div>
                </div>
              </div>
              <div className="dropdown-menu-body">
                <a href="#" className="dropdown-item"><i data-feather="user"></i> View Profile</a>
                <a href="#" className="dropdown-item"><i data-feather="edit-2"></i> Edit Profile</a>
                <a href="#" className="dropdown-item"><i data-feather="briefcase"></i> Account Settings</a>
                <a href="#" className="dropdown-item"><i data-feather="shield"></i> Privacy Settings</a>
                <a onClick={()=>router.push('/logout')} href="#" className="dropdown-item"><i data-feather="log-out"></i> Sign Out</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
const mapDispatchToProps=dispatch=>({
    setToggleActive:()=>dispatch(setToggleActive())
})
export default connect(null,mapDispatchToProps) (HeaderComponent)