import {
  Anchor,
  Card,
  Group,
  SimpleGrid,
  Text,
  UnstyledButton,
} from "@mantine/core";
import classes from "./index.module.css";
import Link from "next/link";
import { ProjectI } from "../forms/project.form";

export function ProjectsGrid({ projects }: { projects: ProjectI[] }) {
  const items = projects.map((item) => (
    <UnstyledButton key={item.title} className={classes.item}>
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
      <Link href={`/project/${item.id}`}>Check project</Link>
    </UnstyledButton>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Group justify="space-between">
        <Text className={classes.title}>Your Projects</Text>
        <Link href="/project/create" style={{ lineHeight: 1 }}>
          Create new project
        </Link>
      </Group>
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
    </Card>
  );
}
