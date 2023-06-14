import * as yup from 'yup';

export const keywordValidationSchema = yup.object().shape({
  keyword: yup.string().required(),
  seller_id: yup.string().nullable().required(),
});
