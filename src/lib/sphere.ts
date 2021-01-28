import Thing from './thing';
import {
    Vector, Point,
    dotProduct, toVector, subtract,
    vectorLength, multiply, plus, normalVector
} from './vector';
import Color from './color';
import Ray from './ray';

export default class Sphere implements Thing {
    center: Point;
    radius: number;
    color: Color;
    isLight: boolean;

    constructor(center: Point, radius: number, color: Color, isLight: boolean) {
        this.center = center;
        this.radius = radius;
        this.color = color;
        this.isLight = isLight;
    }

    isCross(ray: Ray) {
        const {point: p, vector: v} = ray;
        const vpc = toVector(this.center, p);

        const a = dotProduct(v, v), b = 2 * dotProduct(vpc, v), c = dotProduct(vpc, vpc) - this.radius * this.radius;
        const d = b * b - 4 * a * c;
        if (d > 0) {
            const sqrtD = Math.sqrt(d);
            const n1 = (-b + sqrtD) / a / 2, n2 = (-b - sqrtD) / a / 2;
            let n;
            if (n1 * n2 < 0) {
                n = n1 > 0 ? n1 : n2;
            } else if (n1 > 0 && n2 > 0) {
                n = n1 < n2 ? n1 : n2;
            } else {
                return {isCross: false, dist: 0, cross: null};
            }
            const addV = multiply(v, n);

            return {
                isCross: true,
                dist: vectorLength(addV),
                cross: plus(p, addV)
            };
        } else {
            return {
                isCross: false,
                dist: 0,
                cross: null
            };
        }
    }

    traceLine(ray: Ray, crossPoint: Point) {
        const vcc = normalVector(toVector(this.center, crossPoint));
        const len = dotProduct(ray.vector, vcc);
        const projectV = multiply(vcc, len * 2);
        const assistV = subtract(ray.vector, projectV);
        return [new Ray(crossPoint, assistV, this.color)];
    }
}
