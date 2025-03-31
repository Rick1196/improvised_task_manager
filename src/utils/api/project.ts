import { apiURL } from "../constant";
import axios from "axios";
const projectAPI = {
  getStatuses: async ({ projectId }: { projectId: number }) => {
    const dataP = await fetch(`${apiURL}/api/statuses/${projectId}`, {
      method: "GET",
    });
    const data = await dataP.json();
    return data;
  },
  all: async () => {
    const dataP = await fetch(`${apiURL}/api/projects`, { method: "GET" });
    const data = await dataP.json();
    return data;
  },
  create: ({ title, description }: { title: string, description: string }) => {
    return axios.post(`${apiURL}/api/projects`, {
      body: { title, description }
    });
  }
}

export default projectAPI;
