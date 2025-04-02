import { projectAPI } from "@/utils/api";
import { ProjectsGrid } from "../components/projects-grid";
import styles from "./page.module.css";

export const preload = () => {
  void projectAPI.all();
};

export default async function Home() {
  const projects = await projectAPI.all();
  console.log("debug", projects)
  return (
    <main className={styles.main}>
      <ProjectsGrid projects={projects.projects} />
    </main>
  );
}
