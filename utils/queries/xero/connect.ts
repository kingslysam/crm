import axios from "axios";

export async function connectToXero() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/xero/connect`
  );
  if (response.data.statusCode === 200) {
    return response.data;
  }
    return { status: 400, error: response.data };
}
