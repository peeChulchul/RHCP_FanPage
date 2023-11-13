import { createContext, useState, useContext, useEffect } from "react";
import useLocalstorage from "utils/hooks/useLocalstorage";
import mockData from "data/mockdata.json";

const memberContext = createContext({});

export const useMemberContext = () => useContext(memberContext);

export const MemberContextProvider = ({ children }) => {
  const [localstorageLetters, setLocalstorageLetters] = useLocalstorage("letters", mockData);
  const [contextValue, setContextValue] = useState({ localstorageLetters, setLocalstorageLetters });

  useEffect(() => {
    setContextValue((prev) => ({ ...prev, localstorageLetters }));
  }, [localstorageLetters]);

  return <memberContext.Provider value={contextValue}>{children}</memberContext.Provider>;
};
