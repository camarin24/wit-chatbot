const user = {
    image: `user/${Math.floor(Math.random() * Math.floor(4))}.png`,
    button: null,
    text: null,
    side: "rigth",
    fetch(input) {
        this.renderMessage(input);
        fetch(`https://api.wit.ai/message?v=20180412&q=${input}`,
            {
                method: "POST",
                headers: {
                    Authorization: 'Bearer LFEMMCZEH6PSVCK6JIR3QN7LV6EHMKJW'
                }
            }
        ).then(res => {
            res.json().then(data => {
                bot.proccessCommand(data);
            })
        })
    },
    renderMessage(message){
        renderer.render(new Message(this.image, this.side, message));
    },
    send(event) {
        if(this.text.value)
            this.fetch(this.text.value);
            this.clear();
    },
    clear(){
        this.text.value = "";
    },
    keyup(event) {
        let key = event.which || event.keyCode;
        if (key === 13) {
            if(this.text.value)
                this.fetch(this.text.value);
                this.clear();
        }
    },
    init() {
        this.button = document.getElementById("send");//.onclick = this.send;
        this.text = document.getElementById("text");//
        this.button.onclick = event => {
            this.send(event);
        }
        this.text.onkeyup = event => {
            this.keyup(event);
        }
        
    }
}
