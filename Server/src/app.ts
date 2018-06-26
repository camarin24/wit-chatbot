import { Handler, Command } from "./Handler";
import { GreetingChain } from "./Chains/Greeting";
import { NoUnderstandChain } from "./Chains/NoUnderstand";
import { UserRequest } from "./Types/UserRequest";
import client = require("request");
import { HelpChain } from "./Chains/Help";
import { ChangeStateChain } from "./Chains/ChangeState";

export class Bot {
  Chain: Handler;

  constructor() {
    this.BuildChain();
  }

  BuildChain() {
    const greeting = new GreetingChain();
    const changeState = new ChangeStateChain();
    const help = new HelpChain();
    const finish = new NoUnderstandChain();
    greeting.SetSuccessor(changeState);
    changeState.SetSuccessor(help);
    help.SetSuccessor(finish);
    this.Chain = greeting;
  }

  init(req: UserRequest) {
    const url = `https://api.wit.ai/message?v=20180626&q=${req.message}`;
    return new Promise((resolve, reject) => {
      client(
        url,
        {
          json: true,
          method: "POST",
          headers: { Authorization: "Bearer GNYIFHURQNFOSG5HCBPTWXE747QBE3VH" }
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
