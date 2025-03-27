"use client"
import ProjectForm, { ProjectI } from "@/components/forms/project.form";
import Link from "next/link";

export default function Page() {
    const onSubmit = (project: ProjectI) => {
        console.log('debug', project)
    }
    return <div>
        <Link href="/">Back</Link>
        <ProjectForm onSubmit={onSubmit} actionText="Save" />
    </div>
}