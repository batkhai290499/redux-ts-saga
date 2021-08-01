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

export interface StudentRankingListProps {
   studentList: Student[];
}
const useStyles = makeStyles({
   table: {
      minWidth: 250,
   },
});

export default function StudentRankingList({ studentList }: StudentRankingListProps) {
   const classes = useStyles();

   return (
      <TableContainer >
         <Table className={classes.table} size="small" aria-label='simple table'>
            <TableHead>
               <TableRow>
                  <TableCell align='center'>#</TableCell>
                  <TableCell align='left'>Name</TableCell>
                  <TableCell align='right'>Mark</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {studentList.map((row, idx) => (
                  <TableRow key={row.id}>
                     <TableCell align='center'>{idx}</TableCell>
                     <TableCell align='left'>{row.name}</TableCell>
                     <TableCell align='right'>{row.mark}</TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
}
