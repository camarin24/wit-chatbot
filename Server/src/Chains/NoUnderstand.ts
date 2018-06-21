import { Handler, Command } from "../Handler";
export class NoUnderstandChain implements Handler {
  Intent: string;
  Successor: Handler;
  SetSuccessor(successor: Handler): void {
    this.Successor = successor;
  }
  constructor() {
    this.Intent = "";
  }

  Next(command: Command) {}
}
