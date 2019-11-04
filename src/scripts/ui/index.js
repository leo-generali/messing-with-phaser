import { h } from "preact";
import { useContext } from "preact/hooks";
import { Store, StoreProvider } from "./store";

export const UI = () => {
  const { state } = useContext(Store);
  return <div className="ui">Lives: {state.lives}</div>;
};

export { StoreProvider };
