// import { ProfileInterface } from "@/components/dashboard/profile/UpdateProfileModal";
import { supabase } from "../supabase";
import { setCookie } from "cookies-next";

export async function updateUser(data: any) {
  const { data: User, error: ProfileError } = await supabase.auth.updateUser({
    data: {
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      appKey: data.appKey,
      role: data.role,
      location: data.location,
      birthdate: data.birthdate,
    },
  });

  if (ProfileError) {
    return { status: 404, message: ProfileError.message };
  } else {
    setCookie("user", User.user);
    return { status: 200, message: "User Profile" };
  }
}
