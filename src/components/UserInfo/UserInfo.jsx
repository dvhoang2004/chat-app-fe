import { useRef, useState } from 'react'
import './UserInfo.css'
import EditIcon from "../../assets/edit-profile.svg"
import { useUserInfo } from '../../context/userInfoContext'

const UserInfo = () => {
  const { user, updateUser } = useUserInfo()
  const [editing, setEditing] = useState(null)
  const [tempValue, setTempValue] = useState("")
  const [editingAll, setEditingAll] = useState(false)
  const [tempAll, setTempAll] = useState({ name: "", role: "", description: "" })
  const avatarInputRef = useRef(null)

  // single field edit
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

  // edit all fields at once
  const startEditAll = () => {
    setTempAll({
      name: user.name,
      role: user.role,
      description: user.description
    })
    setEditingAll(true)
  }

  const confirmEditAll = () => {
    if (!tempAll.name.trim()) return
    updateUser({
      name: tempAll.name.trim(),
      role: tempAll.role.trim(),
      description: tempAll.description.trim()
    })
    setEditingAll(false)
  }

  const cancelEditAll = () => setEditingAll(false)

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => updateUser({ avatar: reader.result })
    reader.readAsDataURL(file)
  }

  return (
    <div className="user-info">

      {/* Title + edit all icon */}
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

      {/* Edit all mode */}
      {editingAll ? (
        <div className="edit-all-form">
          <div className="edit-all-field">
            <label>Name</label>
            <input
              className="info-input"
              value={tempAll.name}
              onChange={e => setTempAll({ ...tempAll, name: e.target.value })}
              autoFocus
            />
          </div>
          <div className="edit-all-field">
            <label>Role</label>
            <input
              className="info-input"
              value={tempAll.role}
              onChange={e => setTempAll({ ...tempAll, role: e.target.value })}
            />
          </div>
          <div className="edit-all-field">
            <label>Description</label>
            <textarea
              className="info-input"
              value={tempAll.description}
              onChange={e => setTempAll({ ...tempAll, description: e.target.value })}
            />
          </div>
          <div className="edit-all-actions">
            <button className="btn-confirm" onClick={confirmEditAll}>Save</button>
            <button className="btn-cancel" onClick={cancelEditAll}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          {/* Name */}
          <div className="info-row">
            {editing === "name" ? (
              <input className="info-input" value={tempValue}
                onChange={e => setTempValue(e.target.value)}
                onKeyDown={handleKey} onBlur={confirmEdit} autoFocus />
            ) : (
              <p>{user.name}</p>
            )}
            <img src={EditIcon} alt="Edit" className="edit-icon" onClick={() => startEdit("name")} />
          </div>

          {/* Role */}
          <div className="info-row">
            {editing === "role" ? (
              <input className="info-input" value={tempValue}
                onChange={e => setTempValue(e.target.value)}
                onKeyDown={handleKey} onBlur={confirmEdit} autoFocus />
            ) : (
              <p>{user.role}</p>
            )}
            <img src={EditIcon} alt="Edit" className="edit-icon" onClick={() => startEdit("role")} />
          </div>

          {/* Description */}
          <div className="info-row">
            {editing === "description" ? (
              <textarea className="info-input" value={tempValue}
                onChange={e => setTempValue(e.target.value)}
                onKeyDown={handleKey} onBlur={confirmEdit} autoFocus />
            ) : (
              <p>{user.description}</p>
            )}
            <img src={EditIcon} alt="Edit" className="edit-icon" onClick={() => startEdit("description")} />
          </div>
        </>
      )}

    </div>
  )
}

export default UserInfo