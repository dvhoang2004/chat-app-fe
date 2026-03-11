import React from 'react'
import './SideNavbar.css'
import { NavLink } from "react-router-dom"
import down from '../../assets/angle-down.webp' 
import PropertiesIcon from "../../assets/home-home.svg?react"
import ChatIcon from "../../assets/chat-square.svg?react"
import CalendarIcon from "../../assets/calendar.svg?react"
import OffersIcon from "../../assets/offers.svg?react"
import DocumentsIcon from "../../assets/documents.svg?react"
import SettingsIcon from "../../assets/settings.svg?react"

//Navbar
const SideNavbar = () => {

  const NAV_ITEMS = [
    {icon: <PropertiesIcon className="icon"/>, label: "Properties", id: "properties" },
    {icon: <ChatIcon className="icon"/>, label: "Chat",       id: "chat" },
    {icon: <CalendarIcon className="icon"/>, label: "Calendar",   id: "calendar" },
    {icon: <OffersIcon className="icon"/>, label: "Offers",     id: "offers" },
    {icon: <DocumentsIcon className="icon"/>, label: "Documents",  id: "documents" },
    {icon: <SettingsIcon className="icon"/>, label: "Settings",   id: "settings" },
  ]

  return (
    <div className="side-navbar">
      {/* User avatar */}
      <div className="avatar">
        <img src="/vite.svg" alt="User Avatar" className='avatar-img'/>
        <p>Hoang Doan</p>
        <img src={down} alt="Dropdown Icon" className="dropdown-icon" />
      </div>

      {/* Navigation links */}
      <ul className="nav-items">
        {NAV_ITEMS.map((item) => (
          <li className="nav-item" key={item.id}>
            <NavLink 
              to={`/${item.id}`}
              className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SideNavbar
