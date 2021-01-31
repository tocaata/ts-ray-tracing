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
        this.r *= m.r;
        this.g *= m.g;
        this.b *= m.b;
        return this;
    }

    toImageData(): number[] {
        return [Math.round(this.r * 255), Math.round(this.g * 255), Math.round(this.b * 255), Math.round(this.a * 255)];
    }

    static multiply(c: Color, multiplier: number): Color {
        return new Color(c.r * multiplier, c.g * multiplier, c.a * multiplier, c.a);
    }

    static add(...colors: Color[]): {r: number, g: number, b: number} {
        const sumColor = {r: 0, g: 0, b: 0};
        for (let color of colors) {
            sumColor.r += color.r;
            sumColor.g += color.g;
            sumColor.b += color.b;
        }
        return sumColor;
    }

    static average(...colors: Color[]): Color {
        const len = colors.length;
        const sumColor: {r: number, g: number, b: number} = Color.add(...colors);
        return new Color(sumColor.r / len, sumColor.g / len, sumColor.b / len, 1);
    }
}
