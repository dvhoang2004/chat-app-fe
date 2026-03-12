import React from 'react'
import './Properties.css'
import { useUserInfo } from '../../context/userInfoContext'

//user info page, just a simple page to display user info, can be expanded in the future to allow editing user info, changing password, etc.
const Properties = () => {
  const { user } = useUserInfo()

  return (
    <div className="properties-page">
      {user.avatar
        ? <img src={user.avatar} alt="avatar" className="properties-avatar" />
        : <div className="properties-avatar-placeholder">{user.name.charAt(0)}</div>
      }
      <h2>{user.name}</h2>
      <p>Role: {user.role}</p>
      <p>Bio: {user.description}</p>
    </div>
  )
}

export default Properties