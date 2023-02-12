import React from "react";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const userId = "63701cc1f03239b7f700000e";
  const [mode, setMode] = React.useState("dark");

  return (
    <AppContext.Provider
      value={{
        mode,
        setMode,
        userId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return React.useContext(AppContext);
};
