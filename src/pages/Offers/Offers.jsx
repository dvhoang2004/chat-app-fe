import React from 'react'
import './Offers.css'
import InviteCard from '../../components/InviteCard/InviteCard'
import { invitations } from "../../data/invitation"

// This component will display the offers available to the user. 
const Offers = () => {
  return (
    <div>
      <h2>Offers</h2>
      {
        invitations.map((invitation) => <InviteCard key={invitation.id} {...invitation} />)
      }
    </div>
  )
}

export default Offers
