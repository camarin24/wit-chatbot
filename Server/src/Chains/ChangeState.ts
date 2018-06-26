import { Handler, Command } from "../Handler";
import { BotResponse } from "../Types/BotResponse";
import { BotStates } from "../Types/BotStates";

export class ChangeStateChain implements Handler {
  Intent: string;
  Successor: Handler;
  constructor() {
    this.Intent = "change_state";
  }
  SetSuccessor(successor: Handler) {
    this.Successor = successor;
  }
  Next(command: Command, resolve: any) {
    if (command.intent == this.Intent) {
      const response = new BotResponse();

      response.intent = this.Intent;
      response.state = BotStates.Ok;
      const { quotation_code, new_state } = command.data;

      if (quotation_code) {
        for (let index = 0; index < quotation_code.length; index++) {
          const element = quotation_code[index];
          response.quotations.push(element.value);
        }
      } else {
        response.state = BotStates.PendienteCodigos;
        response.message += "Por favor ingrese el código del producto.";
      }

      if (new_state) {
        response.action = new_state[0].value;
      } else {
        response.state = BotStates.PendienteEstado;
        response.message += "Qué estado quiere aplicar a la cotización?";
      }

      resolve(response);
    } else {
      this.Successor.Next(command, resolve);
    }
  }
}
