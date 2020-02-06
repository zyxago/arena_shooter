export default class Canvas{
    /**
     *
     * @param {HTMLElement}element
     */
    constructor(element) {
        this.canvas = element;
        this.ctx = this.canvas.getContext("2d");

        this.canvas.width = window.innerWidth/2 - 100;
        this.canvas.height = window.innerWidth/2 - 100;
    }
}