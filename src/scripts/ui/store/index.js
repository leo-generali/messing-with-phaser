import { h, createContext } from "preact";
import { useReducer } from "preact/hooks";
import { reducer, initialState } from "./reducer";

export const Store = createContext();

export const StoreProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
