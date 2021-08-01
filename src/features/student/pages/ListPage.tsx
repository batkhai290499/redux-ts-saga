import React, { useEffect } from 'react';
import { Box, makeStyles, Typography, Button } from '@material-ui/core';
import { useRouteMatch } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { selectStudentList, studentAction } from '../studentSlice';
import { useSelector } from 'react-redux';
import StudentTable from '../components/StudentTable';

export interface IListPageProps {}

const useStyles = makeStyles((theme) => ({
   root: {},
   titleContainer: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing(4)
   },
}));
export function ListPage(props: IListPageProps) {
   const studentList = useSelector(selectStudentList);
   const dispatch = useAppDispatch();
   const classes = useStyles();
    const onEdit = () => {
        console.log("edit");
        
    }
   useEffect(() => {
      dispatch(
         studentAction.fetchStudentList({
            _page: 1,
            _limit: 15,
         })
      );
   });
   return (
      <Box className={classes.root}>
         <Box className={classes.titleContainer}>
            <Typography variant='h4'>Students</Typography>
            <Button variant='contained' color='primary'>
               Add new
            </Button>
         </Box>
         {/* Table Student */}
         <StudentTable studentList={studentList}  onEdit={onEdit} onRemove={onEdit}/>
      </Box>
   );
}
