import * as yup from "yup";
import { z } from "zod";


export const newClientSchema = yup.object({
  fullName: yup.string().required("Full Name is Required"),
  companyName: yup.string().required("Company Name is Required"),
  emailUsedForComms: yup
    .string()
    .email("Invalid email")
    .required("E-mail is Required"),
  phoneNumber: yup
    .string()
    .required("Phone Number is Required")
    .min(10, "Phone number is required to be more 10 digits")
    .max(13, "Phone number is required to be less 13 digits"),
  address: yup.string().required("Address is Required"),
});

export const clientNoteSchema = z.object({
  clientNoteID: z.number(),
  clientID: z.string(),
  note: z.string(),
  createdBy: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const clientResponseSchema = z.object({
  onBoardingClientID: z.string().optional(),
  clientID: z.string(),
  dateOnBoarded: z.string(),
  emailUsedForComms: z.string().nullable(),
  emailUsedForLogin: z.string().nullable(),
  fullName: z.string(),
  companyName: z.string(),
  address: z.string().nullable(),
  paymentStatus: z.string(),
  businessCategory: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  region: z.string().nullable(),
  tin: z.string().nullable(),
  vrn: z.string().nullable(),
  certificatePassword: z.string().nullable(),
  serialNumber: z.string().nullable(),
  documentLink: z.string().nullable(),
  amountPaid: z.number().nullable(),
  service: z.string(),
  platform: z.string(),
  isActivated: z.boolean(),
  isBlocked: z.boolean(),
  isVip: z.string(),
  ClientNote: z.array(clientNoteSchema),
});