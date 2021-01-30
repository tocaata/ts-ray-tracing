import Ray from './ray';
import Color from './color';
import vector, {Point, Vector} from './vector';

interface CameraParams {
    origin?: Point;
    aspectRatio?: number
}

const ZERO_POINT = {x: 0, y: 0, z: 0};
const DEFAULT_ASPECT_RATIO = 16 / 9;
const VIEWPORT_HEIGHT = 36;
const FOCAL_LENGTH = -VIEWPORT_HEIGHT / 2;

export default class Camera {
    origin: Point;
    leftBottomCorner: Point;
    horizontal: Vector;
    vertical: Vector;

    constructor({origin = ZERO_POINT, aspectRatio = DEFAULT_ASPECT_RATIO}: CameraParams) {
        this.origin = origin;
        this.vertical = {x: 0, y: 0, z: VIEWPORT_HEIGHT};
        this.horizontal = {x: aspectRatio * VIEWPORT_HEIGHT, y: 0, z: 0};
        this.leftBottomCorner = vector.subtract(
            this.origin,
            vector.multiply(this.vertical, 0.5),
            vector.multiply(this.horizontal, 0.5),
            {x: 0, y: FOCAL_LENGTH, z: 0}
        );
    }

    getRay(s: number, t: number) {
        const screenPoint = vector.add(
            this.leftBottomCorner,
            vector.multiply(this.horizontal, s),
            vector.multiply(this.vertical, t)
        );
        const directionVector = vector.normalize(vector.toVector(this.origin, screenPoint));
        return new Ray(this.origin, directionVector, new Color(1, 1, 1, 1));
    }
}
