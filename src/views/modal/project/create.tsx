"use client";
import CreateProject from "@/views/project/create";
import { Modal } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function CreateProjectModal() {
  const router = useRouter();
  return (
    <Modal opened onClose={() => router.back()}>
      <CreateProject />
    </Modal>
  );
}
