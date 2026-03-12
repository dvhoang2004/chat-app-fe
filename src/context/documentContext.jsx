import { createContext, useContext, useState } from "react"

const DocumentContext = createContext(null)

const loadDocuments = () => {
  try {
    const saved = localStorage.getItem("nexlab_documents")
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const saveDocuments = (data) => {
  localStorage.setItem("nexlab_documents", JSON.stringify(data))
}

export function DocumentProvider({ children }) {
  const [documents, setDocuments] = useState(loadDocuments)

  const addDocument = (doc) => {
    const updated = [...documents, doc]
    setDocuments(updated)
    saveDocuments(updated)
  }

  const deleteDocument = (id) => {
    const updated = documents.filter(d => d.id !== id)
    setDocuments(updated)
    saveDocuments(updated)
  }

  return (
    <DocumentContext.Provider value={{ documents, addDocument, deleteDocument }}>
      {children}
    </DocumentContext.Provider>
  )
}

export function useDocuments() {
  return useContext(DocumentContext)
}