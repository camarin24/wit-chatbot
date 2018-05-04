class Message {
    constructor(image, side, message) {
        this.image = image;
        this.side = side;
        this.message = message;
        this.preRender();
    }

    getView() {
        return this.preRender();
    }

    preRender() {
        if (this.side === "left") {
            return `<div class="row no-margin-bot">
                        <div class="col s12 m12">
                            <div class="card horizontal">
                                <div class="card-image">
                                    <img src="./dist/images/${this.image}">
                                </div>
                                <div class="card-stacked">
                                    <div class="card-content">
                                        <p>${this.message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
        } else {
            return `<div class="row no-margin-bot">
                        <div class="col s12 m12">
                            <div class="card horizontal">
                                <div class="card-stacked">
                                    <div class="card-content">
                                        <p>${this.message}</p>
                                    </div>
                                </div>
                                <div class="card-image">
                                    <img src="./dist/images/${this.image}">
                                </div>
                            </div>
                        </div>
                    </div>`;
        }
    }
}