const renderer = {
    elem:document.getElementById("container"),
    card:document.getElementById("card"),
    render(message){
        this.elem.insertAdjacentHTML("beforeend",message.getView());
    },
    init(){
        this.elem.style.maxHeight = `${parseInt(this.card.offsetHeight - 50)}px`;
        this.elem.style.overflow = "hidden";
        this.elem.style.overflowY = "scroll";
    }
};