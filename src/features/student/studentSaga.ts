import { Student } from './../../models/student';
import { ListResponse } from './../../models/common';
import { call, takeLatest, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { studentAction } from './studentSlice';
import { ListParams } from '../../models';
import studentApi from '../../api/studentApi';

function* fetchStudentList(action: PayloadAction<ListParams>) {
   try {
      const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
      yield put(studentAction.fetchStudentListSuccess(response));
   } catch (error) {
      yield put(studentAction.fetchStudentListFailed(error.message));
   }
}

export default function* studentSaga() {
   yield takeLatest(studentAction.fetchStudentList, fetchStudentList);
}
