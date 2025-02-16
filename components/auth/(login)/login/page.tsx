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
      <div className="flex flex-col gap-4 justify-center bg-background my-10 p-10 2xl:my-20 m-4 w-fit overflow-hidden xl:w-[calc(100vw-80px)]   2xl:w-[calc(100vw-160px)]  2xl:px-20 2xl:py-12 rounded-3xl  
      ">
        <div className="relative  rounded-xl">
          <div className="flex flex-col xl:flex-row items-center w-full gap-y-12">
            <div className="basis-full xl:basis-1/2 w-full">
              <div className="w-full  xl:w-[480px]  relative z-20">
                <LogInForm />
              </div>
            </div>
            <div className="basis-full xl:basis-1/2 hidden xl:block relative w-[500px] ">
              <svg
                className="absolute top-0 -right-0 "
                width="1208" height="580" viewBox="0 0 1208 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_f_4801_13605)">
                  <circle cx="604" cy="565" r="404" fill="url(#paint0_radial_4801_13605)" />
                </g>
                <defs>
                  <filter id="filter0_f_4801_13605" x="0" y="-39" width="1208" height="1208" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_4801_13605" />
                  </filter>
                  <radialGradient id="paint0_radial_4801_13605" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(805.322 373.168) rotate(134.675) scale(1098.13)">
                    <stop stop-color="#3e84e0" stop-opacity="0.6" />
                    <stop offset="1" stop-color="#3e84e0" stop-opacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
