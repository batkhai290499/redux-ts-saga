import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { Student } from '../../../models';

export interface StudentTableProps {
   studentList: Student[];
   onEdit?: (student: Student) => void;
   onRemove?: (student: Student) => void;
}
const useStyles = makeStyles((theme) => ({
   table: {},
   edit: {
      marginRight: theme.spacing(1),
   },
}));

export default function StudentTable({ studentList, onEdit, onRemove }: StudentTableProps) {
   const classes = useStyles();

   return (
      <TableContainer component={Paper}>
         <Table className={classes.table} size='small' aria-label='simple table'>
            <TableHead>
               <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Mark</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Actions</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {studentList.map((student, idx) => (
                  <TableRow key={student.id}>
                     <TableCell>{student.id}</TableCell>
                     <TableCell>{student.name}</TableCell>
                     <TableCell>{student.gender}</TableCell>
                     <TableCell>{student.mark}</TableCell>
                     <TableCell>{student.city}</TableCell>
                     <TableCell align='left'>
                        <Button
                           className={classes.edit}
                           variant='contained'
                           color='primary'
                           onClick={() => {
                              if (onEdit) {
                                 onEdit(student);
                              }
                           }}
                        >
                           Edit
                        </Button>
                        <Button
                           variant='outlined'
                           color='secondary'
                           onClick={() => {
                              if (onRemove) {
                                 onRemove(student);
                              }
                           }}
                        >
                           Remove
                        </Button>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
}
