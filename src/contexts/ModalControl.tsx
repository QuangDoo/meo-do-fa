import React, { Dispatch, useContext } from 'react';
import { createContext, useReducer } from 'react';

type Action = {
  type: 'OPEN_LOGIN_MODAL' | 'CLOSE_LOGIN_MODAL' | 'OPEN_REGISTER_MODAL' | 'CLOSE_REGISTER_MODAL';
};

type State = {
  loginIsOpen: boolean;
  registerIsOpen: boolean;
};

type Props = {
  children: React.ReactNode;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'OPEN_LOGIN_MODAL':
      return {
        loginIsOpen: true,
        registerIsOpen: false
      };

    case 'CLOSE_LOGIN_MODAL':
      return {
        ...state,
        loginIsOpen: false
      };

    case 'OPEN_REGISTER_MODAL':
      return {
        loginIsOpen: false,
        registerIsOpen: true
      };

    case 'CLOSE_REGISTER_MODAL':
      return {
        ...state,
        registerIsOpen: false
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const initialState: State = {
  loginIsOpen: false,
  registerIsOpen: false
};

const StateContext = createContext<State>(null);
StateContext.displayName = 'ModalControlStateContext';

const DispatchContext = createContext<Dispatch<Action>>(null);
DispatchContext.displayName = 'ModalControlDispatchContext';

const ModalControlProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  );
};

const useModalControlState = () => useContext(StateContext);

const useModalControlDispatch = () => useContext(DispatchContext);

export { ModalControlProvider, useModalControlDispatch, useModalControlState };
