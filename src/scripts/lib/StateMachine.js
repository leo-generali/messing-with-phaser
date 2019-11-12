export default class StateMachine {
  constructor(initialState, possibleStates, stateArgs) {
    this.initialState = initialState;
    this.possibleStates = possibleStates;
    this.stateArgs = stateArgs;
    this.state = null;
    this.stateStack = [];

    // Give each state access to this state machine
    for (const state of Object.values(this.possibleStates)) {
      state.stateMachine = this;
    }
  }

  step() {
    // On the first step, the state is null and we need to initialize the first state.
    // Since subsequent machines will always have a state this function will call
    // execute on subsequent updates
    if (this.state === null) {
      this.state = this.initialState;
      this.stateStack = [...this.stateStack, this.initialState];
      this.possibleStates[this.state].enter(this.stateArgs);
    }

    this.possibleStates[this.state].execute(this.stateArgs);
  }

  transition(newState, enterArgs = {}) {
    // Run the exit function of the state
    this.possibleStates[this.state].exit();

    // Return to the last state in pushdown automata
    if (newState === "previous") {
      this.stateStack.pop();
    }

    // In these actions, add to the stateStack
    if (["stagger", "jump"].includes(newState)) {
      this.stateStack.push(newState);
    }

    // For these actions, rewrtite the statStack
    if (["move", "idle"].includes(newState)) {
      this.stateStack = [newState];
    }

    this.state = this.stateStack[this.stateStack.length - 1];

    // Call state entering function
    this.possibleStates[this.state].enter({ ...this.stateArgs, ...enterArgs });
  }
}
