import Ray from './ray';
import Thing from './thing';
import Color from './color';
import Camera from './camera';
import {toVector, Point, Vector} from './vector';

const SKY_COLOR = Color.multiply(new Color(0.5, 0.7, 1.0, 1.0), 0.6);
const LAND_COLOR = new Color(1,1, 1, 1);

interface WorldParams {
    things: Thing[];
    background: Color;
    imageWidth: number;
    imageHeight: number;
}

export default class World {
    things: Thing[];
    background: Color;
    camera: Camera;
    imageWidth: number;
    imageHeight: number;
    maxJump: number;

    constructor({things, background, imageWidth, imageHeight}: WorldParams) {
        this.things = things || [];
        this.background = background || new Color(0.7, 0.7, 0.7, 1);
        this.camera = new Camera({aspectRatio: imageWidth / imageHeight});
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
        this.maxJump = 5;
    }

    add(type: string, ...items: Thing[]): void {
        this.things.push(...items);
    }

    render() {
        const maxJump: number = this.maxJump;
        const imageData: number[] = [];

        let count: number = 0;
        const startTime: Date = new Date();
        for (let z = this.imageHeight - 1; z >= 0; z--) {
            for (let x = 0; x < this.imageWidth; x++) {
                const u = x / (this.imageWidth - 1);
                const v = z / (this.imageHeight - 1);
                const rays: Ray[] = [this.camera.getRay(u, v)];
                let colorMask: Color = new Color(1,1, 1, 1);
                let jump: number = 0;
                count ++;

                let lastThing: Thing | null = null;
                while(rays.length > 0 && jump < maxJump) {
                    const ray: Ray = <Ray>rays.pop();
                    let hitDistance: number = Number.MAX_VALUE;
                    let hitCross: Vector | null = null;
                    let hitThing: Thing | null = null;
                    for (let thing of this.things) {
                        if (thing === lastThing) {
                            continue;
                        }
                        const {isHit, dist, hitPoint}: {isHit: boolean, dist: number, hitPoint: Point | null} = thing.hit(ray);
                        if (isHit && dist < hitDistance) {
                            hitDistance = dist;
                            hitCross = hitPoint;
                            hitThing = thing;
                        }
                    }

                    // jump !== 0 && shortT == null && console.log(shortT);

                    // if (jump === 1 && shortT == null) {
                    //     console.log(jump);
                    // }
                    //
                    // if (count % 1000 === 0) {
                    //     console.log(jump);
                    // }
                    //
                    // if (jump === 2 && shortT == null) {
                    //     console.log(shortT);
                    // }

                    lastThing = hitThing;
                    if (hitThing && hitCross && hitThing) {
                        if (hitThing.isLight) {
                            // if (jump !== 0 && jump !== 5) {
                            //     console.log('isLight');
                            // }
                            const tempColor = colorMask.mask(hitThing.color);
                            imageData.push(...tempColor.toImageData());
                            break;
                        } else {
                            jump++;
                            colorMask = colorMask.mask(hitThing.color);
                            rays.push(...hitThing.traceLine(ray, hitCross));
                            // if (count % 500 === 0) {
                            //     console.log(lights.length);
                            // }
                            if (jump >= this.maxJump) {
                                const h = ray.vector.z;
                                const airColor = Color.add(Color.multiply(SKY_COLOR, h), Color.multiply(LAND_COLOR, 1 - h));

                                imageData.push(...colorMask.mask(airColor).toImageData());
                            }
                        }
                    } else {
                        // no hit thing
                        const h = ray.vector.z;
                        const airColor = Color.add(Color.multiply(SKY_COLOR, h), Color.multiply(LAND_COLOR, 1 - h));
                        imageData.push(...colorMask.mask(airColor).toImageData());
                        break;
                    }
                }
                // if (jump !== 5 && jump !== 1) {
                //     console.log('jump', jump);
                // }
            }
        }
        console.log(count, `Spend Time: ${(new Date().valueOf() - startTime.valueOf()) / 1000}s`);

        return imageData;
    }
}
