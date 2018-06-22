import { Handler, Command } from "./Handler";
import { GreetingChain } from "./Chains/Greeting";
import { NoUnderstandChain } from "./Chains/NoUnderstand";
import { UserRequest } from "./Types/UserRequest";
import client = require("request");
import { OrderChain } from "./Chains/Order";
import { HelpChain } from "./Chains/Help";

export class Bot {
  Chain: Handler;

  constructor() {
    this.BuildChain();
  }

  BuildChain() {
    const greeting = new GreetingChain();
    const order = new OrderChain();
    const help = new HelpChain();
    const finish = new NoUnderstandChain();
    greeting.SetSuccessor(order);
    order.SetSuccessor(help);
    help.SetSuccessor(finish);
    this.Chain = greeting;
  }

  init(req: UserRequest) {
    const url = `https://api.wit.ai/message?v=20180412&q=${req.message}`;
    return new Promise((resolve, reject) => {
      client(
        url,
        {
          json: true,
          method: "POST",
          headers: { Authorization: "Bearer LFEMMCZEH6PSVCK6JIR3QN7LV6EHMKJW" }
        },
        (err, res, body) => {
          if (err) {
            return console.log(err);
          }
          this.Chain.Next(this.ProcessCommand(body), resolve);
        }
      );
    });
  }

  ProcessCommand(body: any) {
    const { entities } = body;

    const response: Command = { data: undefined, intent: "" };

    if (entities["intent"]) {
      response.data = entities;
      if (entities["intent"][0]) {
        response.intent = entities["intent"][0].value;
      } else {
        response.intent = "";
      }
    }
    console.log(JSON.stringify(response));
    return response;
  }
}
