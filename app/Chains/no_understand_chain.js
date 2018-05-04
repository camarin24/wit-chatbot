'use strict';
class NoUnderstandChain extends Handler{
    constructor(image,side){
        super(image,side);
    }
    setSuccessor(successor){
        this.successor = successor;
    }
    Next(command){
        renderer.render(new Message(this.image, this.side, "Mi no entender"));
    }
}