class Node {
    constructor(x, y) {
        this.lines = [];

        this.x = x;
        this.y = y;

        this.render();
    }

    render() {
        container.innerHTML += `<div class="wrapper" style="left: ${this.x}px; top: ${this.y}px">
                                    <button type="button" class="btn-edit">Edit</button>

                                    <div class="box">
                                        <div class="area" data-dir="top"><span data-dir="top">1</span></div>
                                        <div class="area" data-dir="right"><span data-dir="right">2</span></div>
                                        <div class="area" data-dir="left"><span data-dir="left">3</span></div>
                                        <div class="area" data-dir="bottom"><span data-dir="bottom">4</span></div>
                                    </div>

                                    <button type="button" class="btn-delete">Delete</button>
                                </div>`;
    }
}