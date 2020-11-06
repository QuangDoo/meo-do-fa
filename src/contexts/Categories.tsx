import { useQuery } from '@apollo/client';
import React, { Dispatch, useContext } from 'react';
import { createContext, useReducer } from 'react';

import { GET_CATEGORIES } from '../graphql/category/category.query';

type Action = {
  type: 'CATEGORYTLIST_REQUEST' | 'CATEGORYLIST_SUCCESS' | 'CATEGORYLIST_FAIL';
  data: any;
  error: any;
};

type State = {
  categories: string[];
  loading: boolean;
  error: null;
};

type Props = {
  children: React.ReactNode;
};
const initialState: State = {
  categories: [],
  loading: false,
  error: null
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'CATEGORYTLIST_REQUEST':
      return {
        ...state,
        loading: true
      };

    case 'CATEGORYLIST_SUCCESS':
      return {
        ...state,
        loginIsOpen: false,
        categories: action.data
      };

    case 'CATEGORYLIST_FAIL':
      return {
        ...state,
        loading: false,
        error: action.error
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
