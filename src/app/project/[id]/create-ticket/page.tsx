import CreateTicket from "@/views/ticket/create-ticket";
import Link from "next/link";

export default async function Page({
  params
}: {
  params: Promise<{ id: number }>;

}) {

  const id = (await params).id;

  return <div>
    <Link href={`/project/${id}`}>Back</Link>
    <CreateTicket projectId={id} />
  </div>
}
