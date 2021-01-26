import Ray from './ray';
import Thing from './thing';
import {toVector, crossProduct, dotProduct, normalVector, vectorLength, multiply, subtract, plus} from './vector';

function pInTriangle(p, pa, pb, pc) {
    const v0 = toVector(pa, pc), v1 = toVector(pa, pb), v2 = toVector(pa, p);
    const d0 = dotProduct(v0, v0);
    const d1 = dotProduct(v0, v1);
    const d2 = dotProduct(v0, v2);
    const d3 = dotProduct(v1, v1);
    const d4 = dotProduct(v1, v2);

    const denom = d0 * d3 - d1 * d1;
    const u = (d3 * d2 - d1 * d4) / denom;
    const v = (d0 * d4 - d1 * d2) / denom;

    return u >= 0 && v >= 0 && u + v <= 1
}

export default class Triangle extends Thing {
    constructor(pointA, pointB, pointC, color, isLight) {
        super();
        this.points = [pointA, pointB, pointC];
        this.vectors = [
            normalVector(toVector(pointA, pointB)),
            normalVector(toVector(pointB, pointC)),
            normalVector(toVector(pointC, pointA))
        ];
        this.plane = this.computePlane();
        this.color = color;
        this.isLight = isLight;
    }

    computePlane() {
        const pointA = this.points[0];
        const [v1, v2] = this.vectors;

        const {x: a, y: b, z: c} = normalVector(crossProduct(v1, v2));
        const d = -a * pointA.x - b * pointA.y - c * pointA.z;

        // a*x + b*y + c*z + d = 0
        return {a, b, c, d};
    }

    isCross(ray) {
        if (!(ray instanceof Ray)) {
            throw new Error('light is not a Light');
        }

        const {a, b, c, d} = this.plane;
        const {x: x0, y: y0, z: z0} = ray.point;
        const {x: x1, y: y1, z: z1} = ray.vector;
        const mul = -(d + a * x0 + b * y0 + c * z0) / (a * x1 + b * y1 + c * z1);
        if (mul < 0) {
            return {
                isCross: false,
                dist: 0,
                cross: null
            };
        }

        const addV = multiply(ray.vector, mul);
        const cross = plus(ray.point, addV);
        const distance = vectorLength(addV);
        const [p0, p1, p2] = this.points;

        return {
            isCross: pInTriangle(cross, p0, p1, p2),
            dist: distance,
            cross
        };
    }

    traceLine(ray, crossPoint) {
        if (!(ray instanceof Ray)) {
            throw new Error('light is not x1 Light');
        }
        const {a, b, c} = this.plane;
        const vcc = normalVector({x: a, y: b, z: c});
        const len = dotProduct(ray.vector, vcc);
        const projectV = multiply(vcc, len);
        const assistV = subtract(ray.vector, multiply(projectV, 2));
        return [new Ray(crossPoint, assistV, this.color)];
    }
}
