import { ColorRGBA } from "./color";
import Drawable from "./drawable";

import p5, { Font } from "p5";

/**
 * Attributes for drawable text.
 */
export interface TextAttributes {
    /** Text content to be displayed. */
    content: string;

    /** Font with which to draw text. */
    font: Font;

    /** x-coordinate at which to start drawing. */
    startX: number;

    /** y-coordinate at which to start drawing. */
    startY: number;

    /** Font size in pixels. */
    size: number;

    /** Text color. */
    fillColorAttribs: ColorRGBA;
}

/**
 * Drawable canvas text object.
 */
export class Text implements Drawable {
    readonly attribs: TextAttributes;

    /**
     * Creates a new text object.
     * @param attribs Attributes for drawing.
     */
    constructor(attribs: TextAttributes) {
        this.attribs = attribs;
    }

    /**
     * Draws text in the font specified in the attributes. Preserves drawing
     * configuration and transformations.
     * @param p p5 instance.
     */
    draw(p: p5): void {
        p.push();

        p.fill(this.attribs.fillColorAttribs.red,
            this.attribs.fillColorAttribs.green,
            this.attribs.fillColorAttribs.blue,
            this.attribs.fillColorAttribs.alpha);
        p.textSize(this.attribs.size);
        p.textFont(this.attribs.font);
        p.text(this.attribs.content, this.attribs.startX, this.attribs.startY);

        p.pop();
    }
}