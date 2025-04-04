import axios from "axios";
import { apiURL } from "../constant";
import { TicketI } from "@/components/forms/ticket.form";


const ticketAPI = {
  create: async ({ ticket, projectId }: { ticket: TicketI, projectId: number }) => axios.post(`${apiURL}/api/tickets/`, {
    body: { ticket, projectId }
  }),
  update: async ({ ticket, ticketId }: { ticket: TicketI, ticketId: number }) => axios.put(`${apiURL}/api/tickets/${ticketId}`, {
    body: { ticket }
  })
}

export default ticketAPI;
