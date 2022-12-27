import { ColorRGB, ColorRGBA } from "./color";
import Drawable from "./drawable";

import p5, { Image, Vector } from "p5";

/**
 * Attrbutes for a drawable sun object.
 */
export interface SunAttributes {
    /** Radius of the sphere representing the sun. */
    radius: number;

    /** Translation to apply before drawing. */
    translation: Vector;

    /** Coordinates of the light source to place. */
    lightPosition?: Vector;

    /** Color of the light source. */
    lightColorAttribs?: ColorRGB;

    /** Image to apply to the sun's shape. */
    texture: Image;
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

        // Draw sun object.
        p.noStroke();
        p.translate(this.attribs.translation.x,
            this.attribs.translation.y,
            this.attribs.translation.z);
        p.textureWrap(p.REPEAT);
        p.texture(this.attribs.texture);
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
