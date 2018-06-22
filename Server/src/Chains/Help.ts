import { Handler, Command } from "../Handler";

export class HelpChain implements Handler {
  Intent: string;
  Successor: Handler;
  constructor() {
    this.Intent = "help";
  }
  SetSuccessor(successor: Handler) {
    this.Successor = successor;
  }
  Next(command: Command, resolve: any) {
    if (command.intent == this.Intent) {
      resolve({ message: "Esto es un bot que no hace nada", data: command });
    } else {
      this.Successor.Next(command, resolve);
    }
  }
}
