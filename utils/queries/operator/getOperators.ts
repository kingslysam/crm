import axios from "axios";

export async function getAllOperators() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/operators/all/`
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
