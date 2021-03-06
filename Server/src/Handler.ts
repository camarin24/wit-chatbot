export interface Command {
  intent: string;
  data: any;
}

export interface Handler {
  Next(command: Command, resolve: any): void;
  Intent: string;
  Successor: Handler;
  SetSuccessor(successor: Handler): void;
}
