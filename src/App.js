class App {
    constructor() {
        this.nodes = [];
        this.lines = [];

        this.display = null;

        this.init();
    }
    
    init() {
        let x = document.body.offsetWidth / 2;
        let y = document.body.offsetHeight / 2;
        
        this.nodes.push(new Node(x, y));
        this.display = this.nodes[0];

        this.getElement();
    }

    getElement() {
       wrappers = document.querySelectorAll('.wrapper');

       this.listener();
       console.log(this.nodes)
    }

    createNode(i, dir) {
        let x, y, that;

        if (dir == 'top') {
            x = 0;
            y = -150;
            that = 1;
        } else if (dir == 'bottom') {
            x = 0;
            y = 150;
            that = 3;
        } else if (dir == 'right') {
            x = 150;
            y = 0;
            that = 2;
        } else if (dir == 'left') {
            x = -150;
            y = 0;
            that = 4;
        }

        this.nodes[i].relations.push({number: that, text: '', node: this.nodes.length});
        this.lines.push(new Line(this.nodes[i].x, this.nodes[i].y, this.nodes[i].x + x, this.nodes[i].y + y));
        this.nodes.push(new Node(this.nodes[i].x + x, this.nodes[i].y + y, this.getRelationNum(dir), i));
        this.getElement();
    }

    getRelationNum(dir) {
        if (dir == 'top') return 3;
        else if (dir == 'bottom') return 1;
        else if (dir == 'left') return 2;
        else if (dir == 'right') return 4;
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

            wrapper.children[0].addEventListener('click', () => {
                modalForm.innerHTML += `<button class="btn-close" onclick="closeModal()">x</button>`;

                modalForm.innerHTML += `<div class="form-group">
                                            <label for="content">Content</label>
                                            <textarea id="content" rows="8" onkeydown="updateContentValue(${i}, this.value)">${this.nodes[i].content}</textarea>
                                        </div>`;

                this.nodes[i].relations.forEach((relation, j) => {
                    modalForm.innerHTML += `<input placeholder="Relation ${relation.number}" value="${relation.text}" onkeyup="updateRelationValue(${i}, ${j}, this.value)">`;
                });
                
                openModal();
            });

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