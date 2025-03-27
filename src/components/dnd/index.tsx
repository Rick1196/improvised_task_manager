"use client";
import React, { useState } from "react";
import { TicketI } from "../forms/ticket.form";
import DNDGrid from "./dnd-grid";

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
  console.log("debug", columns)
  return columns;
};

const DnD: React.FC<{
  tickets: TicketI[];
  statuses: StatusI[];
}> = ({ tickets, statuses }) => {
  const [state, _setState] = useState(
    orderTicketsByStatus({ tickets, statuses }),
  );
  return state ? (
    <DNDGrid onMove={(ticket, target) => console.log(ticket, target)} columns={state} />
  ) : null;
};

export default DnD;
