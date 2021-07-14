import { PayloadAction } from '@reduxjs/toolkit';
import { takeEvery, takeLatest } from '@redux-saga/core/effects';
import { increment, incrementBySaga } from './counterSlice';

function* handleIncrementSaga(action: PayloadAction<number>) {
}
export default function* counterSaga() {
   yield takeLatest(incrementBySaga.toString(), handleIncrementSaga);
}
