import p5 from "p5";

/**
 * Object drawable to the canvas.
 */
export default interface Drawable {
    /**
     * Draws an object onto the canvas. Should preserve drawing configuration
     * and transformations.
     * @param p p5 instance.
     */
    draw(p: p5): void;
}