class App {
    constructor() {
        this.data = [];
        this.lines = [];

        this.init();
    }
    
    init() {
        let x = document.body.offsetWidth / 2;
        let y = document.body.offsetHeight / 2;
        
        this.data.push(new Node(x, y));

        this.getElement();
    }

    getElement() {
       wrappers = document.querySelectorAll('.wrapper');

       this.listener();
    }

    createNode(i, dir) {
        let x, y;

        if (dir == 'top') {
            x = 0;
            y = -200;
        } else if (dir == 'bottom') {
            x = 0;
            y = 200;
        } else if (dir == 'right') {
            x = 200;
            y = 0;
        } else if (dir == 'left') {
            x = -200;
            y = 0;
        }

        this.lines.push(new Line(this.data[i].x, this.data[i].y, this.data[i].x + x, this.data[i].y + y));
        this.data.push(new Node(this.data[i].x + x, this.data[i].y + y));
        this.getElement();
    }

    listener() {
        wrappers.forEach((wrapper, i) => {
            for (const area of wrapper.children[1].children) {
                area.addEventListener('click', (e) => {
                    e.stopPropagation();

                    let dir = area.getAttribute('data-dir');

                    this.createNode(i, dir);
                });
            }

            wrapper.addEventListener('mouseover', () => {
                wrapper.children[0].classList.add('show');
                wrapper.children[2].classList.add('show');
        
                for (const area of wrapper.children[1].children) {
                    area.classList.add('show');
                }
            });
        
            wrapper.addEventListener('mouseout', () => {
                wrapper.children[0].classList.remove('show');
                wrapper.children[2].classList.remove('show');
        
                for (const area of wrapper.children[1].children) {
                    area.classList.remove('show');
                }
            });
        });
    }
}