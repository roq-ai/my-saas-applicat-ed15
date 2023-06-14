import * as yup from 'yup';

export const guestValidationSchema = yup.object().shape({
  access_status: yup.string().required(),
  user_id: yup.string().nullable().required(),
  seller_id: yup.string().nullable().required(),
});
