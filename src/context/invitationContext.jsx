import { createContext, useContext, useState } from "react"
import { invitations as defaultInvitations } from "../data/invitation"

const InvitationContext = createContext(null)

const loadInvitations = () => {
  try {
    const saved = localStorage.getItem("nexlab_invitations")
    return saved ? JSON.parse(saved) : defaultInvitations
  } catch {
    return defaultInvitations
  }
}

const saveInvitations = (data) => {
  localStorage.setItem("nexlab_invitations", JSON.stringify(data))
}

export function InvitationProvider({ children }) {
  const [invitations, setInvitations] = useState(loadInvitations)

  const updateStatus = (id, status) => {
    const updated = invitations.map(inv =>
      inv.id === id ? { ...inv, status } : inv
    )
    setInvitations(updated)
    saveInvitations(updated)
  }

  return (
    <InvitationContext.Provider value={{ invitations, updateStatus }}>
      {children}
    </InvitationContext.Provider>
  )
}

export function useInvitation() {
  return useContext(InvitationContext)
}