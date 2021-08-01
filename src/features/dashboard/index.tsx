import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { PeopleAlt } from '@material-ui/icons';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import StatisticItem from './components/StatisticItem';
import StudentRankingList from './components/StudentRankingList';
import { Widget } from './components/Widget';
import {
   dashboardActions,
   selectDashboardLoading,
   selectDashboardStatistics,
   selectHighestStudentList,
   selectLowestStudentList,
   selectRankingByCityList,
} from './dashboardSlice';

const useStyles = makeStyles((theme) => ({
   root: {
      position: 'relative',
      paddingTop: theme.spacing(1),
   },
   loading: {
      position: 'absolute',
      top: theme.spacing(-1),
      width: '100%',
      // alignItems: 'center'
   },
}));

export default function Dashboard() {
   const dispatch = useAppDispatch();
   const loading = useAppSelector(selectDashboardLoading);
   const statistics = useAppSelector(selectDashboardStatistics);
   const highestStudentList = useAppSelector(selectHighestStudentList);
   const lowestStudentList = useAppSelector(selectLowestStudentList);
   const rankingByCityList = useAppSelector(selectRankingByCityList);

   console.log(rankingByCityList);
   const classes = useStyles();

   React.useEffect(() => {
      dispatch(dashboardActions.fetchData());
   }, [dispatch]);
   return (
      <Box className={classes.root}>
         {/* loading */}
         {loading && <LinearProgress className={classes.loading} />}
         {/* Statistic Section */}

         <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
               <StatisticItem
                  icon={<PeopleAlt fontSize='large' color='primary' />}
                  label='male'
                  value={statistics.maleCount}
               />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
               <StatisticItem
                  icon={<PeopleAlt fontSize='large' color='primary' />}
                  label='female'
                  value={statistics.femaleCount}
               />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
               <StatisticItem
                  icon={<PeopleAlt fontSize='large' color='primary' />}
                  label='Mark > 7'
                  value={statistics.highMarkCount}
               />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
               <StatisticItem
                  icon={<PeopleAlt fontSize='large' color='primary' />}
                  label='Mark < 5'
                  value={statistics.lowMarkCount}
               />
            </Grid>
         </Grid>

         <Box mt={5}>
            <Typography variant='h4'>All Student</Typography>
            <Box mt={2}>
               <Grid container spacing={3}>
                  <Grid item xs={12} md={6} lg={3}>
                     <Widget title='Student Highest'>
                        <StudentRankingList studentList={highestStudentList}></StudentRankingList>
                     </Widget>
                  </Grid>

                  <Grid item xs={12} md={6} lg={3}>
                     <Widget title='Student Lowest'>
                        <StudentRankingList studentList={lowestStudentList}></StudentRankingList>
                     </Widget>
                  </Grid>
               </Grid>
            </Box>
         </Box>

         <Box mt={5}>
            <Typography variant='h4'>Ranking By City</Typography>
            <Box mt={2}>
               <Grid container spacing={3}>
                  {rankingByCityList.map((item) => {
                     return (
                        <Grid item xs={12} md={6} lg={3} key={item.cityId}>
                           <Widget title={item.cityId}>
                              <StudentRankingList
                                 studentList={item.rankingList}
                              ></StudentRankingList>
                           </Widget>
                        </Grid>
                     );
                  })}
               </Grid>
            </Box>
         </Box>
      </Box>
   );
}
