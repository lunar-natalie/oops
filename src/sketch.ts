import { Axis } from "./axis";
import { Branch } from "./branch";
import { Ground } from "./ground";
import { LinearGradient, LinearGradientAttributes } from "./gradient";
import Drawable from "./drawable";

import p5, { Vector } from "p5";

/**
 * Canvas handler.
 */
export default class Sketch {
    /** Pre-configured objects to be drawn on the canvas. */
    objects: Drawable[];

    minTreeZ = 200;
    maxTreeZOffset: number;
    backgroundColorValue = "#644063";

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
        this.maxTreeZOffset = p.height * 6;
        this.createObjects(p);
    }

    /**
     * (Re)creates drawable objects.
     * @param p p5 instance.
     */
    private createObjects(p: p5): void {
        this.objects = [];

        // TODO(Natalie): Ground.
        // TODO(Natalie): Base ground dimensions on tree positioning.
        let groundWidthDepth = 2 * (this.minTreeZ + this.maxTreeZOffset);
        let groundLength = 100;
        this.objects.push(new Ground({
            colorAttribs: { red: 10, green: 50, blue: 10 },
            translation: new Vector(
                -p.width,
                p.height / 2
            ),
            width: groundWidthDepth,
            length: groundLength,
            depth: groundWidthDepth
        }));

        // TODO(Natalie): Skybox.
        let skyboxWidth = 2 * (this.minTreeZ + this.maxTreeZOffset);
        let skyboxAttribs: LinearGradientAttributes = {
            startX: 0,
            startY: 0,
            width: skyboxWidth,
            height: this.maxTreeZOffset / 2,
            colorFrom: p.color(this.backgroundColorValue),
            colorTo: p.color("#000000"),
            axis: Axis.Y
        }
        this.objects.push(new LinearGradient(skyboxAttribs,
            new Vector(
                -0,
                -1500,
                -this.minTreeZ - this.maxTreeZOffset
            ))
        )

        // Trees.
        // TODO(Natalie): Extend drawing to left and right of the initial camera.
        let translations: Vector[] = [];
        for (let orientZ = 1; orientZ >= -1; orientZ -= 2) {
            for (let orientX = 1; orientX >= -1; orientX -= 2) {
                for (let i = 0; i < 10;) {
                    let trunkHeight =
                        100 + (Math.random() * 200);
                    let baseTranslateZ =
                        200 + (Math.random() * this.maxTreeZOffset);

                    let translation = new Vector(
                        orientX * ((Math.random() - 0.5) * p.width * 2),
                        (p.height / 2) - (trunkHeight / 2),
                        orientZ * baseTranslateZ
                    );

                    if (translations.indexOf(translation) != -1)
                        continue;
                    translations.push(translation);

                    this.objects.push(new Branch({
                        radius: 4 + (Math.random() * 2),
                        length: trunkHeight,
                        minLength: 4 + (baseTranslateZ * 0.01),
                        colorAttribs: { red: 200, green: 200, blue: 200 },
                        altColorAttribs: {
                            red: 200 + Math.random() * 55,
                            green: 0,
                            blue: 200 + Math.random() * 55
                        },
                        minLengthAltColor: 10 + (Math.random() * 70),
                        angleDeviation: p.PI / (3 + (Math.random() * 8)),
                        lengthMultiplier: 2 / 3,
                        radiusMultiplier: 2 / 3
                    }, translation));

                    ++i;
                }
            }
        }
    }

    /**
     * Called directly after setup to handle drawing to the canvas. The contents
     * of the function are continuously executed until the program is stopped or
     * p5.noLoop() is called.
     * @param p p5 instance.
     */
    private draw(p: p5): void {
        p.background(this.backgroundColorValue);

        // Configure 3D controls.
        p.orbitControl(5, 5, 0.05);

        // Draw pre-configured objects.
        this.objects.forEach(function (object, _index, _array): void {
            object.draw(p);
        });

        // TODO(Natalie): Animated clouds.
        // TODO(Natalie): Lighting.
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