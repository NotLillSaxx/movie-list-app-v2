import React,  { useRef, useEffect } from 'react'

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}


// custome hook that's ignore the first render 
export function CustomedUseEffect(fn, inputs) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) { 
      return fn();
    }
    didMountRef.current = true;
  }, inputs);
}
