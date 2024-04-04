import React, { useState } from 'react';
import './sidebar.css';
import { GoLaw } from "react-icons/go";
import { FaCalendar } from "react-icons/fa";
import { FaPenClip } from "react-icons/fa6";
import { RiGroupFill } from "react-icons/ri";
import { IoHome } from "react-icons/io5";

const Sidebar = ({ IsClose, setActiveTab, setActiveSubTab}) => {
 
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const handleSubMenuClick = (id) => {
    setActiveTab(id);
    setActiveSubMenu(prevActiveSubMenu => prevActiveSubMenu === id ? null : id);
    setActiveSubTab(null);
  };

  const handleSubtabClick = (id) => {
    setActiveSubTab(id);
  }

  return (
    <div className={`sidebar-container ${IsClose ? 'collapse' : ''}`}>
      <div className = 'Logo'></div>
      <div className="sidebar-content">
      <div className="sidebar-item" onClick={() => handleSubMenuClick('Dashboard')}>
          <IoHome className="sidebar-item-icon" /><span className = {`${IsClose? 'hide-item-text': ''}`}>Dashboard</span>
        </div>
        <div className="sidebar-item" onClick={() => handleSubMenuClick('Case')}>
          <GoLaw className="sidebar-item-icon" /> <span className = {`${IsClose? 'hide-item-text': ''}`}>Case</span>
        </div>
        <div className={`sidebar-submenu ${activeSubMenu === 'Case' && !IsClose ? 'show' : ''}`}>
          <div className="sidebar-subitem" onClick = {() => handleSubtabClick('Create Case')}>Create Case</div>
          <div className="sidebar-subitem" onClick = {() => handleSubtabClick('See Case status')}>See Case status</div>
          <div className="sidebar-subitem" onClick = {() => handleSubtabClick('Pending Cases')}>Pending Cases</div>
          <div className="sidebar-subitem" onClick = {() => handleSubtabClick('Resolved Cases')}>Resolved Cases</div>
        </div>

        <div className="sidebar-item" onClick={() => handleSubMenuClick('Record Something')}>
          <FaPenClip className="sidebar-item-icon" /><span className = {`${IsClose? 'hide-item-text': ''}`}>Record Something</span>
        </div>
        <div className={`sidebar-submenu ${activeSubMenu === 'Record Something'  && !IsClose? 'show' : ''}`}>
          <div className="sidebar-subitem" onClick = {() => handleSubtabClick('Record Adjournment')}>Record Adjournment</div>
          <div className="sidebar-subitem" onClick = {() => handleSubtabClick('Record Proceeding')}>Record Proceeding</div>
          <div className="sidebar-subitem" onClick = {() => handleSubtabClick('Record Judgement')}>Record Judgement</div>
        </div>

        <div className="sidebar-item" onClick={() => handleSubMenuClick('See Schedule')}>
          <FaCalendar className="sidebar-item-icon" /><span className = {`${IsClose? 'hide-item-text': ''}`}>See Schedule</span>
        </div>

        <div className="sidebar-item" onClick={() => handleSubMenuClick('Manage Team')}>
          <RiGroupFill className="sidebar-item-icon" /><span className = {`${IsClose? 'hide-item-text': ''}`}>Manage Team</span>
        </div>
        <div className={`sidebar-submenu ${activeSubMenu === 'Manage Team'  && !IsClose? 'show' : ''}`}>
          <div className="sidebar-subitem" onClick = {() => handleSubtabClick('Manage Judges')}>Manage Judges</div>
          <div className="sidebar-subitem" onClick = {() => handleSubtabClick('Manage Lawyers')}>Manage Lawyers</div>
         
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
