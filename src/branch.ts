import { ColorRGBA } from "./color";
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
    colorAttribs: ColorRGBA;

    /** Color to fill children of a certain length and below with. */
    altColorAttribs?: ColorRGBA;
    minLengthAltColor?: number;

    /**
     * Angle to deviate from the previously drawn branch by, in p5's current
     * angle unit (set by p5.angleMode(), radians by default).
     */
    angleDeviation: number;

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
}

/**
 * Drawable canvas object represented by a cylinder and its children.
 */
export class Branch implements Drawable {
    readonly attribs: BranchAttributes;
    readonly initialTranslation?: Vector;
    readonly children: Branch[];

    // TODO(Natalie): Improve branch placement to prevent overlap and gaps
    // between children outside of a specific range of attributes.
    // TODO(Natalie): Prevent call stack limit from crashing program
    // (attribute dependent).
    // TODO(Natalie): Add option to draw branches on multiple axes.
    // TODO(Natalie): Improve performance.

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
     * Draws the branch and its children onto the canvas. Preserves drawing
     * configuration and transformations.
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
        let colorAttribs: ColorRGBA;
        if (this.attribs.altColorAttribs && this.attribs.minLengthAltColor
            && this.attribs.length <= this.attribs.minLengthAltColor) {
            colorAttribs = this.attribs.altColorAttribs
        } else {
            colorAttribs = this.attribs.colorAttribs;
        }
        p.fill(colorAttribs.red, colorAttribs.green, colorAttribs.blue, colorAttribs.alpha);
        p.cylinder(this.attribs.radius, this.attribs.length);

        if (this.children.length > 1) {
            // Draw children.
            this.drawChild(p, 0, this.attribs.angleDeviation);
            this.drawChild(p, 1, -this.attribs.angleDeviation);
        }

        // Restore position and color.
        p.pop();
    }

    /**
     * Draws a child branch. Preserves drawing configuration and
     * transformations.
     * @param p p5 instance.
     * @param index Index of child in the children array.
     * @param angleDeviation Angle to deviate from the previously drawn branch
     * by, in p5's current angle unit (set by p5.angleMode(), radians by
     * default).
     */
    private drawChild(p: p5, index: number, angleDeviation: number): void {
        let xTranslationBase = -(
            (this.attribs.length * this.attribs.lengthMultiplier) / 2);
        p.push();
        p.translate(0, xTranslationBase);
        p.rotateZ(angleDeviation);
        p.translate(0, xTranslationBase);
        this.children[index].draw(p);
        p.pop();
    }
}