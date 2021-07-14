import { Box, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../../features/dashboard';
import StudentFeature from '../../features/student';
import { Sidebar } from '../Common';
import Header from '../Common/Header';

interface AdminLayoutProps {}

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr',
      gridTemplateColumns: '250px 1fr',
      gridTemplateAreas: `"header header" "sidebar main"`,
      minHeight: '100vh',
   },
   header: {
      gridArea: 'header',
   },
   sidebar: {
      gridArea: 'sidebar',
      borderRight: `5px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.paper,
   },
   main: {
      gridArea: 'main',
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2,3)
   },
}));
export function AdminLayout(props: AdminLayoutProps) {
   const classes = useStyles();
   return (
      <div>
         <Box className={classes.root}>
            <Box className={classes.header}>
               <Header />
            </Box>
            <Box className={classes.sidebar}>
               <Sidebar />
            </Box>
            <Box className={classes.main}>
              <Switch>
                <Route path="/admin/dashboard">
                  <Dashboard/>
                </Route>

                <Route path="/admin/students">
                  <StudentFeature/>
                </Route>
              </Switch>
            </Box>
         </Box>
      </div>
   );
}
