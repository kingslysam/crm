import * as yup from "yup";

export const commissionSchema = yup.object({
  percentage: yup
    .string()
    .matches(/^\d{9}$/, {
      message: "Percentage must be from 0 to 100",
      excludeEmptyString: true,
    })
    .nullable()
    .notRequired()
});
