import { Branch } from "./branch";
import Drawable from "./drawable";

import p5, { Vector } from "p5";

/**
 * Canvas handler.
 */
export default class Sketch {
    /** Objects to be drawn on the canvas. */
    objects: Drawable[];

    /**
     * Sets the setup() and draw() methods on a p5 instance.
     * @param p p5 instance.
     */
    constructor(p: p5) {
        p.setup = () => this.setup(p);
        p.draw = () => this.draw(p);
    }

    /**
     * Called once in the initialization of the canvas by the p5 instance to
     * define initial environment properties and load any required resources.
     * @param p p5 instance.
     */
    private setup(p: p5): void {
        p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
        window.onresize = () => this.onresize(p);
        this.createObjects(p);
    }

    /**
     * Creates drawable objects.
     * @param p p5 instance.
     */
    private createObjects(p: p5): void {
        this.objects = [];
        // Draw trees.
        let translations: Vector[] = [];
        for (let i = 0; i < 20;) {
            let trunkHeight = 100 + (Math.random() * 200);
            let baseTranslateZ = 100 + (Math.random() * p.height * 8);
            let translation = new Vector(
                (Math.random() - 0.5) * p.width * 2,
                (p.height / 2) - (trunkHeight / 2),
                -baseTranslateZ
            );
            if (translations.indexOf(translation) != -1)
                break;

            this.objects.push(new Branch({
                radius: 2 + (Math.random() * 4),
                length: trunkHeight,
                minLength: 4 + (baseTranslateZ * 0.005),
                color: { red: 255, green: 255, blue: 255 },
                altColor: { red: 0, green: 255, blue: 255 },
                minLengthAltColor: 10 + (Math.random() * 70),
                angleDeviation: p.PI / (3 + (Math.random() * 8)),
                lengthMultiplier: 2 / 3,
                radiusMultiplier: 2 / 3
            }, translation));

            ++i;
        }
    }

    /**
     * Called directly after setup to handle drawing to the canvas. The contents
     * of the function are continuously executed until the program is stopped or
     * p5.noLoop() is called.
     * @param p p5 instance.
     */
    private draw(p: p5): void {
        // Set background to black.
        p.background(0);

        // Configure 3D controls.
        p.orbitControl(5, 5, 0.05);

        // Draw objects.
        this.objects.forEach(function (object, _index, _array): void {
            object.draw(p);
        });
    }

    /**
     * Called upon resize of the window. Resizes the canvas to the current
     * window size and recreates objects.
     * @param p p5 instance.
     */
    private onresize(p: p5): void {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
        this.createObjects(p);
    }
}