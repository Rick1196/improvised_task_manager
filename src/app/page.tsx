import { getProjects } from "@/utils/api";
import { ProjectsGrid } from "../components/projects-grid";
import styles from "./page.module.css";
export const preload = () => {
  void getProjects();
};
export default async function Home() {
  const projects = await getProjects();
  console.log("debug", projects);
  return (
    <main className={styles.main}>
      <ProjectsGrid projects={projects.projects} />
    </main>
  );
}
