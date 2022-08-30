import Sketch from "./sketch";

import p5 from "p5";

// Start sketch.
new p5(function (p: p5): Sketch {
    return new Sketch(p);
});