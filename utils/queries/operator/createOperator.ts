import axios from "axios";
import { OperatorInterface } from "./../../../types/operator";

export async function createAnOperator(operatorDetail: OperatorInterface) {
  try {
    const operator = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/operators/create`,
      data: operatorDetail,
    });
    if (operator.status === 201) {
      return { status: 200, data: operator.data };
    } else {
      return { status: 400, error: operator.data };
    }
  } catch (error) {
    return { status: 400, error };
  }
}
