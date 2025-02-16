import { LoginUser } from "@/types/user";
import { supabase } from "../supabase";
import { setCookie } from "cookies-next";

export async function loginUser(data: LoginUser) {
  const { data: User, error: SignInError } =
    await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
  if (SignInError) {
    return { status: 404, message: SignInError.message };
  } else {
    setCookie("session", User.session);
    setCookie("user", User.user);
    return { status: 200, message: "User is Login" };
  }
}

export async function loginSalesPerson(pinCode: string){
  
}
