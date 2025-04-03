"use client"
import CreateTicket from "@/views/ticket/create-ticket";
import { Modal } from "@mantine/core";
import { useRouter } from "next/navigation";

type CreateTicketProps = {
    projectId: number;
}

export default function CreateTicketModal({projectId}:CreateTicketProps) {
  const router = useRouter();
  
  return (
    <Modal opened onClose={() => router.back()}>
      <CreateTicket projectId={projectId} />
    </Modal>
  );
}
