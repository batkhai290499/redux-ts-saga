import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { StudentForm } from '../components/StudentForm';

export function AddEditPage() {
   const { studentId } = useParams<{ studentId: string }>();
   const isEdit = Boolean(studentId);

   const [student, setStudent] = useState<Student>();

   useEffect(() => {
      if (!studentId) {
         return;
      }
      //IIFE
      (async () => {
         try {
            const data: Student = await studentApi.getById(studentId);
            setStudent(data);
         } catch (error) {
            console.log('fail to get by Id ', error);
         }
      })();
   }, [studentId]);
   console.log(studentId);
   
   const initialValues: Student = {
      name: '',
      age: 0,
      mark: 0,
      gender: 'male ',
      city: '',
      ...student,
   } as Student;

   const handleStudentFormSubmit = (formValues: Student) => {
      if (isEdit) {
         
      } else {
         
      }
   };
   return (
      <Box>
         <Link to='/admin/students'>
            <Typography variant='caption' style={{ display: 'flex', alignItems: 'center' }}>
               <ChevronLeft /> Back
            </Typography>
         </Link>

         <Typography variant='h4'>{isEdit ? 'Edit Student' : 'Add New Student'}</Typography>

         {(!isEdit || Boolean(student)) && (
            <Box mt={3}>
               <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
            </Box>
         )}
      </Box>
   );
}
