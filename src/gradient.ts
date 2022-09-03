import { Axis } from "./axis";
import Drawable from "./drawable";

import p5, { Color } from "p5";

/**
 * Attributes for drawing a linear gradient.
 */
export interface LinearGradientAttributes {
    /** x-coordinate to start drawing from. */
    startX: number;

    /** y-coordinate to start drawing from */
    startY: number;

    width: number;
    height: number;

    /** Color to interpolate from. */
    colorFrom: Color;

    /** Color to interpolate to. */
    colorTo: Color;

    /** Axis to draw interpolated colors relative to. */
    axis: Axis.X | Axis.Y;
}

/**
 * Drawable canvas object representing a 2D gradient between 2 colors across a
 * single axis.
 */
export class LinearGradient implements Drawable {
    readonly attribs: LinearGradientAttributes;
    readonly translateZ?: number;
    readonly rotateY?: number;

    /**
     * Creates a new linear gradient.
     * @param attribs Attributes for drawing.
     * @param translatezZ Quantity to translate by on the z-axis.
     * @param rotateY Angle to rotate on the y-axis before drawing, in p5's
     * current angle unit (set by p5.angleMode(), radians by default).
     */
    constructor(attribs: LinearGradientAttributes, translatezZ?: number,
        rotateY?: number) {
        this.attribs = attribs;
        this.translateZ = translatezZ;
        this.rotateY = rotateY;
    }

    /**
     * Draws the gradient onto the canvas. Preserves drawing configuration and
     * transformations.
     * @param p p5 instance.
     */
    draw(p: p5): void {
        p.push();

        if (this.rotateY) {
            p.rotateY(this.rotateY);
        }

        if (this.translateZ) {
            p.translate(0, 0, this.translateZ);
        }

        p.noFill();
        // TODO(Natalie): Optimize.
        if (this.attribs.axis === Axis.Y) {
            for (let y = this.attribs.startY;
                y <= this.attribs.startY + this.attribs.height; ++y) {
                let inter = p.map(y,
                    this.attribs.startY,
                    this.attribs.startY + this.attribs.height,
                    0,
                    1);

                let color = p.lerpColor(this.attribs.colorFrom,
                    this.attribs.colorTo,
                    inter);

                p.stroke(color);
                p.line(this.attribs.startX,
                    y,
                    this.attribs.startX + this.attribs.width,
                    y);
            }
        } else if (this.attribs.axis === Axis.X) {
            for (let x = this.attribs.startX;
                x <= this.attribs.startX + this.attribs.width; ++x) {
                let inter = p.map(x,
                    this.attribs.startX,
                    this.attribs.startX + this.attribs.width,
                    0,
                    1);

                let color = p.lerpColor(this.attribs.colorFrom,
                    this.attribs.colorTo,
                    inter);

                p.stroke(color);
                p.line(x,
                    this.attribs.startY,
                    x,
                    this.attribs.startY + this.attribs.height);
            }
        }

        p.pop();
    }
}