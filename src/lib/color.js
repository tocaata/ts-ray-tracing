export default class Color {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    mask(m) {
        return new Color(this.r * m.r, this.g * m.g, this.b * m.b, this.a * m.a);
    }

    toImageData() {
        return [Math.round(this.r * 255), Math.round(this.g * 255), Math.round(this.b * 255), Math.round(this.a * 255)];
    }
}
