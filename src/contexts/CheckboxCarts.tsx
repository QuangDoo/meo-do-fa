import React, { createContext, useContext, useState } from 'react';

type ContextValue = {
  checkboxCarts: any[];
  setCheckboxCarts: React.Dispatch<React.SetStateAction<any[]>>;
};

const CheckboxCartsContext = createContext<ContextValue>(undefined);

const useCheckboxCarts = () => useContext(CheckboxCartsContext);

const CheckboxCartsProvider = (props) => {
  const [checkboxCarts, setCheckboxCarts] = useState([]);

  return (
    <CheckboxCartsContext.Provider value={{ checkboxCarts, setCheckboxCarts }}>
      {props.children}
    </CheckboxCartsContext.Provider>
  );
};

export { useCheckboxCarts, CheckboxCartsProvider };
