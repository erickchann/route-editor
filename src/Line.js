class Line extends Svg {
    constructor(el1, el2, sec1, sec2, id = false) {
        super();

        this.el1 = el1;
        this.el2 = el2;
        this.sec1 = sec1;
        this.sec2 = sec2;
        this.focused = false;
        this.id = id;
        if (!this.id)
            this.getID();

        this.dom = null;
        this.create();
        this.listener();
    }

    getID() {
        if (main.lines.length > 0) {
            this.id = main.lines[main.lines.length - 1].id + 1;
        } else {
            this.id = 1;
        }
    }

    getPos() {
        let pos = {
            x1: this.el1.x,
            y1: this.el1.y,
            x2: this.el2.x,
            y2: this.el2.y
        };

        if (this.sec1 == 1) {
            pos.y1 -= main.radius;
        } else if (this.sec1 == 2) {
            pos.x1 += main.radius;
        } else if (this.sec1 == 3) {
            pos.y1 += main.radius;
        } else if (this.sec1 == 4) {
            pos.x1 -= main.radius;
        }

        if (this.sec2 == 1) {
            pos.y2 -= main.radius;
        } else if (this.sec2 == 2) {
            pos.x2 += main.radius;
        } else if (this.sec2 == 3) {
            pos.y2 += main.radius;
        } else if (this.sec2 == 4) {
            pos.x2 -= main.radius;
        }

        return pos;
    }

    create() {
        // get pos
        var pos = this.getPos();

        // line
        this.dom = this.make('line', {
            class: 'line',
            id: `line-${this.id}`,
            dataID: this.id,
            x1: pos.x1,
            x2: pos.x2,
            y1: pos.y1,
            y2: pos.y2,
        });

        app.prepend(this.dom);
    }

    listener() {
        this.dom.addEventListener('click', () => {
            main.lines.forEach(line => line.focused = false);
            this.focused = true;
        });
    }

    update() {
        this.el1.sectionDOM()
            .find(section => section.getAttribute('i') == this.sec1)
            .classList.add('active');
            
        this.el2.sectionDOM()
            .find(section => section.getAttribute('i') == this.sec2)
            .classList.add('active');

        let pos = this.getPos();
        this.dom.setAttribute('x1', pos.x1);
        this.dom.setAttribute('x2', pos.x2);
        this.dom.setAttribute('y1', pos.y1);
        this.dom.setAttribute('y2', pos.y2);

        if (this.focused) {
            this.dom.classList.add('focused');
        } else {
            this.dom.classList.remove('focused');
        }
    }

    reset() {
        this.el1.sectionDOM()
            .find(section => section.getAttribute('i') == this.sec1)
            .classList.remove('active');
            
        this.el2.sectionDOM()
            .find(section => section.getAttribute('i') == this.sec2)
            .classList.remove('active');
    }

    destroy() {
        this.reset();
        this.dom.remove();
        let index = main.lines.findIndex(line => line.id == this.id);
        main.lines.splice(index, 1);
    }
}