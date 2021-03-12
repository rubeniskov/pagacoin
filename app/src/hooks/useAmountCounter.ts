import { useRef, useEffect } from 'react';
import useAutoCounter from './useAutoCounter';

const nwc = (x: number | string) => x
  .toString()
  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const useCreditCardAmount = (amount: number, duration: number = 600) => {
  const initialValueRef = useRef(0);

  const count = useAutoCounter(initialValueRef.current, amount, duration);
  const scount = count.toFixed(2).toString();
  const value = scount.split('.');
  const pad = scount.length * 12 + 20;
  
  useEffect(() => {
    initialValueRef.current = amount;
  }, [amount]);

  return { value: [nwc(value[0]), value[1]], pad, };
}

export default useCreditCardAmount;
