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
import { getGuestById, updateGuestById } from 'apiSdk/guests';
import { Error } from 'components/error';
import { guestValidationSchema } from 'validationSchema/guests';
import { GuestInterface } from 'interfaces/guest';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { SellerInterface } from 'interfaces/seller';
import { getUsers } from 'apiSdk/users';
import { getSellers } from 'apiSdk/sellers';

function GuestEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<GuestInterface>(
    () => (id ? `/guests/${id}` : null),
    () => getGuestById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: GuestInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateGuestById(id, values);
      mutate(updated);
      resetForm();
      router.push('/guests');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<GuestInterface>({
    initialValues: data,
    validationSchema: guestValidationSchema,
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
            Edit Guest
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
            <FormControl id="access_status" mb="4" isInvalid={!!formik.errors?.access_status}>
              <FormLabel>Access Status</FormLabel>
              <Input
                type="text"
                name="access_status"
                value={formik.values?.access_status}
                onChange={formik.handleChange}
              />
              {formik.errors.access_status && <FormErrorMessage>{formik.errors?.access_status}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
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
  entity: 'guest',
  operation: AccessOperationEnum.UPDATE,
})(GuestEditPage);
