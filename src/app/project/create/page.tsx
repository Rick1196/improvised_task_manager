"use client"
import ProjectForm, { ProjectI } from "@/components/forms/project.form";
import { projectAPI } from "@/utils/api";
import { notifications } from "@mantine/notifications";
import Link from "next/link";

export default function Page() {
  const onSubmit = async (project: ProjectI) => {
    try {
      projectAPI.create({ title: project.title, description: project.description });
      notifications.cleanQueue();
      notifications.show({
        position: "top-right",
        color: "blue",
        title: `"${project.title}" Added to your dashboard.`,
        message: 'Go to your dashboard to check all projects.',
      })
    }
    catch (error) {
      notifications.show({
        position: "top-right",
        color: "red",
        title: "Error.",
        message: `There was an error trying to create "${project.title}" project.`,
      })
      console.error(error);
    }
  }
  return <div>
    <Link href="/">Back</Link>
    <ProjectForm onSubmit={onSubmit} actionText="Save" />
  </div>
}
