import { useEffect, useState } from 'react';

const useAutoCounter = (value: number, duration: number) => {
  const [count, setCount] = useState(0);
  let rafref;
  useEffect(() => {
    const start = new Date().getTime();
    const inc = () => {
      const cur = new Date().getTime();
      const delta = (cur - start) / duration;
      if (delta > 1) {
        return setCount(value);
      } else {
        setCount(delta * value);
      }
      rafref = requestAnimationFrame(inc);
    }

    inc();

    return () => {
      cancelAnimationFrame(rafref);
    }
  }, [value, duration]);

  return count;
}

export default useAutoCounter;
