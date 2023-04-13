import React from 'react'
import {useRouter} from 'next/router'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import { selectMenuId,selectSubMenuId } from '../../redux/menu/menuSelector'
import { setMenuId,setSubMenuId } from '../../redux/menu/menuAction'
const SidebarComponent = ({menuId,subMenuId,setMenuId,setSubMenuId}) => {
    const router=useRouter()
    const[id,setId]=React.useState(1)
    const [active,setActive]=React.useState(false)
    const [subId,setSubId]=React.useState(1.1)
    React.useEffect(()=>{
        let isApiSubscribed = true;
        if(isApiSubscribed){
            setId(menuId)
            setSubId(subMenuId)
        }
        
        return () => {
            // cancel the subscription
            isApiSubscribed = false;
          };
    },[menuId,subMenuId])
    const menuClick=(id)=>{
        //setId(id)
        setMenuId(id)
        //setActive(!active)
    }
    const onSubMenuClick=(id)=>{
        if(id==2.1){
            router.push('/tax')
        }else if(id==2.2){
            router.push('/tax/tax-history')
        }else if(id==1.1){
            router.push('/')
        }
        //setSubId(id)
        setSubMenuId(id)
    }
  return (
      <>
          <div className="sidebar">
              <div className="sidebar-header">
                  <div>
                      <a href="#" className="sidebar-logo"><span>Village Panchayat </span></a>
                      <small className="sidebar-logo-headline">Chicalim</small>
                  </div>
              </div>
              <div id="dpSidebarBody" className="sidebar-body">
                  <ul className="nav nav-sidebar">
                      {/*<li className="nav-label"><label className="content-label">Template Pages</label></li>*/}
                      <li className={id==1?"nav-item show":"nav-item"}>
                          <a onClick={()=>menuClick(1)} href="#" className={id==1?"nav-link with-sub active":"nav-link with-sub"}><i data-feather="box"></i> Dashboard</a>
                          <ul className="nav nav-sub">
                              <li className="nav-sub-item"><a onClick={()=>onSubMenuClick(1.1)}href="#" className={subId==1.1?"nav-sub-link active":"nav-sub-link "}>My Desk</a></li>
                             
                          </ul>
                      </li>
                      
                      <li className={id==2?"nav-item show":"nav-item"}>
                          <a onClick={()=>menuClick(2)} href="#" className={id==2?"nav-link with-sub active":"nav-link with-sub"}><i className="fa fa-money" aria-hidden="true"></i><strong>Payments</strong></a>
                          <nav className="nav nav-sub">
                              <a onClick={()=>onSubMenuClick(2.1)} href="#" className={subId==2.1?"nav-sub-link active":"nav-sub-link "}>Tax Payment</a>
                              <a onClick={()=>onSubMenuClick(2.2)} href="#" className={subId==2.2?"nav-sub-link active":"nav-sub-link "}>View Payment History</a>
                          </nav>
                      </li>
                  </ul>
              </div>
          </div>
      </>
  )
}
const mapStateToProps=createStructuredSelector({
    menuId:selectMenuId,
    subMenuId:selectSubMenuId
})
const mapDispatchToProps=dispatch=>({
    setMenuId:(data)=>dispatch(setMenuId(data)),
    setSubMenuId:data=>dispatch(setSubMenuId(data))
})
export default connect(mapStateToProps,mapDispatchToProps) (SidebarComponent)