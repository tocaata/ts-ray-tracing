export default class Color {
    r: number;
    g: number;
    b: number;
    a: number;

    constructor(r: number, g: number, b: number, a: number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    mask(m: Color): Color {
        return new Color(this.r * m.r, this.g * m.g, this.b * m.b, this.a * m.a);
    }

    toImageData(): number[] {
        return [Math.round(this.r * 255), Math.round(this.g * 255), Math.round(this.b * 255), Math.round(this.a * 255)];
    }

    static multiply(c: Color, multiplier: number): Color {
        return new Color(c.r * multiplier, c.g * multiplier, c.a * multiplier, c.a);
    }

    static add(c1: Color, c2: Color): Color {
        return new Color(c1.r + c2.r, c1.g + c2.g, c1.b + c2.b, 1);
    }
}
