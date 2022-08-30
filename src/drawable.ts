import p5 from "p5";

/**
 * Object drawable to the canvas.
 */
export default interface Drawable {
    /**
     * Draws the object onto the canvas.
     * @param p p5 instance.
     */
    draw(p: p5): void;
}