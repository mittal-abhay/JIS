import React, {useState} from 'react'
import './header.css'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaGreaterThan } from "react-icons/fa";

const Header = ({handleCollapse, IsClose, activeTab, activeSubTab}) => {
  
  const [profileShow, setProfileShow] = useState(false);
  const handleProfileClick = () => {
    setProfileShow(!profileShow);
  }
  return (
    <div className={`header-container ${IsClose ? 'enhance': ''}`}>
      <div className = "btn-tab">
      <RxHamburgerMenu className = "collapse_btn" onClick={handleCollapse}/>
      <div className = "tab-name"><span className = "header-text">{activeTab}{activeSubTab?<FaGreaterThan className = "arrow_icon"/>:''}{activeSubTab}</span></div>
      </div>
      <div className = "profile" onClick = {() => handleProfileClick()}></div>
    <div className={`profile-container ${!profileShow? 'profile-show': ''}`}>
      <span> Hi! User</span>
      <span> <b>Designation</b>: Registrar</span>
      <span style = {{color:'Red',cursor: 'pointer'}}> Logout</span>
    </div>
    </div>
  )
}

export default Header;
