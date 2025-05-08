"use client";
import CreateTicketBase from "./base/create";

type CreateTicketProps = { projectId: number };

const CreateTicket: React.FC<CreateTicketProps> = ({ projectId }) => {
  return <CreateTicketBase projectId={projectId} />;
};

export default CreateTicket;
