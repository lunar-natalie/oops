import ColorAttributes from "./color";
import Drawable from "./drawable";

import p5, { Vector } from "p5";

export interface GroundAttributes {
    colorAttribs: ColorAttributes;
    width: number;
    length: number;
    depth: number;
    translation: Vector;
}

export class Ground implements Drawable {
    attribs: GroundAttributes;

    constructor(attribs: GroundAttributes) {
        this.attribs = attribs;
    }

    draw(p: p5): void {
        p.push();

        p.noStroke();
        p.fill(this.attribs.colorAttribs.red, this.attribs.colorAttribs.green, this.attribs.colorAttribs.blue, this.attribs.colorAttribs.alpha);
        p.translate(this.attribs.translation);
        p.box(this.attribs.width, this.attribs.length, this.attribs.depth);

        p.pop();
    }
}