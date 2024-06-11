export interface StateTransition {
  target: string;
  action(...args: any[]): void;
}

export interface StateActions {
  onEnter?(): void;
  onLeave?(): void;
}

export interface StateMachineState {
  actions: StateActions;
  transitions: Record<string, StateTransition>;
}

export type StateMachineStates = Record<string, StateMachineState>;

/**
 * A finite-state machine. Defines various states and transitions between them.
 * Only one state can be active at one time.
 */
export class StateMachine<TMachine extends StateMachineStates> {
  protected states = new Map<keyof TMachine, StateMachineState>();
  public value!: keyof TMachine;

  constructor(states: TMachine, initial: string) {
    Object.entries(states).forEach(([name, state]) =>
      this.states.set(name, state)
    );
    this.value = initial;
  }

  /**
   * Transition from state `from` via transition `event`.
   * @param from Current state
   * @param event Transition to use
   * @param args Transition parameters
   */
  transition<
    TState extends keyof TMachine,
    TTransition extends keyof TMachine[TState]['transitions']
  >(
    from: TState,
    event: TTransition,
    ...args: Parameters<TMachine[TState]['transitions'][TTransition]['action']>
  ) {
    const currentStateDefinition = this.states.get(from) as StateMachineState;
    const destinationTransition =
      currentStateDefinition.transitions[event as string];
    if (!destinationTransition) {
      return;
    }
    const destinationState = destinationTransition.target;
    const destinationStateDefinition = this.states.get(
      destinationState
    ) as StateMachineState;

    destinationTransition.action(...args);
    currentStateDefinition.actions.onLeave?.();
    destinationStateDefinition.actions.onEnter?.();

    this.value = destinationState;
  }

  /**
   * Change state without transitioning.
   * Should not be used in normal operation of the state machine.
   * @param from Current state
   * @param to Desired state
   */
  change<TFrom extends keyof TMachine, TTo extends keyof TMachine>(
    from: TFrom,
    to: TTo
  ) {
    const currentStateDefinition = this.states.get(from) as StateMachineState;
    const destinationStateDefinition = this.states.get(to) as StateMachineState;
    currentStateDefinition.actions.onLeave?.();
    destinationStateDefinition.actions.onEnter?.();
    this.value = to;
  }
}
