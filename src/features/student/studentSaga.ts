import { Student } from './../../models/student';
import { ListResponse } from './../../models/common';
import { call, takeLatest, put, debounce } from 'redux-saga/effects';
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

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
   yield put(studentAction.setFilter(action.payload));
}

function* deleteStudent(action: PayloadAction<string>) {
   try {
      yield call(studentApi.remove, action.payload);
   } catch (error) {
      console.log(error);
   }
}

export default function* studentSaga() {
   yield takeLatest(studentAction.fetchStudentList, fetchStudentList);
   yield debounce(500, studentAction.setFilterWithDebounce.type, handleSearchDebounce);
   yield takeLatest(studentAction.deleteStudent, deleteStudent);
}
