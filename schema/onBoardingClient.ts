import * as yup from "yup";

export const onBoardingClientSchema = yup.object({
  tin: yup
    .string()
    .matches(/^\d+$/, "TIN must contain only numbers")
    .required("TIN is Required")
    .length(9, "TIN is required to be 9 digits"),
  documentLink: yup
    .string()
    .url("Invalid URL")
    .required("Document Link is Required"),
  vrn: yup
    .string()
    .nullable()
    .notRequired()
    .matches(/^\d{8}[A-Z]$/, {
      message: "VRN must contain 8 digits followed by one letter",
      excludeEmptyString: true,
    }),
  serialNumber: yup
    .string()
    .nullable()
    .notRequired()
    .matches(/^\d{2}TZ\d{6}$/, {
      message:
        "Serial number must be in the format ##TZ###### and 10 character ",
      excludeEmptyString: true,
    }),
  amountPaid: yup
    .number()
    .nullable()
    .typeError("Amount paid must be a number")
    .optional(),
  certificatePassword: yup
    .string()
    .nullable()
    .optional()
    .min(6, "Password should be at least 6 characters long"),
  clientSimplifyService: yup.string().required("Service is required"),
  clientName: yup.string().required("Full name is required"),
  clientCompanyName: yup.string().required("Company name is required"),
  clientEmail: yup.string().nullable().email("Invalid email format").optional(),
  clientAddress: yup.string().nullable().optional(),
  clientRegion: yup.string().required("Region is required"),
  clientPhoneNumber: yup
    .string()
    .nullable()
    .matches(/^\+?[0-9]{7,15}$/, "Phone number is not valid")
    .optional(),
  clientEmailForLogin: yup
    .string()
    .nullable()
    .email("Invalid email format")
    .optional(),
  clientEmailForComms: yup
    .string()
    .nullable()
    .email("Invalid email format")
    .optional(),
  clientBusinessCategory: yup.string().nullable().optional(),
  clientDirectorName: yup.string().nullable().optional(),
  clientIsVip: yup.string().required("VIP status is required"),
});
