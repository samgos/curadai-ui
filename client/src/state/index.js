import React, { createContext, useReducer } from 'react';

const initialState = { web3: false, network: false }
const store = createContext(initialState)
const { Provider } = store

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'WEB3':
        return { ...state, ...action.payload }
      case 'EXCHANGE':
      return { ...state, ...action.payload }
      default:
        return state
    };
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }
