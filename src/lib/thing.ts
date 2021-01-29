import Ray from './ray';
import Color from './color';
import {plus, Point, Vector, vectorLength} from './vector';

export default interface Thing {
    isLight: boolean;
    color: Color;

    isCross(ray: Ray): {
        isCross: boolean,
        dist: number,
        cross: Point | null
    };

    traceLine(ray: Ray, crossPoint: Point): Ray[];
}
