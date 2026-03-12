import React from 'react'
import './SideNavbar.css'
import { NavLink, useNavigate } from "react-router-dom"
import { useUserInfo } from '../../context/userInfoContext'
import down from '../../assets/angle-down.webp' 
import PropertiesIcon from "../../assets/home-home.svg?react"
import ChatIcon from "../../assets/chat-square.svg?react"
import CalendarIcon from "../../assets/calendar.svg?react"
import OffersIcon from "../../assets/offers.svg?react"
import DocumentsIcon from "../../assets/documents.svg?react"
import SettingsIcon from "../../assets/settings.svg?react"

//Navbar
const SideNavbar = () => {

  const { user } = useUserInfo()
  const navigate = useNavigate()

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
        {user.avatar
          ? <img src={user.avatar} alt="avatar" className="avatar-img" />
          : <div className="avatar-placeholder">{user.name.charAt(0)}</div>
        }
        <p className="sidebar-name">{user.name}</p>
        {/* dropdown container for the arrow icon and menu */}
        <div className="dropdown">
          <img src={down} alt="Dropdown Icon" className="dropdown-icon" />
          <ul className="dropdown-menu">
            <li
              className="dropdown-item"
              onClick={() => navigate('/properties')}
            >
              Profile
            </li>
            <li className="dropdown-item">
              Switch Account
            </li>
          </ul>
        </div>
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
