import {plus, Point, Vector, vectorLength} from './vector';
import Ray from './ray';

export default interface Thing {
    isLight: boolean;

    isCross(ray: Ray): {
        isCross: boolean,
        dist: number,
        cross: Vector | null
    };

    traceLine(ray: Ray, crossPoint: Point): Ray[];
}
