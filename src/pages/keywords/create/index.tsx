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
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createKeyword } from 'apiSdk/keywords';
import { Error } from 'components/error';
import { keywordValidationSchema } from 'validationSchema/keywords';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { SellerInterface } from 'interfaces/seller';
import { getSellers } from 'apiSdk/sellers';
import { KeywordInterface } from 'interfaces/keyword';

function KeywordCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: KeywordInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createKeyword(values);
      resetForm();
      router.push('/keywords');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<KeywordInterface>({
    initialValues: {
      keyword: '',
      seller_id: (router.query.seller_id as string) ?? null,
    },
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
            Create Keyword
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
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
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'keyword',
  operation: AccessOperationEnum.CREATE,
})(KeywordCreatePage);
