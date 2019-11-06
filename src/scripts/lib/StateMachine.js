export default class StateMachine {
  constructor(initialState, possibleStates, stateArgs) {
    this.initialState = initialState;
    this.possibleStates = possibleStates;
    this.stateArgs = stateArgs;
    this.state = null;

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
      this.possibleStates[this.state].enter(this.stateArgs);
    }

    this.possibleStates[this.state].execute(this.stateArgs);
  }

  transition(newState, enterArgs = {}) {
    this.state = newState;

    // Call state entering function
    this.possibleStates[this.state].enter({ ...this.stateArgs, ...enterArgs });
  }
}
