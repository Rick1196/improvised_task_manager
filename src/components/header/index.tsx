"use client"
import React, { useState } from 'react';
import { Burger, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './index.module.css';
import Link from 'next/link';

const links = [
  { link: '/', label: 'All Projects' },

];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <p>An Improvised  JIRA</p>
        <Group gap={5}>
          {items}
        </Group>

      </Container>
    </header>
  );
}
