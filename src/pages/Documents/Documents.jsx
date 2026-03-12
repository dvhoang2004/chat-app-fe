import { useRef } from 'react'
import './Documents.css'
import UploadFileIcon from '../../assets/attachment.svg'
import { useDocuments } from '../../context/documentContext'

const Documents = () => {
  const { documents, addDocument, deleteDocument } = useDocuments()
  const fileInputRef = useRef(null)

  const handleUpload = (e) => {
    const files = Array.from(e.target.files)
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = () => {
        addDocument({
          id: Date.now() + Math.random(),
          name: file.name,
          type: file.type,
          size: file.size,
          base64: reader.result,
          uploadedAt: new Date().toLocaleDateString('en-US', {
            day: '2-digit', month: 'short', year: 'numeric'
          })
        })
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ""
  }

  return (
    <div className="documents-page">
      <h2>Documents</h2>

      {/* Upload area */}
      <div className="upload-area" onClick={() => fileInputRef.current?.click()}>
        <img src={UploadFileIcon} alt="Upload File" />
        <p>Click to upload files</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={handleUpload}
        />
      </div>

      {/* File list */}
      <div className="documents-list">
        {documents.map(doc => (
          <div key={doc.id} className="document-item">
            <span className="doc-name">{doc.name}</span>
            <button className="doc-delete-btn" onClick={() => deleteDocument(doc.id)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Documents