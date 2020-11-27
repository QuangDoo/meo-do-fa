import React, { createContext, Dispatch, useCallback, useContext, useState } from 'react';

type Action = {
  type:
    | 'OPEN_LOGIN_MODAL'
    | 'CLOSE_LOGIN_MODAL'
    | 'OPEN_REGISTER_MODAL'
    | 'CLOSE_REGISTER_MODAL'
    | 'OPEN_RESSETPASS_MODAL'
    | 'CLOSE_RESSETPASS_MODAL';
};

type State = {
  loginIsOpen: boolean;
  registerIsOpen: boolean;
  ressetPassIsOpen: boolean;
};

type Props = {
  children: React.ReactNode;
};

const initialState: State = {
  loginIsOpen: false,
  registerIsOpen: false,
  ressetPassIsOpen: false
};

const StateContext = createContext<State>(null);
StateContext.displayName = 'ModalControlStateContext';

const DispatchContext = createContext<Dispatch<Action>>(null);
DispatchContext.displayName = 'ModalControlDispatchContext';

const ModalControlProvider = ({ children }: Props): JSX.Element => {
  const [state, setState] = useState<State>(initialState);

  const dispatch = useCallback((action: Action) => {
    setState(() => {
      switch (action.type) {
        case 'OPEN_LOGIN_MODAL':
          return {
            loginIsOpen: true,
            registerIsOpen: false,
            ressetPassIsOpen: false
          };

        case 'CLOSE_LOGIN_MODAL':
          return {
            loginIsOpen: false,
            registerIsOpen: false,
            ressetPassIsOpen: false
          };

        case 'OPEN_REGISTER_MODAL':
          return {
            loginIsOpen: false,
            registerIsOpen: true,
            ressetPassIsOpen: false
          };

        case 'CLOSE_REGISTER_MODAL':
          return {
            loginIsOpen: false,
            registerIsOpen: false,
            ressetPassIsOpen: false
          };
        case 'OPEN_RESSETPASS_MODAL':
          return {
            loginIsOpen: false,
            registerIsOpen: false,
            ressetPassIsOpen: true
          };

        case 'CLOSE_RESSETPASS_MODAL':
          return {
            loginIsOpen: false,
            registerIsOpen: false,
            ressetPassIsOpen: false
          };
        default:
          throw new Error(`Unhandled action type: ${action.type}`);
      }
    });
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  );
};

const useModalControlState = () => useContext(StateContext);

const useModalControlDispatch = () => useContext(DispatchContext);

export { ModalControlProvider, useModalControlDispatch, useModalControlState };
