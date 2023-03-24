import React, { createContext, useState } from "react";

// context for storing site information and setting site information to context
export const SiteInfoContext = createContext({
  siteInfo: {},
  setSiteInfo: () => null,
});

// A HOC to porovide coontext values
export const SiteInfoProvider = ({ children }) => {
  const [siteInfo, setSiteInfo] = useState({});
  return (
    <SiteInfoContext.Provider value={{ siteInfo, setSiteInfo }}>
      {children}
    </SiteInfoContext.Provider>
  );
};
