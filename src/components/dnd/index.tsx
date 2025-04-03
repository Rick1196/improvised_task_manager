"use client";
import React, { useState } from "react";
import { TicketI } from "../forms/ticket.form";
import DNDGrid from "./dnd-grid";
import { ticketAPI } from "@/utils/api";
import { notifications } from "@mantine/notifications";
import { usePathname, useRouter } from "next/navigation";

export type ColumnI = {
  items: TicketI[];
  title: string;
  id: number;
};

export type StatusI = {
  name: string;
  id: number;
};
const orderTicketsByStatus = ({
  tickets,
  statuses,
}: {
  tickets: TicketI[];
  statuses: StatusI[];
}) => {
  const columns: ColumnI[] = [];
  for (const status of statuses) {
    columns.push({
      title: status.name,
      items: tickets.filter((ticket) => ticket.status_id === status.id),
      id: status.id
    });
  }
  return columns;
};

const DnD: React.FC<{
  tickets: TicketI[];
  statuses: StatusI[];
}> = ({ tickets, statuses }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [state, _setState] = useState(
    orderTicketsByStatus({ tickets, statuses }),
  );

  const onMove = async ({ ticket, target }: { ticket: TicketI, target: ColumnI }) => {
    console.log("debug on move", ticket, target);
    try {
      const updatedTicket = Object.assign({}, ticket);
      updatedTicket.status_id = target.id;
      await ticketAPI.update({ ticket: updatedTicket, ticketId: updatedTicket.id });
    } catch (error) {
      notifications.cleanQueue();
      notifications.show({
        color: "red",
        position: "top-right",
        title: `Unable to move "${ticket.title}"`,
        message: `to "${target.title}" status.`,
      })
      console.error(error);
    }
  }

  const openTicketDetails = (ticket: TicketI) => {
    router.push(`${pathname}/${ticket.id}`);
  }

  return state ? (
    <DNDGrid onMove={(ticket, target) => onMove({ ticket, target })} columns={state} onTicketClick={(ticket) => openTicketDetails(ticket)} />
  ) : null;
};

export default DnD;
