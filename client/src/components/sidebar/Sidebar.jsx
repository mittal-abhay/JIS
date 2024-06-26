import React, { useEffect, useState } from 'react';
import './sidebar.css';
import { GoLaw } from "react-icons/go";
import { FaCalendar } from "react-icons/fa";
import { FaPenClip } from "react-icons/fa6";
import { RiGroupFill } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Sidebar = ({ IsClose, setActiveTab, setActiveSubTab, setRecordType, recordType}) => {

  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const handleSubMenuClick = (id) => {
    setActiveTab(id);
    setActiveSubMenu(prevActiveSubMenu => prevActiveSubMenu === id ? null : id);
    setActiveSubTab(null);
  };

  const handleSubtabClick = (id) => {
    setActiveSubTab(id);
  }

  const handleRecordType = (type) => {
    setRecordType(type);
  }
  useEffect(() => {
    setRecordType(recordType);
  }, [recordType, setRecordType]);

  return (
    <div className={`sidebar-container ${IsClose ? 'collapse' : ''}`}>
      <div className = 'Logo'><b>JIS</b></div>
      <div className="sidebar-content">
        <div className="sidebar-item" onClick={() => handleSubMenuClick('Dashboard')}>
          <IoHome className="sidebar-item-icon" /><span className = {`${IsClose? 'hide-item-text': ''}`}><Link to="/dashboard">Dashboard</Link></span>
        </div> 
        <div className="sidebar-item" onClick={() => handleSubMenuClick('Case')}>
          <GoLaw className="sidebar-item-icon" /> <span className = {`${IsClose? 'hide-item-text': ''}`}>Case</span>
        </div>
        <div className={`sidebar-submenu ${activeSubMenu === 'Case' && !IsClose ? 'show' : ''}`}>
          <div className="sidebar-subitem" onClick = {() => handleSubtabClick('All Cases')}><Link to = "/allCases">All Cases</Link></div>
          <div className="sidebar-subitem" onClick = {() => handleSubtabClick('Create Case')}><Link to="/createCase">Create Case</Link></div>
        </div>
        <div className="sidebar-item" onClick={() => handleSubMenuClick('See Cases')}>
        <GoLaw className="sidebar-item-icon" /> <span className = {`${IsClose? 'hide-item-text': ''}`}><Link to="/seeCases">See Cases</Link></span>
        </div>
        <div className="sidebar-item" onClick={() => handleSubMenuClick('Record Something')}>
          <FaPenClip className="sidebar-item-icon" /><span className = {`${IsClose? 'hide-item-text': ''}`}>Record Something</span>
        </div>
        
        <div className={`sidebar-submenu ${activeSubMenu === 'Record Something' && !IsClose ? 'show' : ''}`}>
        <div className="sidebar-subitem" onClick={() => { handleSubtabClick('Record Adjournment'); handleRecordType('record_adjournment'); }}>
          <Link to="/record">Record Adjournment</Link>
        </div>
        <div className="sidebar-subitem" onClick={() => { handleSubtabClick('Record Proceeding'); handleRecordType('record_proceedings'); }}>
          <Link to="/record">Record Proceeding</Link>
        </div>
        <div className="sidebar-subitem" onClick={() => { handleSubtabClick('Record Judgement'); handleRecordType('record_judgement'); }}>
          <Link to="/record">Record Judgement</Link>
        </div>
      </div>

        <div className="sidebar-item" onClick={() => handleSubMenuClick('See Schedule')}>
          <FaCalendar className="sidebar-item-icon" /><span className = {`${IsClose? 'hide-item-text': ''}`}><Link to="/seeSchedule">See Schedule</Link></span>
        </div>

        <div className="sidebar-item" onClick={() => handleSubMenuClick('Manage Team')}>
          <RiGroupFill className="sidebar-item-icon" /><span className = {`${IsClose? 'hide-item-text': ''}`}>Manage Team</span>
        </div>
        <div className={`sidebar-submenu ${activeSubMenu === 'Manage Team'  && !IsClose? 'show' : ''}`}>
          <div className="sidebar-subitem" onClick = {() => handleSubtabClick('Manage Judges')}><Link to="/manageJudges">Manage Judges</Link></div>
          <div className="sidebar-subitem" onClick = {() => handleSubtabClick('Manage Lawyers')}><Link to="/manageLawyers">Manage Lawyers</Link></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
