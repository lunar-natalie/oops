import { ColorRGBA } from "./color";
import Drawable from "./drawable";

import p5, { Vector } from "p5";

/**
 * Attributes for a drawable and animated cloud.
 */
export interface CloudAttributes {
    /** Width of the ellipsis for the first segment. */
    baseWidth: number;

    /** Number of segments to draw around the first. */
    segments: number;

    /** Fill color. */
    fillColorAttribs: ColorRGBA;

    /**
     * Translation to apply to the first segment. Other segments will be placed
     * relative to the first.
     */
    translation: Vector;

    /**
     * Quantity to divide the number of milliseconds since p5.setup() was called
     * by, used to generate the animated translation along the x-axis over time.
     */
    xAnimationDivisor: number;
}

/**
 * Drawable, animated, segmented cloud represented by ellipses.
 */
export class Cloud implements Drawable {
    readonly attribs: CloudAttributes;

    /**
     * Creates a new cloud.
     * @param attribs Attributes for drawing.
     */
    constructor(attribs: CloudAttributes) {
        this.attribs = attribs;
    }

    /**
     * Draws the cloud by its segments. Translates along the x-axis over time.
     * Preserves drawing configuration and transformations.
     * @param p p5 instance.
     */
    draw(p: p5): void {
        p.push();

        p.noStroke();
        p.fill(this.attribs.fillColorAttribs.red,
            this.attribs.fillColorAttribs.blue,
            this.attribs.fillColorAttribs.green,
            this.attribs.fillColorAttribs.alpha);

        p.translate(Vector.fromAngle(p.millis() / this.attribs.xAnimationDivisor, 2 * p.width).x,
            0,
            this.attribs.translation.z);

        // Draw center segments.
        p.ellipse(this.attribs.translation.x, this.attribs.translation.y,
            this.attribs.baseWidth);

        // Draw segments to the right.
        p.push();
        for (let i = 0, prevWidth = this.attribs.baseWidth;
            i < (this.attribs.segments - 1) / 2; ++i) {
            let width = (i + 1) * this.attribs.baseWidth;
            p.ellipse(this.attribs.translation.x + prevWidth,
                this.attribs.translation.y + (this.attribs.baseWidth / 2),
                width);
            prevWidth = width;
        }
        p.pop();

        // Draw segments to the left.
        for (let i = (this.attribs.segments - 1) / 2,
            prevWidth = this.attribs.baseWidth;
            i >= 0; --i) {
            let width = (i + 1) * this.attribs.baseWidth;
            p.ellipse(this.attribs.translation.x - prevWidth,
                this.attribs.translation.y + (this.attribs.baseWidth / 2),
                width);
            prevWidth = width;
        }

        p.pop();
    }
}