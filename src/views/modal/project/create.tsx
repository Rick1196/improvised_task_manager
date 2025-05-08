"use client";
import CreateProjectBase from "@/views/project/base/create";
import { Modal } from "@mantine/core";
import { useRouter } from "next/navigation";
import classes from "../modal.module.css"; 
export default function CreateProjectModal() {
  const router = useRouter();
  return (
    <Modal opened onClose={() => router.back()}>
      <div className={classes.modalContainer}>
        <h1>Create Project</h1>
        <CreateProjectBase />
      </div>
    </Modal>
  );
}
