import './InviteCard.css'
import { useInvitation } from '../../context/invitationContext'

const InviteCard = ({ id, from, date, message, status }) => {
  const { updateStatus } = useInvitation()

  return (
    <div className={`invitation ${status}`}>
      <h3>{from}</h3>
      <p className="invite-date">{date}</p>
      <p className="invite-message">{message}</p>
      {/* pending invite can be accepted or rejected, while accepted/rejected invites show their status and cannot be modified. */}
      {status === "pending" && (
        <div className="invite-actions">
          <button
            className="btn-accept"
            onClick={() => updateStatus(id, "accepted")}
          >
            Accept
          </button>
          <button
            className="btn-reject"
            onClick={() => updateStatus(id, "rejected")}
          >
            Reject
          </button>
        </div>
      )}

      {status !== "pending" && (
        <div className="invite-status-label">
          {status === "accepted" ? "✓ Accepted" : "✕ Rejected"}
        </div>
      )}
    </div>
  )
}

export default InviteCard