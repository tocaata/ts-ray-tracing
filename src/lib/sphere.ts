import Thing from './thing';
import {
    Vector, Point,
    dot, toVector, subtract,
    vectorLength, multiply, add, normalize
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

    hit(ray: Ray) {
        const {point: p, vector: v} = ray;
        const vpc = toVector(this.center, p);

        const a = dot(v, v), b = 2 * dot(vpc, v), c = dot(vpc, vpc) - this.radius * this.radius;
        const d = b * b - 4 * a * c;
        if (d > 0) {
            const sqrtD = Math.sqrt(d);
            const n1 = (-b + sqrtD) / a / 2, n2 = (-b - sqrtD) / a / 2;
            let n: number;
            if (n1 * n2 < 0) {
                n = n1 > 0 ? n1 : n2;
            } else if (n1 > 0 && n2 > 0) {
                n = n1 < n2 ? n1 : n2;
            } else {
                return {isHit: false, dist: 0, hitPoint: null};
            }
            const addV = multiply(v, n);

            return {
                isHit: true,
                dist: vectorLength(addV),
                hitPoint: add(p, addV)
            };
        } else {
            return {
                isHit: false,
                dist: 0,
                hitPoint: null
            };
        }
    }

    traceLine(ray: Ray, crossPoint: Point) {
        const vcc = normalize(toVector(this.center, crossPoint));
        const len = dot(ray.vector, vcc);
        const projectV = multiply(vcc, len * 2);
        const assistV = subtract(ray.vector, projectV);
        return [new Ray(crossPoint, assistV, this.color)];
    }
}
