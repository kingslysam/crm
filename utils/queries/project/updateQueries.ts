import { ProjectInterface, UpdateProjectInterface } from "@/types/project";
import axios from "axios";

export async function updateProject(projectID: string, data: UpdateProjectInterface) {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/project/update/${projectID}`,
        data
      );
      if (response.status === 200) {
        return { status: 200, data: response.data };
      } else {
        return { status: 404, data: response.data };
      }
    } catch (error) {
      return { status: 404, data: error };
    }
  }