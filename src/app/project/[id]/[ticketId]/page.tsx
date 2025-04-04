import { ticketAPI } from "@/utils/api";
import TicketDatails from "@/views/ticket/ticket-details";
import Link from "next/link";

export function preload(id: number) {
  void ticketAPI.get({ ticketId: id });
}

export default async function Page({
  params
}: {
  params: Promise<{ id: number, ticketId: number }>;

}) {
  const routeParams = await params;
  const projectId = routeParams.id;
  const ticketId = routeParams.ticketId;
  const ticket = await ticketAPI.get({ ticketId });

  return <div>
    <Link href={`/project/${projectId}`}>Back</Link>
    <TicketDatails ticketData={{ ...ticket, acceptanceCriteria: ticket.acceptance_criteria, storyPoints: ticket.story_points }} />
  </div>
}
