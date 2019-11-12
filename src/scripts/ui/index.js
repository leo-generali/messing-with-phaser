import { h } from "preact";
import { useContext } from "preact/hooks";

import { Store, StoreProvider } from "./store";
import Lives from "./Lives";

export const UI = () => {
  const { state } = useContext(Store);

  return (
    <div className="ui">
      <Lives lives={state.lives} />
    </div>
  );
};

export { StoreProvider };
