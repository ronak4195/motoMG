import React, { createContext, useContext } from 'react';

const AppContext = createContext();

const baseURL = "https://motomg.onrender.com";

export const AppProvider = ({ children }) => {
  const contextValue = {
    baseURL
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
