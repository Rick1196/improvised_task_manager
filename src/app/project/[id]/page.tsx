import { projectAPI } from "@/utils/api";
import TicketsGrid from "@/views/project/tickets-grid";
import Link from "next/link";

export const preload = (id: number) => {
  void projectAPI.allTickets({ projectId: id });
  void projectAPI.getStatuses({ projectId: id });
};

export default async function Project({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;
  const tickets = await projectAPI.allTickets({ projectId: id });
  const statuses = await projectAPI.getStatuses({ projectId: id });
  return (
    <div>
      <Link href="/">Back</Link>
      <Link href={`/project/${id}/create-ticket`}>Create Ticket</Link>
      <TicketsGrid tickets={tickets.tickets} statuses={statuses.statuses} />
    </div>
  );
}
