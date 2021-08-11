import {
   Box,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useState } from 'react';
import { captializeString, getMarkColor } from 'utils';
import { City, Student } from '../../../models';

export interface StudentTableProps {
   studentList: Student[];
   cityMap: {
      [key: string]: City;
   };
   onEdit?: (student: Student) => void;
   onRemove?: (student: Student) => void;
}
const useStyles = makeStyles((theme) => ({
   table: {},
   edit: {
      marginRight: theme.spacing(1),
   },
}));

export default function StudentTable({
   studentList,
   onEdit,
   cityMap,
   onRemove,
}: StudentTableProps) {
   const classes = useStyles();
   const [open, setOpen] = useState(false);
   const [selectedStudent, setSelectedStudent] = useState<Student>();

   const handleClose = () => {
      setOpen(false);
   };

   const handeRemoveClick = (student: Student) => {
      setSelectedStudent(student);
      setOpen(true);
   };

   return (
      <>
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
                        <TableCell>{captializeString(student.gender)}</TableCell>
                        <TableCell>
                           <Box color={getMarkColor(student.mark)} fontWeight='bold'>
                              {student.mark}
                           </Box>
                        </TableCell>
                        <TableCell>{cityMap[student.city]?.name}</TableCell>
                        <TableCell align='left'>
                           <Button
                              size='small'
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
                              onClick={() => handeRemoveClick(student)}
                           >
                              Remove
                           </Button>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>

         {/* remove */}
         <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
         >
            <DialogTitle id='alert-dialog-title'>Remove a student?</DialogTitle>
            <DialogContent>
               <DialogContentText id='alert-dialog-description'>
                  Are you sure to remove student named <b>{selectedStudent?.name}</b> .<br />
                  This action can not be undo.
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose} color='primary' variant='outlined'>
                  Disagree
               </Button>
               <Button
                  onClick={() => {
                     onRemove?.(selectedStudent as Student);
                     setOpen(false);
                  }}
                  color='secondary'
                  variant='contained'
                  autoFocus
               >
                  Agree
               </Button>
            </DialogActions>
         </Dialog>
      </>
   );
}
