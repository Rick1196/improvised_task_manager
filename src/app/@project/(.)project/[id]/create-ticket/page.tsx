import CreateTicketModal from "@/views/modal/ticket/create";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;
  return <CreateTicketModal projectId={id} />;
}
