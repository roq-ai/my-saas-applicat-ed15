import * as yup from 'yup';
import { accountManagerValidationSchema } from 'validationSchema/account-managers';
import { guestValidationSchema } from 'validationSchema/guests';
import { keywordValidationSchema } from 'validationSchema/keywords';

export const sellerValidationSchema = yup.object().shape({
  description: yup.string(),
  image: yup.string(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  account_manager: yup.array().of(accountManagerValidationSchema),
  guest: yup.array().of(guestValidationSchema),
  keyword: yup.array().of(keywordValidationSchema),
});
