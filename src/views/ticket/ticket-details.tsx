
"use client"
import TicketForm, { TicketI } from "@/components/forms/ticket.form";

type TicketDatailsProps = {
  ticketData: TicketI;
}
const TicketDatails: React.FC<TicketDatailsProps> = ({ ticketData }) => {
  return <TicketForm initialValue={ticketData} readonly={true} onSubmit={(data) => console.log(data)} />
}

export default TicketDatails;
