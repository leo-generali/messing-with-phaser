import { h, render, Fragment } from "preact";
import { Game } from "./UI/Game";
import { UI } from "./UI/UI";

const App = () => {
  return (
    <Fragment>
      <UI />
      <Game />
    </Fragment>
  );
};

render(<App />, document.body);
