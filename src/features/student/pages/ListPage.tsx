import { Box, Button, makeStyles, Typography, LinearProgress } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import React, { useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { StudentFilter } from '../components/StudentFilters';
import StudentTable from '../components/StudentTable';
import {
   selectStudentFilter,
   selectStudentList,
   selectStudentPagination,
   studentAction,
} from '../studentSlice';
import { selectStudentLoading } from '../studentSlice';

export interface IListPageProps {}

const useStyles = makeStyles((theme) => ({
   root: {},
   titleContainer: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing(4),
   },
   loading: {
      position: 'absolute',
      // top: theme.spacing(-1),
      width: '100%',
      // alignItems: 'center'
   },
}));
export function ListPage(props: IListPageProps) {
   const studentList = useAppSelector(selectStudentList);
   const pagination = useAppSelector(selectStudentPagination);
   const filter = useAppSelector(selectStudentFilter);
   const loading = useAppSelector(selectStudentLoading);
   const cityMap = useAppSelector(selectCityMap);
   const cityList = useAppSelector(selectCityList);
   const dispatch = useAppDispatch();
   const classes = useStyles();

   const match = useRouteMatch();
   const history = useHistory();
   useEffect(() => {
      dispatch(studentAction.fetchStudentList(filter));
   }, [dispatch, filter]);
   const handlePageChange = (e: any, page: number) => {
      dispatch(
         studentAction.setFilter({
            ...filter,
            _page: page,
         })
      );
   };
   const handleSearchChange = (newFilter: ListParams) => {
      dispatch(studentAction.setFilterWithDebounce(newFilter));
   };
   const handleFilterChange = (newFilter: ListParams) => {
      dispatch(studentAction.setFilter(newFilter));
   };
   const handleRemoveStudent = async (student: Student) => {
      try {
         dispatch(studentAction.deleteStudent(student?.id || ''));
      } catch (error) {
         console.log(error);
      }
   };
   const handleEditStudent = async (student: Student) => {
      history.push(`${match.url}/${student.id}`);
   };
   return (
      <Box className={classes.root}>
         <Box className={classes.titleContainer}>
            <Typography variant='h4'>Students</Typography>

            <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
               <Button variant='contained' color='primary'>
                  Add new
               </Button>
            </Link>
         </Box>

         <Box mb={3}>
            <StudentFilter
               filter={filter}
               cityList={cityList}
               onSearchChange={handleSearchChange}
               onChange={handleFilterChange}
            />
         </Box>
         {/* Table Student */}
         {loading && <LinearProgress className={classes.loading} />}
         <StudentTable
            studentList={studentList}
            cityMap={cityMap}
            onEdit={handleEditStudent}
            onRemove={handleRemoveStudent}
         />

         <Box mt={2} display='flex' justifyContent='center'>
            <Pagination
               color='primary'
               count={Math.ceil(pagination._totalRows / pagination._limit)}
               page={pagination._page}
               onChange={handlePageChange}
            />
         </Box>
      </Box>
   );
}
