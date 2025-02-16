import { RegisterUser } from "@/types/user";
import { supabase } from "../supabase";
import { Dayjs } from "dayjs";

export async function registerUser(
  data: RegisterUser,
  date: Dayjs | null,
  privileges : string
) {
  const { data: User, error: SignUpError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        appKey: data.appKey,
        role: data.role,
        birthdate: date,
        privileges: privileges,
      },
    },
  });

  if (SignUpError) {
    return { status: 404, message: SignUpError.message };
  } else {
    return { status: 200, message: "User is Register" };
  }
}
