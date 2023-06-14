import * as yup from 'yup';

export const accountManagerValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  seller_id: yup.string().nullable().required(),
});
