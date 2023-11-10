import React, { useEffect, useState } from "react";

export default function useLocalstorage(key, initialValue = null) {
  const [value, setValue] = useState(() => {
    const localstorageValue = JSON.parse(localStorage.getItem(key));
    if (localstorageValue === null) {
      return initialValue;
    } else {
      return localstorageValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
