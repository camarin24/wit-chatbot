import { Handler } from "./Handler";
import { GreetingChain } from "./Chains/Greeting";
import { NoUnderstandChain } from "./Chains/NoUnderstand";
import { UserRequest } from "./Types/UserRequest";
import client = require("request");

export class Bot {
  Chain: Handler;

  constructor() {
    this.BuildChain();
  }

  BuildChain() {
    const greeting = new GreetingChain();
    const finish = new NoUnderstandChain();
    greeting.SetSuccessor(finish);
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
          resolve(body);
        }
      );
    });
  }

  ProcessCommand(res: any) {
    console.log(JSON.stringify(res));
  }
}
