import authSaga from '../features/auth/authSaga';
import counterSaga from '../features/counter/counterSaga';
import { all } from 'redux-saga/effects';
import dashboardSaga from '../features/dashboard/dashboardSaga';
import studentSaga from '../features/student/studentSaga';

export default function* rootSaga() {
   yield all([counterSaga(), authSaga(), dashboardSaga(), studentSaga()]);
}
