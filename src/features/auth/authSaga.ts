import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { call, fork, put, take } from 'redux-saga/effects';
import { LoginPayload, authActions } from './authSlice';

function* handdleLogin(paylpad: LoginPayload) {
   try {
      console.log('login', paylpad);
      localStorage.setItem('access_token', 'fake_token')
      yield put(
         authActions.loginSuccess({
            id: 1,
            name: 'Fuck',
         })
      );
      yield put(push('/admin/dashboard'))
   } catch (error) {
      yield put(
         authActions.loginFail(error.message)
      );
   }
}

function* handdleLogout() {
   console.log('logout');

   localStorage.removeItem('access_token');
   yield put(push('/login'))
   //redirect ...
}

function* watchLoginFlow() {
   while (true) {
      const isLoggedIn = Boolean(localStorage.getItem('access_token'));
      if (!isLoggedIn) {
         const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
         yield fork(handdleLogin, action.payload);
      }

      yield take(authActions.logout.type);
      yield call(handdleLogout);
   }
}

export default function* authSaga() {
   yield fork(watchLoginFlow);
}
