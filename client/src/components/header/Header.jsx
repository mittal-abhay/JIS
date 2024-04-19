import React, {useState} from 'react'
import './header.css'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaGreaterThan } from "react-icons/fa";
import { useAuth } from '../../context/AuthContext';
import {useNavigate} from 'react-router-dom';
const Header = ({handleCollapse, IsClose, activeTab, activeSubTab}) => {
  const username = JSON.parse(localStorage.getItem('isLoggedIn')).username;
  const role = JSON.parse(localStorage.getItem('isLoggedIn')).role;

  const navigate = useNavigate();
  const [profileShow, setProfileShow] = useState(false);
  const handleProfileClick = () => {
    setProfileShow(!profileShow);
  }
  const {logout} = useAuth();
  const handleLogout = async () => {
    try{
      await logout();
      navigate('/');
    }catch{
      console.log('Failed to logout');
    }
  }
  return (
    <div className={`header-container ${IsClose ? 'enhance': ''}`}>
      <div className = "btn-tab">
      <RxHamburgerMenu className = "collapse_btn" onClick={handleCollapse}/>
      <div className = "tab-name"><span className = "header-text">{activeTab}{activeSubTab?<FaGreaterThan className = "arrow_icon"/>:''}{activeSubTab}</span></div>
      </div>
      <div className = "profile" onClick = {() => handleProfileClick()}></div>
    <div className={`profile-container ${!profileShow? 'profile-show': ''}`}>
      <span> Hi! {username}</span>
      <span> <b>Designation</b>: {role}</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
    </div>
  )
}

export default Header;
