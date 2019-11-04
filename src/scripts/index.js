import { h, render } from "preact";
import { UI, StoreProvider } from "./ui";
import { Game } from "./game";
import "../assets/styles/index.scss";

const App = () => {
  return (
    <StoreProvider>
      <UI />
      <Game />
    </StoreProvider>
  );
};

render(<App />, document.body);
