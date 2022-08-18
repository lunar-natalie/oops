import p5 from 'p5';

const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        window.onresize = (ev: UIEvent) => {
            p.resizeCanvas(window.innerWidth, window.innerHeight);
        };
    };

    p.draw = () => {
        p.background('#000000');
    };
};

new p5(sketch);
