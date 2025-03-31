"use client"
import TicketForm, { TicketI } from "@/components/forms/ticket.form"
import { ticketAPI } from "@/utils/api"

type CreateTicketProps = { projectId: number }

const CreateTicket: React.FC<CreateTicketProps> = ({ projectId }) => {
  const onSubmit = (ticket: TicketI) => {
    try {
      ticketAPI.create({ ticket, projectId })
    } catch (error) {
      console.error(error);
    }
  }
  return <TicketForm onSubmit={onSubmit} actionText="Save" />
}

export default CreateTicket
