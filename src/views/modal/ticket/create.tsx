"use client"
import CreateTicketBase from "@/views/ticket/base/create";
import { Modal } from "@mantine/core";
import { useRouter } from "next/navigation";

type CreateTicketProps = {
    projectId: number;
}

export default function CreateTicketModal({projectId}:CreateTicketProps) {
  const router = useRouter();
  
  return (
    <Modal opened onClose={() => router.back()}>
      <CreateTicketBase projectId={projectId} />
    </Modal>
  );
}
