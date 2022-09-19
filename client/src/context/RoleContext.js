import React from 'react';
import { createContext, useState } from "react";

const RoleContext = createContext(null);

export const RoleContextProvider = ({ mRole, tpRole, dRole, cRole, children }) => {

    const [roles, setRoles] = useState({
        manufacturer : mRole,
        thirdparty : tpRole,
        delivery : dRole,
        customer : cRole
    });

  return (
    <RoleContext.Provider value={{ roles, setRoles }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => React.useContext(RoleContext);
