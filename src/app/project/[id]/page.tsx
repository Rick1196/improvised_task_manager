import DnD from "@/components/dnd";
import { getStatuses, getTickets } from "@/utils/api";
import Link from "next/link";

export const preload = (id: number) => {
  void getTickets({ projectId: id });
  void getStatuses({ projectId: id });
};

export default async function Project({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;
  const tickets = await getTickets({ projectId: id });
  const statuses = await getStatuses({ projectId: id });
  console.log("debug", params, tickets, statuses);
  return (
    <div>
      <Link href="/">Back</Link>
      <DnD tickets={tickets.tickets} statuses={statuses.statuses} />
    </div>
  );
}
