import {normalVector} from './vector';

export default class Ray {
    constructor(startPoint, vector, color) {
        this.point = startPoint;
        this.vector = normalVector(vector);
        this.color = color;
    }
}
