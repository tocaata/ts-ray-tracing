import Sphere from './sphere';
import {
    Point, dot, toVector, subtract,
    multiply, plus, normalize
} from './vector';
import {randomUnitSpherePoint} from './helper';
import Color from './color';
import Ray from './ray';

export default class DiffuseSphere extends Sphere {
    diffuse: number;

    constructor(center: Point, radius: number, diffuse: number, color: Color, isLight: boolean) {
        super(center, radius, color, isLight);
        this.diffuse = diffuse;
    }

    traceLine(ray: Ray, crossPoint: Point) {
        const vCenterToCross = normalize(toVector(this.center, crossPoint));
        const vRandAside = normalize(plus(vCenterToCross, multiply(randomUnitSpherePoint(), this.diffuse)));
        const len = dot(ray.vector, vRandAside);
        const projectV = multiply(vRandAside, len * 2);
        const assistV = subtract(ray.vector, projectV);
        return [new Ray(crossPoint, assistV, this.color)];
    }
}
