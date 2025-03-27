export default function Layout({
    children,
    project,
  }: {
    children: React.ReactNode
    project: React.ReactNode
  }) {
    return (
      <>
        {children}
        {project}
      </>
    )
  }