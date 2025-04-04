"use client"
import { Card } from "@mantine/core";
import CreateProjectBase from "./base/create";
import classes from './styles.module.css';
const CreateProject: React.FC = () => {
  return <div className={classes.container}>
    <Card withBorder radius="md" padding="lg">
      <h1>Create project</h1>
      <CreateProjectBase />
    </Card>
  </div>;
};

export default CreateProject;
