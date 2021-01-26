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
}
