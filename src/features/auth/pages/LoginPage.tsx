import * as React from 'react';
import { makeStyles, Paper, Typography, Box, Button } from '@material-ui/core';
import { useAppDispatch } from '../../../app/hooks';
import { authActions } from '../authSlice';

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
   },
   box: {
      padding: theme.spacing(2),
   },
}));
export default function LoginPage() {
   const classes = useStyles();
   const dispatch = useAppDispatch();
   const handleLoginClick = () => {
      dispatch(
         authActions.login({
            username: '',
            password: '',
         })
      );
   };
   return (
      <div className={classes.root}>
         <Paper elevation={1} className={classes.box}>
            <Typography variant='h5' component='h1'>
               Student Manage
            </Typography>
            <Box mt={4}>
               <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  onClick={() => handleLoginClick()}
               >
                  Fale Login
               </Button>
            </Box>
         </Paper>
      </div>
   );
}
