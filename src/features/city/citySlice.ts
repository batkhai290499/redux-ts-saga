import { RootState } from './../../app/store';
import { ListResponse } from './../../models/common';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City } from 'models';

export interface CityState {
   loading: boolean;
   list: City[];
}

const initialState: CityState = {
   loading: false,
   list: [],
};

const citySlice = createSlice({
   name: 'city',
   initialState,
   reducers: {
      fetchCityList(state) {
         state.loading = true;
      },
      fetchCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
         state.list = action.payload.data;
         state.loading = false;
      },

      fetchCityListFailed(state) {
         state.loading = false;
      },
   },
});

//Actions
export const cityActions = citySlice.actions;

//Selectors
export const selectCityList = (state: RootState) => state.city.list;
export const selectCityMap = createSelector(selectCityList, (cityList) =>
   cityList.reduce((map: { [key: string]: City }, city,e,x) => {
      map[city.code] = city;
      return map;
   }, {})
);
//Reducer
const cityReducer = citySlice.reducer;
export default cityReducer;
