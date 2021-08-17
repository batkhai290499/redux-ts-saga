import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface SelectOption {
   label?: string;
   value: number | string;
}
export interface SelectFieldProps {
   name: string;
   control: Control<any>;
   label?: string;
   disabled?: boolean;
   options: SelectOption[];
}

export function SelectField({ name, control, label, disabled, options }: SelectFieldProps) {
   const {
      field: { value, onChange, onBlur, ref },
      fieldState: { invalid, error },
   } = useController({
      name,
      control,
   });
   return (
      <FormControl
         variant='outlined'
         margin='normal'
         size='small'
         fullWidth
         disabled={disabled}
         error={invalid}
      >
         <InputLabel id={`${name}_label`}>{label}</InputLabel>
         <Select
            labelId={`${name}_label`}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            label={label}
         >
            <MenuItem value=''>
               <em>All</em>
            </MenuItem>
            {options.map((option) => (
               <MenuItem key={option.value} value={option.value}>
                  {option.label}
               </MenuItem>
            ))}
         </Select>
      </FormControl>
   );
}
