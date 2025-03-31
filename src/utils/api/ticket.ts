import axios from "axios";
import { apiURL } from "../constant";
import { TicketI } from "@/components/forms/ticket.form";


const ticketAPI = {
  all: async ({ projectId }: { projectId: number }) => {
    const dataP = await fetch(`${apiURL}/api/tickets/${projectId}`, {
      method: "GET",
    });
    const data = await dataP.json();
    return data;
  },
  create: async ({ ticket, projectId }: { ticket: TicketI, projectId: number }) => axios.post(`${apiURL}/api/tickets/`, {
    body: { ticket, projectId }
  })
}

export default ticketAPI;
