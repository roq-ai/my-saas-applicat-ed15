import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getKeywordById, updateKeywordById } from 'apiSdk/keywords';
import { Error } from 'components/error';
import { keywordValidationSchema } from 'validationSchema/keywords';
import { KeywordInterface } from 'interfaces/keyword';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { SellerInterface } from 'interfaces/seller';
import { getSellers } from 'apiSdk/sellers';

function KeywordEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<KeywordInterface>(
    () => (id ? `/keywords/${id}` : null),
    () => getKeywordById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: KeywordInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateKeywordById(id, values);
      mutate(updated);
      resetForm();
      router.push('/keywords');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<KeywordInterface>({
    initialValues: data,
    validationSchema: keywordValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Keyword
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="keyword" mb="4" isInvalid={!!formik.errors?.keyword}>
              <FormLabel>Keyword</FormLabel>
              <Input type="text" name="keyword" value={formik.values?.keyword} onChange={formik.handleChange} />
              {formik.errors.keyword && <FormErrorMessage>{formik.errors?.keyword}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<SellerInterface>
              formik={formik}
              name={'seller_id'}
              label={'Select Seller'}
              placeholder={'Select Seller'}
              fetcher={getSellers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'keyword',
  operation: AccessOperationEnum.UPDATE,
})(KeywordEditPage);
