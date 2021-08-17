import { Box, Button, CircularProgress } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { InputField, RadioGroupField, SelectField } from 'components/FormFields';
import { selectCityOptions } from 'features/city/citySlice';
import { Student } from 'models';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
export interface StudentFormProps {
   initialValues?: Student;
   onSubmit?: (formValues: Student) => void;
}

const schema = yup.object().shape({
   name: yup
      .string()
      .required('enter name')
      .test('two-words', 'plese enter at least two work', (value) => {
         if (!value) return true;
         const parts = value?.split(' ') || [];
         return parts.filter((x) => Boolean(x)).length >= 2;
      }),
   age: yup.number().positive('positive').integer('interger').required('age').typeError('invalid'),
   mark: yup.number().positive('positive').min(0, 'min').max(10, ',max').required('mark'),
   gender: yup.string().oneOf(['male', 'female'], ' select male or female').required('gender'),
   city: yup.string().required('select city'),
});
export function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
   const cityOption = useAppSelector(selectCityOptions);

   const {
      control,
      handleSubmit,
      formState: { isSubmitting },
   } = useForm<Student>({
      defaultValues: initialValues,
      resolver: yupResolver(schema),
   });

   const handleFormSubmit = (formValues: Student) => {
      console.log(formValues);
      try {
      } catch (error) {
         console.log('can not add/ update', error);
      }
   };
   return (
      <Box maxWidth={350}>
         <form onSubmit={handleSubmit(handleFormSubmit)}>
            <InputField name='name' control={control} label='Full Name' />
            <InputField name='gender' control={control} label='Gender' />
            <RadioGroupField
               name='gender'
               control={control}
               label='Gender'
               options={[
                  { label: 'male', value: 'male' },
                  { label: 'female', value: 'female' },
               ]}
            />
            <InputField name='age' control={control} label='Age' type='number' />
            <InputField name='mark' control={control} label='Mark' type='number' />
            {/* <InputField  /> */}
            <SelectField name='city' control={control} label='City' options={cityOption} />
            <Box mt={3}>
               <Button variant='contained' color='primary' type='submit' disabled={isSubmitting}>
                  {isSubmitting && <CircularProgress size={16} color='primary' />} Save
               </Button>
            </Box>
         </form>
      </Box>
   );
}
