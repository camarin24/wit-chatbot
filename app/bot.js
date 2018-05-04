const bot = {
    image: `bot/${Math.floor(Math.random() * Math.floor(6))}.png`,
    side: "left",
    chain: {},
    proccessCommand(command) {
        let { entities } = command;
    
        let proccess = {
            intent: entities["intent"][0].value
        };

        Object.keys(entities).forEach((value,index) =>{

        })

        console.log(proccess);
        this.chain.Next(proccess);
    },
    say() {
        renderer.render(new Message(this.image, this.side, "Welcome mother fucker!!!"));
    },
    init() {
        let greeting = new GreetingChain(this.image, this.side);
        let noUnderstand = new NoUnderstandChain(this.image, this.side);
        greeting.setSuccessor(noUnderstand);
        this.chain = greeting;
    }
}