"use server";
import { registerUser } from "@/config/user.config";

export const addUser = async (data: any) => {
  const response = await registerUser(data);
  return response;
};
