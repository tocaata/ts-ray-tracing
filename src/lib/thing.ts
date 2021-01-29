import Ray from './ray';
import Color from './color';
import {plus, Point, Vector, vectorLength} from './vector';

export default interface Thing {
    isLight: boolean;
    color: Color;

    hit(ray: Ray): {
        isHit: boolean,
        dist: number,
        hitPoint: Point | null
    };

    traceLine(ray: Ray, crossPoint: Point): Ray[];
}
