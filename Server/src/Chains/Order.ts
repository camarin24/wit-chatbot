import { Handler, Command } from "../Handler";
import { BotResponse } from "../Types/BotResponse";

export class OrderChain implements Handler {
  Intent: string;
  Successor: Handler;
  constructor() {
    this.Intent = "order";
  }
  SetSuccessor(successor: Handler) {
    this.Successor = successor;
  }

  Next(command: Command, resolve: any) {
    const response = new BotResponse();
    if (command.intent == this.Intent) {
      const { product, quantity, presentation } = command.data;
      response.intent = this.Intent;
      response.message = "Ok, este es el detalle de tu pedido:\n";
      if (product) {
        for (let index = 0; index < product.length; index++) {
          const element = product[index];
          response.orders.push({
            product: element.value,
            presentation: this.GetValue(index, presentation),
            quantity: this.GetValue(index, quantity)
          });
        }
        for (const p of response.orders) {
          response.message += `Producto: ${p.product} \n Cantidad: ${
            p.quantity
          } \n Presentación: ${p.presentation} \n`;
        }
      } else {
        response.message = "Ok, qué productos necesitas?";
      }
      resolve(response);
    } else {
      this.Successor.Next(command, resolve);
    }
  }

  GetValue(index: number, Value: any): any {
    if (Value && Value.length > 0) {
      if (Value[index]) {
        return Value[index].value;
      } else {
        return Value[Value.length - 1].value;
      }
    }
    return "";
  }
}
