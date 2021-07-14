import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { authActions } from '../../features/auth/authSlice';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      root: {
         flexGrow: 1,
      },
      title: {
         flexGrow: 1,
      },
   })
);

export default function Header() {
   const classes = useStyles();
   const dispatch = useAppDispatch();
   
   const handleLogout = () => {
       dispatch(authActions.logout())
   }
   return (
      <div className={classes.root}>
         <AppBar position='static'>
            <Toolbar>
               <Typography variant='h6' className={classes.title}>
                  Student Management
               </Typography>
               <Button color='inherit' onClick={handleLogout}>Logout</Button>
            </Toolbar>
         </AppBar>
      </div>
   );
}
