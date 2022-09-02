import { ColorRGB, ColorRGBA } from "./color";
import Drawable from "./drawable";

import p5, { Vector } from "p5";

/**
 * Attrbutes for the drawable sun object.
 */
export interface SunAttributes {
    /** Radius of the sphere representing the sun. */
    radius: number;

    /** Translation to apply before drawing. */
    translation: Vector;

    /** Color with which to fill the sphere representing the sun. */
    fillColorAttribs: ColorRGBA;

    /** Coordinates of the light source to place. */
    lightPosition?: Vector;

    /** Color of the light source. */
    lightColorAttribs?: ColorRGB;

    /** Color to shade the sun itself with, to give the effect of depth. */
    frontlightColorAttribs?: ColorRGB;
}

/**
 * Drawable canvas object representing a sun with a sphere and optional
 * lighting.
 */
export class Sun implements Drawable {
    readonly attribs: SunAttributes;

    /**
     * Creates the sun.
     * @param attribs Attributes for drawing.
     */
    constructor(attribs: SunAttributes) {
        this.attribs = attribs;
    }

    /**
     * Draws the sun onto the canvas and creates any associated light sources.
     * Preserves drawing configuration and transformations, and retains the sun's
     * created global light source if provided.
     * @param p p5 instance.
     */
    draw(p: p5): void {
        p.push();

        // Optional frontlight for sun shading.
        if (this.attribs.frontlightColorAttribs) {
            let positionModifier = this.attribs.radius * 4;
            p.pointLight(this.attribs.frontlightColorAttribs.red,
                this.attribs.frontlightColorAttribs.blue,
                this.attribs.frontlightColorAttribs.green,
                positionModifier,
                positionModifier,
                positionModifier);
        }

        // Draw sun object.
        p.noStroke();
        p.translate(this.attribs.translation.x,
            this.attribs.translation.y,
            this.attribs.translation.z);
        p.fill(this.attribs.fillColorAttribs.red,
            this.attribs.fillColorAttribs.green,
            this.attribs.fillColorAttribs.blue,
            this.attribs.fillColorAttribs.alpha);
        p.sphere(this.attribs.radius);

        p.pop();

        // Optional global light source.
        if (this.attribs.lightPosition && this.attribs.lightColorAttribs) {
            p.pointLight(this.attribs.lightColorAttribs.red,
                this.attribs.lightColorAttribs.blue,
                this.attribs.lightColorAttribs.green,
                this.attribs.lightPosition.x,
                this.attribs.lightPosition.y,
                this.attribs.lightPosition.z);
        }
    }
}