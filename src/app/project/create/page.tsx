"use client"
import ProjectForm, { ProjectI } from "@/components/forms/project.form";
import { projectAPI } from "@/utils/api";
import Link from "next/link";

export default function Page() {
  const onSubmit = async (project: ProjectI) => {
    try {
      projectAPI.create({ title: project.title, description: project.description });
    }
    catch (error) {
      console.error(error);
    }
  }
  return <div>
    <Link href="/">Back</Link>
    <ProjectForm onSubmit={onSubmit} actionText="Save" />
  </div>
}
