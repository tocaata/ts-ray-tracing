import Ray from './ray';
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
import {randomUnitSpherePoint} from './helper';
import Triangle from './triangle';
import Color from './color';

export default class DiffuseTriangle extends Triangle {
    diffUse: number;

    constructor(pointA: Point, pointB: Point, pointC: Point, diffUse: number, color: Color, isLight: boolean) {
        super(pointA, pointB, pointC, color, isLight);
        this.diffUse = diffUse;
    }

    traceLine(ray: Ray, crossPoint: Point) {
        const {a, b, c} = this.plane;
        const vCenterToCross = normalize({x: a, y: b, z: c});
        const diffuseVcc = normalize(plus(vCenterToCross, multiply(randomUnitSpherePoint(), this.diffUse)));
        const len = dot(ray.vector, diffuseVcc);
        const projectV = multiply(diffuseVcc, len);
        const assistV = subtract(ray.vector, multiply(projectV, 2));
        return [new Ray(crossPoint, assistV, this.color)];
    }
}
