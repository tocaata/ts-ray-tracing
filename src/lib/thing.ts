import Ray from './ray';
import Color from './color';
import {add, Point, Vector, vectorLength} from './vector';

export default interface Thing {
    isLight: boolean;
    color: Color;

    hit(ray: Ray): {
        isHit: boolean,
        dist: number,
        hitPoint: Point | null
    };

    traceLine(ray: Ray, hitPoint: Point): Ray;
}
