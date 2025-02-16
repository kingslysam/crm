import * as yup from "yup";

export const salesPersonSchema = yup.object({
  fullName: yup.string().required("Full Name is Required"),
  emailAddress: yup
    .string()
    .email("Invalid email")
    .required("Email is Required"),
  phoneNumber: yup
    .string()
    .required()
    .matches(/^(?:\+255|0)[67]\d{9}$/, {
      excludeEmptyString: true,
      message: "Phone number must be between 7 to 15 digits",
    }),
  nida: yup.string().required("NIDA is Required").length(20),
  target: yup.number().required("Target is Required"),
  address: yup.string().required("Address is Required"),
});
