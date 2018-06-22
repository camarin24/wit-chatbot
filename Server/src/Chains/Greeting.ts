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

  Next(command: Command, resolve: any) {
    if (command.intent == this.Intent) {
      resolve({ message: "Hola humano", data: command });
    } else {
      this.Successor.Next(command, resolve);
    }
  }
}
