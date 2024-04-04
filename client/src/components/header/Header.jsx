import React from 'react'
import './header.css'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaGreaterThan } from "react-icons/fa";

const Header = ({handleCollapse, IsClose, activeTab, activeSubTab}) => {
  return (
    <div className={`header-container ${IsClose ? 'enhance': ''}`}>
      <div className = "btn-tab">
      <RxHamburgerMenu className = "collapse_btn" onClick={handleCollapse}/>
      <div className = "tab-name"><span className = "header-text">{activeTab}{activeSubTab?<FaGreaterThan className = "arrow_icon"/>:''}{activeSubTab}</span></div>
      </div>
      <div className = "profile"></div>
    </div>
  )
}

export default Header;
