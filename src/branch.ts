import Color from "./color";
import Drawable from "./drawable";

import p5, { Vector } from "p5";

/**
 * Attributes for drawable branches.
 */
export interface BranchAttributes {
    /** Radius of the cylinder representing the branch. */
    radius: number;

    /** Length of the cylinder representing the branch. */
    length: number;

    /**
     * Minimum length. Recursion in a drawing procedure will stop once this
     * length has been reached.
     */
    minLength: number;

    /** Color to fill the cylinder representing the branch with. */
    color: Color;

    /** Color to fill children of a certain length and below with. */
    altColor?: Color;
    minLengthAltColor?: number;

    /**
     * Number to multiply the length of the previously drawn branch by for the
     * next.
     */
    lengthMultiplier: number;

    /**
     * Number to multiply the radius of the previously drawn branch by for the
     * next.
     */
    radiusMultiplier?: number;

    /**
     * Angle to deviate from the previously drawn branch by, in p5's current
     * angle unit (set by p5.angleMode(), radians by default).
     */
    angleDeviation?: number;
}

/**
 * Drawable canvas object represented by a cylinder and its children.
 */
export class Branch implements Drawable {
    attribs: BranchAttributes;
    children: Branch[];
    initialTranslation?: Vector;

    /**
     * Creates a new branch and recursively creates its children from each of
     * the two sides of the top of each previously drawn branch, until the
     * minimum branch length is reached.
     * @param attribs Attributes for the root branch and for the children to
     * derive from.
     * @param initialTranslation Translation to apply when drawing the root
     * branch.
     */
    constructor(attribs: BranchAttributes, initialTranslation?: Vector) {
        this.attribs = attribs;
        this.children = [];
        this.initialTranslation = initialTranslation;

        // Create children.
        if (this.attribs.length > this.attribs.minLength) {
            let childAttribs: BranchAttributes = Object.create(this.attribs);
            childAttribs.length *= this.attribs.lengthMultiplier;
            if (this.attribs.radiusMultiplier) {
                childAttribs.radius *= this.attribs.radiusMultiplier;
            }
            for (let i = 0; i < 2; ++i) {
                this.children.push(new Branch(childAttribs));
            }
        }
    }

    /**
     * Draws the branch and its children onto the canvas.
     * @param p p5 instance.
     */
    draw(p: p5): void {
        // Save position and color.
        p.push();

        // Apply translation to root branch.
        if (this.initialTranslation)
            p.translate(this.initialTranslation);

        // Draw current branch.
        p.noStroke();
        let color: Color;
        if (this.attribs.altColor && this.attribs.minLengthAltColor
            && this.attribs.length <= this.attribs.minLengthAltColor) {
            color = this.attribs.altColor
        } else {
            color = this.attribs.color;
        }
        p.fill(color.red, color.blue, color.green, color.alpha);
        p.cylinder(this.attribs.radius, this.attribs.length);

        // Draw children.
        if (this.children.length > 1) {
            let translationModifier = (this.attribs.length + this.attribs.radius) / 4;

            // Update y-coordinate.
            p.push();
            p.translate(0, -this.attribs.length + translationModifier);

            // Update x-coordinate and draw next branch.
            p.push();
            p.translate(translationModifier, 0);
            if (this.attribs.angleDeviation) {
                p.rotate(this.attribs.angleDeviation);
            }
            this.children[0].draw(p);
            p.pop();

            // Update x-coordinate and draw alternate branch.
            p.push();
            p.translate(-translationModifier, 0);
            if (this.attribs.angleDeviation) {
                p.rotate(-this.attribs.angleDeviation);
            }
            this.children[1].draw(p);
            p.pop();

            // Restore y-coordinate.
            p.pop();
        }

        // Restore position and color.
        p.pop();
    }
}