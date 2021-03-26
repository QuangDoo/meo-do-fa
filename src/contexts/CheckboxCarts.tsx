import React, { createContext, useContext, useState } from 'react';

type ContextValue = {
  checkboxCarts: any[];
  setCheckboxCarts: React.Dispatch<React.SetStateAction<any[]>>;
  isFirst: boolean;
  setIsFirst: React.Dispatch<React.SetStateAction<boolean>>;
};

const CheckboxCartsContext = createContext<ContextValue>(undefined);

const useCheckboxCarts = () => useContext(CheckboxCartsContext);

const CheckboxCartsProvider = (props) => {
  const [checkboxCarts, setCheckboxCarts] = useState([]);
  const [isFirst, setIsFirst] = useState(true);

  return (
    <CheckboxCartsContext.Provider value={{ checkboxCarts, setCheckboxCarts, isFirst, setIsFirst }}>
      {props.children}
    </CheckboxCartsContext.Provider>
  );
};

export { useCheckboxCarts, CheckboxCartsProvider };
