import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { Category } from 'src/types/Category';

type Action = {
  type: 'CATEGORYLIST_REQUEST' | 'CATEGORYLIST_SUCCESS' | 'CATEGORYLIST_FAIL';
};

type State = {
  categories: Category[];
  loading: boolean;
  error: any;
};

type Props = {
  children: React.ReactNode;
};
const initialState: State = {
  categories: [],
  loading: false,
  error: null
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'CATEGORYLIST_REQUEST':
      return {
        ...state,
        loading: true
      };

    case 'CATEGORYLIST_SUCCESS':
      return {
        ...state,
        loading: false
        // categories: action.data
      };

    case 'CATEGORYLIST_FAIL':
      return {
        ...state,
        loading: false
        // error: action.error
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const StateContext = createContext<State>(null);
StateContext.displayName = 'GetCategoriesStateContext';

const DispatchContext = createContext<Dispatch<Action>>(null);
DispatchContext.displayName = 'GetCategoriesDispatchContext';

const CategoriesProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  );
};

const useCategoriesState = () => useContext(StateContext);

const useCategoriesDispatch = () => useContext(DispatchContext);

export { CategoriesProvider, useCategoriesState, useCategoriesDispatch };
