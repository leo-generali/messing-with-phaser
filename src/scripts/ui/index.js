import { h } from "preact";
import { useContext } from "preact/hooks";
import { Store, StoreProvider } from "./store";

const style = {
  position: "absolute"
};

export const UI = () => {
  const { state, dispatch } = useContext(Store);
  return <div style={style}>Lives: {state.lives}</div>;
};

export { StoreProvider };
