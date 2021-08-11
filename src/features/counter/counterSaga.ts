import { takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { incrementBySaga } from './counterSlice';

function* handleIncrementSaga(action: PayloadAction<number>) {
}
export default function* counterSaga() {
   yield takeLatest(incrementBySaga.toString(), handleIncrementSaga);
}
