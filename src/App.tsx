import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './features/auth/pages/LoginPage';
import { AdminLayout } from './components/Layout';
import { NotFound, PrivateRoute } from './components/Common';

function App() {
   return (
      <Switch>
         <Route path='/login'>
            <LoginPage />
         </Route>
         <PrivateRoute path='/admin'>
            <AdminLayout />
         </PrivateRoute>
         <Route path='/notfound'>
            <NotFound />
         </Route>
      </Switch>
   );
}

export default App;
