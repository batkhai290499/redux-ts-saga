import {
   Box,
   Button,
   FormControl,
   Grid,
   InputLabel,
   MenuItem,
   OutlinedInput,
   Select,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { City, ListParams } from 'models';
import * as React from 'react';

export interface StudentFilterProps {
   filter: ListParams;
   cityList: City[];
   onChange?: (newFilter: ListParams) => void;
   onSearchChange?: (newFilter: ListParams) => void;
}
export function StudentFilter(props: StudentFilterProps) {
   const searchRef = React.useRef<HTMLInputElement>();

   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!props.onSearchChange) {
         return;
      }
      const newFilter: ListParams = {
         ...props.filter,
         name_like: e.target.value,
         _page: 1,
      };
      props.onSearchChange(newFilter);
   };
   const handleCityChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
      if (!props.onChange) {
         return;
      }
      const newFilter: ListParams = {
         ...props.filter,
         city: e.target.value || undefined,
         _page: 1,
      };
      props.onChange(newFilter);
   };

   const handleSortChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
      if (!props.onChange) {
         return;
      }
      const value = e.target.value;
      const [_sort, _order] = (value as string).split('.');
      const newFilter: ListParams = {
         ...props.filter,
         _sort: _sort || undefined,
         _order: (_order as 'asc' | 'desc') || undefined,
      };
      props.onChange(newFilter);
   };
   const handleClearFilter = () => {
      if (!props.onChange) {
         return;
      }

      const newFilter: ListParams = {
         ...props.filter,
         _sort: undefined,
         _order: undefined,
         _page: 1,
         city: undefined,
         name_like: '',
      };
      props.onChange(newFilter);
      if (searchRef.current) searchRef.current.value = '';
   };
   return (
      <Box>
         <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
               <FormControl fullWidth variant='outlined' size='small'>
                  <InputLabel htmlFor='searchByName'>Search By Name</InputLabel>
                  <OutlinedInput
                     id='searchByName'
                     label='Search By Name'
                     endAdornment={<Search />}
                     onChange={handleSearchChange}
                     inputRef={searchRef}
                  />
               </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
               <FormControl variant='outlined' size='small' fullWidth>
                  <InputLabel id='filterByCity'>Filter By City</InputLabel>
                  <Select
                     labelId='filterByCity'
                     value={props.filter.city || ''}
                     onChange={handleCityChange}
                     label='Filter By City'
                  >
                     <MenuItem value=''>
                        <em>All</em>
                     </MenuItem>
                     {props.cityList.map((city) => (
                        <MenuItem key={city.code} value={city.code}>
                           {city.name}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={2}>
               <FormControl variant='outlined' size='small' fullWidth>
                  <InputLabel id='sort'>Sort</InputLabel>
                  <Select
                     labelId='sort'
                     value={
                        props.filter._sort ? `${props.filter._sort}.${props.filter._order}` : ''
                     }
                     onChange={handleSortChange}
                     label='Sort'
                  >
                     <MenuItem value=''>
                        <em>No sort</em>
                     </MenuItem>
                     <MenuItem value='name.asc'>Name ASC</MenuItem>
                     <MenuItem value='name.desc'>Name DESC</MenuItem>
                     <MenuItem value='mark.asc'>Mark ASC</MenuItem>
                     <MenuItem value='mark.desc'>Mark DESC</MenuItem>
                  </Select>
               </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={1}>
               <Button variant='outlined' color='primary' onClick={handleClearFilter} fullWidth>
                  {' '}
               </Button>
            </Grid>
         </Grid>
      </Box>
   );
}
