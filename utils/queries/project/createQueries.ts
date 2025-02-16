import { ProjectComment, ProjectInterface } from "@/types/project";
import axios from "axios";

export async function createProject(data: ProjectInterface) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/project/create`,
      data
    );
    if (response.status === 201) {
      return { status: 200, data: response.data };
    } else {
      return { status: 404, data: response.data };
    }
  } catch (error) {
    return { status: 404, data: error };
  }
}

export async function addACommentToProject(
  projectID: string,
  data: ProjectComment
) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/project/comment/${projectID}`,
    data
  );
  if (response.status === 201) {
    return { status: 200, data: response.data };
  } else {
    return { status: 404, data: response.data };
  }
}
