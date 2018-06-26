import { BotStates } from "./BotStates";

export class BotResponse {
  constructor() {
    this.orders = [];
    this.quotations = [];
    this.message = "";
  }
  message?: string;
  orders?: Array<{
    product?: string;
    quantity?: number | string;
    presentation?: string;
  }>;
  quotations?: Array<string>;
  intent?: string;
  state: BotStates;
  action?: string;
}
