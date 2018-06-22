export class BotResponse {
  constructor() {
    this.orders = [];
  }
  message?: string;
  orders?: Array<{
    product?: string;
    quantity?: number | string;
    presentation?: string;
  }>;
  intent?: string;
}
