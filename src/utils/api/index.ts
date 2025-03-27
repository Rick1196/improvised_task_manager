const apiURL = "http://localhost:3000";
export const getTickets = async ({ projectId }: { projectId: number }) => {
  const dataP = await fetch(`${apiURL}/api/tickets/${projectId}`, {
    method: "GET",
  });
  const data = await dataP.json();
  return data;
};

export const getStatuses = async ({ projectId }: { projectId: number }) => {
  const dataP = await fetch(`${apiURL}/api/statuses/${projectId}`, {
    method: "GET",
  });
  const data = await dataP.json();
  return data;
};

export const getProjects = async () => {
  const dataP = await fetch(`${apiURL}/api/projects`, { method: "GET" });
  const data = await dataP.json();
  return data;
};
