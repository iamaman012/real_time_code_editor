import { useState, useContext, createContext } from "react";

const CodeContext = createContext();

const CodeProvider = ({ children }) => {
  const [value, setValue] = useState();
  return (
    <CodeContext.Provider value={[value, setValue]}>
      {children}
    </CodeContext.Provider>
  );
};

const useCode = () => useContext(CodeContext);
export { useCode, CodeProvider };
