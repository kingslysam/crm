import {
  AssignedData,
  Comment,
  CommentResquest,
  QueryInterface,
  ResolvedData,
  UpdateStatus,
} from "@/types/clientQuery";
import axios, { AxiosError } from "axios";

export async function createClientQuery(data: QueryInterface) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/query/create`,
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

export async function addACommentToQuery(
  queryID: number,
  data: CommentResquest
) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/query/comment/${queryID}`,
    data
  );
  if (response.status === 201) {
    return { status: 200, data: response.data };
  } else {
    return { status: 404, data: response.data };
  }
}

export async function getAllClientQueries() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/query/all`
    );

    if (response.status === 200) {
      return { status: 200, data: response.data };
    } else {
      return { status: 404, data: response.data };
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      if (status === 404) {
        return { status: 404, data: "Not Found" };
      } else {
        return { status, data: error.response.data };
      }
    } else {
      return { status: 500, data: "Network or unexpected error" };
    }
  }
}

export async function getAllClientQueriesWithResolved(resolved: boolean) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/query/all/${resolved}`
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

export async function getAllClientQueriesAssignedTo(assignedTo: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/query/all/assigned/${assignedTo}`
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

export async function getASingleClientQueries(queryID: number) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/query/single/${queryID}`
  );
  if (response.status === 200) {
    return response.data;
  } else {
    return { status: 404, data: response.data };
  }
}

export async function assignClientQuery(queryID: number, data: AssignedData) {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/query/update/${queryID}`,
    {
      data,
    }
  );
  return response.data;
}

export async function resolvedClientQuery(queryID: number, data: ResolvedData) {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/query/update/${queryID}`,
    {
      data,
    }
  );
  if (response.status === 200) {
    return { status: 200, data: response.data };
  } else {
    return { status: 400, data: response.data };
  }
}

export async function updateClientQueryStatus(
  queryID: number,
  data: UpdateStatus
) {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/query/update/${queryID}`,
    {
      data,
    }
  );
  return response.data;
}
