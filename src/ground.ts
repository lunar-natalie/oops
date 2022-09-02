import ColorAttributes from "./color";
import Drawable from "./drawable";

import p5, { Vector } from "p5";

/**
 * Attributes for the drawable ground plane.
 */
export interface GroundAttributes {
    /** Fill color. */
    colorAttribs: ColorAttributes;

    width: number;
    length: number;
    depth: number;

    /** Translation to apply to the ground. */
    translation: Vector;
}

/**
 * Drawable canvas object representing a ground plane.
 */
export class Ground implements Drawable {
    readonly attribs: GroundAttributes;

    /**
     * Creates a new ground plane.
     * @param attribs Attributes for drawing.
     */
    constructor(attribs: GroundAttributes) {
        this.attribs = attribs;
    }

    /**
     * Draws the ground plane. Preserves drawing configuration and
     * trnasformations.
     * @param p p5 instance.
     */
    draw(p: p5): void {
        p.push();

        p.noStroke();
        p.fill(this.attribs.colorAttribs.red,
            this.attribs.colorAttribs.green,
            this.attribs.colorAttribs.blue,
            this.attribs.colorAttribs.alpha);
        p.translate(this.attribs.translation);
        p.box(this.attribs.width, this.attribs.depth, this.attribs.length);

        p.pop();
    }
}