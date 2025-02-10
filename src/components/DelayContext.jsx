import { createContext, useContext } from "react";

const DelayContext = createContext();

export const DelayProvider = ({ children }) => {
  const simulateDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <DelayContext.Provider value={{ simulateDelay }}>
      {children}
    </DelayContext.Provider>
  );
};

export const useDelay = () => useContext(DelayContext);
