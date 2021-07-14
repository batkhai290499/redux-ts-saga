import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
   decrement,
   increment,
   incrementByAmount,
   incrementAsync,
   incrementIfOdd,
   selectCount,
   incrementBySaga,
} from './counterSlice';

export function Counter() {
   const count = useAppSelector(selectCount);
   const dispatch = useAppDispatch();
   const [incrementAmount, setIncrementAmount] = useState('2');

   const incrementValue = Number(incrementAmount) || 0;
   const minus = (a: number, b: number) => a - b;
   let num = [1, '2', 3];

   num.push(2);
   console.log(num);
   
   useEffect(() => {
      console.log('1');

      return console.log('2');
   });
   return (
      <div>
         123
      </div>
   );
}
