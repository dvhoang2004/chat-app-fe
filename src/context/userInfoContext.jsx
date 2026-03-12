import { createContext, useContext, useState } from "react"

const UserInfoContext = createContext(null)

const DEFAULT_USER = {
  name: "Hoang Doan",
  role: "Unknown",
  description: "No description yet.",
  avatar: null,   // base64 or null
}

const loadUser = () => {
  try {
    const saved = localStorage.getItem("nexlab_user")
    return saved ? JSON.parse(saved) : DEFAULT_USER
  } catch {
    return DEFAULT_USER
  }
}

const saveUser = (user) => {
  localStorage.setItem("nexlab_user", JSON.stringify(user))
}

export function UserInfoProvider({ children }) {
  const [user, setUser] = useState(loadUser)

  const updateUser = (fields) => {
    const updated = { ...user, ...fields }
    setUser(updated)
    saveUser(updated)
  }

  return (
    <UserInfoContext.Provider value={{ user, updateUser }}>
      {children}
    </UserInfoContext.Provider>
  )
}

export function useUserInfo() {
  return useContext(UserInfoContext)
}