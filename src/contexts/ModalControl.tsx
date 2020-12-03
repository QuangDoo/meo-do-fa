import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

type Modal = 'LOGIN' | 'REGISTER' | 'RESET_PASSWORD';

type State = {
  loginIsOpen: boolean;
  registerIsOpen: boolean;
  resetPassIsOpen: boolean;
};

type Dispatch = {
  openModal: (modal: Modal) => void;
  closeModal: () => void;
};

type Props = {
  children: React.ReactNode;
};

const StateContext = createContext<State>(null);
StateContext.displayName = 'ModalControlStateContext';

const DispatchContext = createContext<Dispatch>(null);
DispatchContext.displayName = 'ModalControlDispatchContext';

const initialState: State = {
  loginIsOpen: false,
  registerIsOpen: false,
  resetPassIsOpen: false
};

const ModalControlProvider = ({ children }: Props): JSX.Element => {
  const [state, setState] = useState<State>(initialState);

  const openModal = useCallback((modal: Modal) => {
    const newState = { ...initialState };

    switch (modal) {
      case 'LOGIN':
        newState.loginIsOpen = true;
        break;
      case 'REGISTER':
        newState.registerIsOpen = true;
        break;
      case 'RESET_PASSWORD':
        newState.resetPassIsOpen = true;
        break;
      default:
        throw new Error(`Unknown modal type: ${modal}`);
    }

    setState(newState);
  }, []);

  const closeModal = useCallback(() => {
    setState(initialState);
  }, []);

  const dispatch = useMemo(() => ({ openModal, closeModal }), []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  );
};

const useModalControlState = () => useContext(StateContext);

const useModalControlDispatch = () => useContext(DispatchContext);

export { ModalControlProvider, useModalControlDispatch, useModalControlState };
