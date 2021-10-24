class Svg {
    constructor() {
        this.namespace = 'http://www.w3.org/2000/svg';
    }

    make(tag, attrs) {
        tag = document.createElementNS(this.namespace, tag);

        Object.keys(attrs).forEach(key => {
            tag.setAttribute(key, attrs[key]);
        });

        return tag;
    }
}