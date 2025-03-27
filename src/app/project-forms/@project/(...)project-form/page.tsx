"use client"
import ProjectForm from "@/components/project-form";
import { Modal } from "@mantine/core";
import { useRouter } from "next/router";

export default function Page(){
    const router = useRouter()
    return <Modal opened={true} title={"Create new project"} onClose={() => router.back()}><ProjectForm/></Modal>
}