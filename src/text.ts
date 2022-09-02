import { ColorRGBA } from "./color";
import Drawable from "./drawable";

import p5, { Font } from "p5";

export interface TextAttributes {
    content: string;
    font: Font;
    startX: number;
    startY: number;
    size: number;
    fillColorAttribs: ColorRGBA;
}

export class Text implements Drawable {
    readonly attribs: TextAttributes;

    constructor(attribs: TextAttributes) {
        this.attribs = attribs;
    }

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