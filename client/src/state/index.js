import React, { createContext, useReducer } from 'react';

const initialState = { dai: 0.0, cura: 0.0, web3: false, network: false }
const store = createContext(initialState)
const { Provider } = store

const RATE_1 = 1.78
const RATE_2 = 1.75

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'DAI-EX':
        const [ curaRate ] = (parseFloat(action.payload) / RATE_1).toFixed(2)
        const [ daiInput ] = action.payload

        return { ...state, dai: daiInput, cura: curaRate }
      case 'CURA-EX':
        const [ daiRate ] = (parseFloat(action.payload) * RATE_2).toFixed(2)
        const [ curaInput ] = action.payload

        return { ...state, cura: curaInput, dai: daiRate }
      case 'WEB3':
        return { ...state, ...action.payload }
      default:
        return state
    };
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }
