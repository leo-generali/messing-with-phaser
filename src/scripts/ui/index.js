import { h } from "preact";
import { useContext } from "preact/hooks";
import { Store } from "./store";
import "../../assets/styles/index.scss";

const style = {
  position: "absolute"
};

export const UI = () => {
  const { state, dispatch } = useContext(Store);
  return <div style={style}>Lives: {state.lives}</div>;
};
