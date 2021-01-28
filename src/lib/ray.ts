import Color from './color';
import {normalVector, Vector, Point} from './vector';

export default class Ray {
    point: Point;
    vector: Vector;
    color: Color;

    constructor(startPoint: Point, vector: Vector, color: Color) {
        this.point = startPoint;
        this.vector = normalVector(vector);
        this.color = color;
    }
}
