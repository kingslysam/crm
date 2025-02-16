import axios from "axios";

export async function updateCommissionPayment(
  commissionID: string,
  onBoardingClientID: string[],
  paymentMethod: string,
  paymentFigure: number
) {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/commissions/update/payment`,
      {
        commissionID,
        onBoardingClientID,
        paymentMethod,
        paymentFigure,
      }
    );
    if (response.data.statusCode === 200) {
      return { status: 200, data: response.data };
    } else {
      return { status: 400, error: response.data };
    }
  } catch (error) {
    return { status: 400, error };
  }
}
