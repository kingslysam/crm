import { toast } from "react-hot-toast";

export const toastSuccessful = (text: string) => {
    toast.success(text, {
      position: "top-right",
      duration: 1500
    });
}

export const toastFailed = (text: string) => {
    toast.error(text, {
      position: "top-right",
      duration: 1500
    });
}