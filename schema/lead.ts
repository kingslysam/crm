import * as yup from "yup";

export const leadSchema = yup.object({
  tin: yup
    .string()
    .matches(/^\d{9}$/, {
      message: "TIN must contain only numbers",
      excludeEmptyString: true,
    })
    .nullable()
    .notRequired(),
  fullName: yup.string().required("Full Name is Required"),
  companyName: yup.string().nullable(),
  emailAddress: yup.string().email("Invalid email").nullable(),
  phoneNumber: yup
    .string()
    .notRequired()
    .nullable()
    .matches(/^(?:\+255|0)[67][0-9]{8}$/, {
      message: "Phone number is required to be more 10 digits",
      excludeEmptyString: true,
    }),
  address: yup.string().nullable(),
});

export const consentLetterLeadSchema = yup.object({
  tin: yup
    .string()
    .matches(/^\d+$/, "TIN must contain only numbers")
    .required("TIN is Required")
    .length(9, "TIN is required to be 9 digits"),
  documentLink: yup
    .string()
    .url("Invalid URL")
    .required("Document Link is Required")
    .nullable(),
});

export const EFDMSSchema = yup.object({
  invoiceNumber: yup.string().required("Invoice Number is Required").nullable(),
  receiptVerificationCode: yup
    .string()
    .required("Receipt Verification Code is Required")
    .nullable(),
  amountPaid: yup.number().nullable().notRequired(),
  serialNumber: yup
    .string()
    .nullable()
    .notRequired()
    .matches(/^\d{2}TZ\d{6}$/, {
      message:
        "Serial number must be in the format ##TZ###### and 10 character ",
      excludeEmptyString: true,
    }),
  certificatePassword: yup.string().nullable().notRequired(),
});
