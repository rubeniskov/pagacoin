import { useEffect, useState } from 'react';

const useAutoCounter = (start: number, end: number, duration: number) => {
  const [count, setCount] = useState(0);
  let rafref;
  useEffect(() => {
    const startd = new Date().getTime();
    const inc = () => {
      const curd = new Date().getTime();
      const delta = (curd - startd) / duration;
      if (delta > 1) {
        return setCount(end);
      } else {
        setCount(start + delta * (end - start));
      }
      rafref = requestAnimationFrame(inc);
    }

    inc();

    return () => {
      cancelAnimationFrame(rafref);
    }
  }, [end, duration]);

  return count;
}

export default useAutoCounter;
