"use client";

import LogInForm from "./login-form";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";

const LoginPage = () => {
  const { theme: config, setTheme: setConfig, isRtl } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);

  return (
    <div className="loginwrapper  bg-[#3e84e0]  flex  justify-center items-center">
      <div className="flex flex-col gap-4 justify-center bg-background my-10 p-10 2xl:my-20 m-4 w-fit overflow-hidden xl:w-[calc(100vw-80px)] 2xl:w-[calc(100vw-160px)] 2xl:px-20 2xl:py-12 rounded-3xl">
        <div className="relative rounded-xl">
          <div className="flex items-center w-full justiy-center gap-y-12">
              <div className="w-full  xl:w-[480px] max-w-2xl mx-auto relative z-20">
                <LogInForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
