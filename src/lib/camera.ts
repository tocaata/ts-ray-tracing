import Ray from './ray';
import {Point, Vector} from './vector';

export default class Camera {
    origin: Point;
    leftBottomCorner: Point;
    horizontalUnit: Vector;
    verticalUnit: Vector;

    constructor(origin: Point, leftBottomCorner: Point, horizontalUnit: Vector, verticalUnit: Vector) {
        this.origin = origin;
        this.leftBottomCorner = leftBottomCorner;
        this.horizontalUnit = horizontalUnit;
        this.verticalUnit = verticalUnit;
    }

    getRay() {
        // return new Ray(this.origin, );
    }
}
