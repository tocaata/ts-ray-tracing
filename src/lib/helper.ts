import {dotProduct, Point} from './vector';

export function randomUnitSpherePoint() {
    let p: Point;
    do {
        p = {x: 2 * Math.random() - 1, y: 2 * Math.random() - 1, z: 2 * Math.random() - 1};
    } while(dotProduct(p, p) >= 1);
    return p;
}
