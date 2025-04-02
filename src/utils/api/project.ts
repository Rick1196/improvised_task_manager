import { apiURL } from "../constant";
import axios from "axios";
const projectAPI = {
  getStatuses: async ({ projectId }: { projectId: number }) =>
    axios.get(`${apiURL}/api/statuses/${projectId}`).then(response => response.data),
  all: async () => axios.get(`${apiURL}/api/projects`).then(response => response.data),
  create: ({ title, description }: { title: string, description: string }) => {
    return axios.post(`${apiURL}/api/projects`, {
      body: { title, description }
    });
  },
  allTickets: async ({ projectId }: { projectId: number }) =>
    axios.get(`${apiURL}/api/projects/${projectId}`).then(response => response.data)
}

export default projectAPI;
