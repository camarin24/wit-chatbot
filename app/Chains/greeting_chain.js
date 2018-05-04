'use strict';
class GreetingChain extends Handler {
    constructor(image, side) {
        super(image, side);
        this.command = "greeting";
    }
    setSuccessor(successor) {
        this.successor = successor;
    }
    Next(command) {
        if (command.intent == this.command) {
            renderer.render(new Message(this.image, this.side, "Hola soy XXXXX"));
        } else {
            this.successor.Next(command);
        }
    }
}