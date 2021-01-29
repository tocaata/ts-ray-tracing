import Color from './color';
import {normalize, Vector, Point} from './vector';

export default class Ray {
    point: Point;
    vector: Vector;
    color: Color;

    constructor(startPoint: Point, vector: Vector, color: Color) {
        this.point = startPoint;
        this.vector = normalize(vector);
        this.color = color;
    }
}
