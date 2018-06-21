import { Handler, Command } from "../Handler";
export class GreetingChain implements Handler {
  Successor: Handler;
  Intent: string;

  SetSuccessor(successor: Handler): void {
    this.Successor = successor;
  }

  constructor() {
    this.Intent = "greeting";
  }

  Next(command: Command) {
    if (command.intent == this.Intent) {
    } else {
      this.Successor.Next(command);
    }
  }
}
