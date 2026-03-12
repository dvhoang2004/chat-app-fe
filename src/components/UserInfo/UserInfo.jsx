import { useRef, useState } from 'react'
import './UserInfo.css'
import EditIcon from "../../assets/edit-profile.svg"
import { useUserInfo } from '../../context/userInfoContext'

const UserInfo = () => {
  const { user, updateUser } = useUserInfo()
  const [editing, setEditing] = useState(null)
  const [tempValue, setTempValue] = useState("")
  const avatarInputRef = useRef(null)

  const startEdit = (field) => {
    setEditing(field)
    setTempValue(user[field])
  }

  const confirmEdit = () => {
    if (!tempValue.trim()) return
    updateUser({ [editing]: tempValue.trim() })
    setEditing(null)
  }

  const handleKey = (e) => {
    if (e.key === "Enter") confirmEdit()
    if (e.key === "Escape") setEditing(null)
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => updateUser({ avatar: reader.result })
    reader.readAsDataURL(file)
  }

  return (
    <div className="user-info">

      {/* Title */}
      <div className="user-info-header">
        <p className="user-info-title">User Information</p>
      </div>

      {/* Avatar */}
      <div className="avatar">
        <div className="avatar-img-wrap">
          {user.avatar
            ? <img src={user.avatar} alt="avatar" className="avatar-img" />
            : <div className="avatar-placeholder">{user.name.charAt(0)}</div>
          }
        </div>
        <img
          src={EditIcon}
          alt="Edit Avatar"
          className="edit-icon"
          onClick={() => avatarInputRef.current?.click()}
        />
        <input
          ref={avatarInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleAvatarChange}
        />
      </div>

      {/* Name */}
      <div className="info-row">
        <span className="info-label">Name</span>
        <div className="info-field">
          {editing === "name" ? (
            <input className="info-input" value={tempValue}
              onChange={e => setTempValue(e.target.value)}
              onKeyDown={handleKey} onBlur={confirmEdit} autoFocus />
          ) : (
            <p>{user.name}</p>
          )}
          <img src={EditIcon} alt="Edit" className="edit-icon" onClick={() => startEdit("name")} />
        </div>
      </div>

      {/* Role */}
      <div className="info-row">
        <span className="info-label">Role</span>
        <div className="info-field">
          {editing === "role" ? (
            <input className="info-input" value={tempValue}
              onChange={e => setTempValue(e.target.value)}
              onKeyDown={handleKey} onBlur={confirmEdit} autoFocus />
          ) : (
            <p>{user.role}</p>
          )}
          <img src={EditIcon} alt="Edit" className="edit-icon" onClick={() => startEdit("role")} />
        </div>
      </div>

      {/* Description */}
      <div className="info-row">
        <span className="info-label">Description</span>
        <div className="info-field">
          {editing === "description" ? (
            <textarea className="info-input" value={tempValue}
              onChange={e => setTempValue(e.target.value)}
              onKeyDown={handleKey} onBlur={confirmEdit} autoFocus />
          ) : (
            <p>{user.description}</p>
          )}
          <img src={EditIcon} alt="Edit" className="edit-icon" onClick={() => startEdit("description")} />
        </div>
      </div>

    </div>
  )
}

export default UserInfo