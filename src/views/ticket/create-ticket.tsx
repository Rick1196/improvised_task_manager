"use client"
import TicketForm, { TicketI } from "@/components/forms/ticket.form"
import { ticketAPI } from "@/utils/api"
import { notifications } from "@mantine/notifications"

type CreateTicketProps = { projectId: number }

const CreateTicket: React.FC<CreateTicketProps> = ({ projectId }) => {
  const onSubmit = (ticket: TicketI) => {
    try {
      ticketAPI.create({ ticket, projectId })
      notifications.cleanQueue();
      notifications.show({
        title: `Ticket "${ticket.title}" created.`,
        message: `Check your statuses columns for more details.`,
        color: "blue",
        position: "top-right"
      })
    } catch (error) {
      notifications.cleanQueue();
      notifications.show({
        title: `Unable to create "${ticket.title}" ticket`,
        message: "Try again later",
        color: "red",
        "position": "top-right"
      })
      console.error(error);
    }
  }
  return <TicketForm onSubmit={onSubmit} actionText="Save" />
}

export default CreateTicket
