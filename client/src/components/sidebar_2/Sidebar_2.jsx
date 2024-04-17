import React, { useState } from 'react';
import "./Sidebar_2.css";
import { GoLaw } from "react-icons/go";
import { FaCalendar } from "react-icons/fa";
import { FaPenClip } from "react-icons/fa6";
import { RiGroupFill } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Sidebar_2 = ({ IsClose, setActiveTab, setActiveSubTab}) => {

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
      <div className = 'Logo'>LOGO</div>
      <div className="sidebar-content">
        <div className="sidebar-item" onClick={() => handleSubMenuClick('See Case')}>
          <GoLaw className="sidebar-item-icon" /> <span className = {`${IsClose? 'hide-item-text': ''}`}>See Case</span>
        </div>

      </div>
    </div>
  );
};

export default Sidebar_2;
