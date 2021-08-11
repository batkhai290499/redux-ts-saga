import { ListResponse } from './../../models/common';
import { cityActions } from './citySlice';
import { call, put, takeLatest } from 'redux-saga/effects';
import cityApi from 'api/cityApi';
import { City } from 'models';

function* fetchCityList() {
   try {
      const reponse: ListResponse<City> = yield call(cityApi.getAll);
      yield put(cityActions.fetchCityListSuccess(reponse));
   } catch (error) {
      yield put(cityActions.fetchCityListFailed());
   }
}

export default function* citySaga() {
   yield takeLatest(cityActions.fetchCityList.type, fetchCityList);
}
