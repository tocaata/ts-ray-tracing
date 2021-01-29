import Ray from './ray';
import Thing from './thing';
import {
    Point,
    toVector,
    cross,
    dot,
    normalize,
    vectorLength,
    multiply,
    subtract,
    plus,
    Vector
} from './vector';
import Color from "./color";

function pInTriangle(p: Point, pa: Point, pb: Point, pc: Point) {
    const v0 = toVector(pa, pc), v1 = toVector(pa, pb), v2 = toVector(pa, p);
    const d0 = dot(v0, v0);
    const d1 = dot(v0, v1);
    const d2 = dot(v0, v2);
    const d3 = dot(v1, v1);
    const d4 = dot(v1, v2);

    const denom = d0 * d3 - d1 * d1;
    const u = (d3 * d2 - d1 * d4) / denom;
    const v = (d0 * d4 - d1 * d2) / denom;

    return u >= 0 && v >= 0 && u + v <= 1
}

export default class Triangle implements Thing {
    points: [Point, Point, Point];
    vectors: [Vector, Vector, Vector];
    plane: {a: number, b: number, c: number, d: number};
    color: Color;
    isLight: boolean;

    constructor(pointA: Point, pointB: Point, pointC: Point, color: Color, isLight: boolean) {
        this.points = [pointA, pointB, pointC];
        this.vectors = [
            normalize(toVector(pointA, pointB)),
            normalize(toVector(pointB, pointC)),
            normalize(toVector(pointC, pointA))
        ];
        this.plane = this.computePlane();
        this.color = color;
        this.isLight = isLight;
    }

    computePlane(): {a: number, b: number, c: number, d: number} {
        const pointA = this.points[0];
        const [v1, v2] = this.vectors;

        const {x: a, y: b, z: c} = normalize(cross(v1, v2));
        const d = -a * pointA.x - b * pointA.y - c * pointA.z;

        // a*x + b*y + c*z + d = 0
        return {a, b, c, d};
    }

    hit(ray: Ray) {
        const {a, b, c, d} = this.plane;
        const {x: x0, y: y0, z: z0} = ray.point;
        const {x: x1, y: y1, z: z1} = ray.vector;
        const mul = -(d + a * x0 + b * y0 + c * z0) / (a * x1 + b * y1 + c * z1);
        if (mul < 0) {
            return {
                isHit: false,
                dist: 0,
                hitPoint: null
            };
        }

        const addV = multiply(ray.vector, mul);
        const hitPoint = plus(ray.point, addV);
        const distance = vectorLength(addV);
        const [p0, p1, p2] = this.points;

        return {
            isHit: pInTriangle(hitPoint, p0, p1, p2),
            dist: distance,
            hitPoint
        };
    }

    traceLine(ray: Ray, crossPoint: Point) {
        const {a, b, c} = this.plane;
        const vcc = normalize({x: a, y: b, z: c});
        const len = dot(ray.vector, vcc);
        const projectV = multiply(vcc, len);
        const assistV = subtract(ray.vector, multiply(projectV, 2));
        return [new Ray(crossPoint, assistV, this.color)];
    }
}
