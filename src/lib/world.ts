import Ray from './ray';
import Thing from './thing';
import Color from './color';
import Camera from './camera';
import {Point} from './vector';
// @ts-ignore
import * as Parallel from 'paralleljs';

// const Parallel: any = require('paralleljs')

const SKY_COLOR = Color.multiply(new Color(0.5, 0.7, 1.0, 1.0), 1);
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
    threadCount: number;

    constructor({things, background, imageWidth, imageHeight}: WorldParams) {
        this.things = things || [];
        this.background = background || new Color(0.7, 0.7, 0.7, 1);
        this.camera = new Camera({aspectRatio: imageWidth / imageHeight});
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
        this.maxJump = 4;
        this.threadCount = 6;
    }

    add(type: string, ...items: Thing[]): void {
        this.things.push(...items);
    }

    findHitThing(ray: Ray, prevThing: Thing | null): {hitThing: Thing | null, hitPoint: Point | null} {
        let hitDistance: number = Number.MAX_VALUE;
        let hitPoint: Point | null = null;
        let hitThing: Thing | null = null;

        // Get the ray hit object.
        for (let thing of this.things) {
            if (thing === prevThing) {
                continue;
            }
            const {isHit, dist, hitPoint: hitP}: {isHit: boolean, dist: number, hitPoint: Point | null} = thing.hit(ray);
            if (isHit && dist < hitDistance) {
                hitDistance = dist;
                hitPoint = hitP;
                hitThing = thing;
            }
        }

        return {hitThing, hitPoint};
    }

    tracePixel(row: number, col: number): Color {
        const u = col / (this.imageWidth - 1);
        const v = row / (this.imageHeight - 1);
        let colorMask: Color = new Color(1,1, 1, 1);
        let jump: number = 0;

        let prevThing: Thing | null = null;
        let ray: Ray = this.camera.getRay(u, v);
        let hitThing: Thing | null = null;
        let hitPoint: Point | null = null;

        do {
            const hitObj = this.findHitThing(ray, prevThing);
            hitThing = hitObj.hitThing;
            hitPoint = hitObj.hitPoint;
            prevThing = hitThing;

            if (hitThing && hitPoint) {
                if (hitThing.isLight) {
                    break;
                } else {
                    jump++;
                    colorMask = colorMask.mask(hitThing.color);
                    ray = hitThing.traceLine(ray, hitPoint);
                }
            }
        } while(ray && jump < this.maxJump && hitThing);

        if (jump >= this.maxJump || hitThing === null) {
            const h = ray.vector.z;
            const colorSum = Color.add(Color.multiply(SKY_COLOR, h), Color.multiply(LAND_COLOR, 1 - h));
            const airColor: Color = new Color(colorSum.r, colorSum.g, colorSum.b, 1);
            return colorMask.mask(airColor);
        } else {
            // hit thing is light
            return colorMask.mask(hitThing.color);
        }
    }

    renderWithThread() {
        let count: number = 0;
        const startTime: Date = new Date();

        const taskData: {from: number, to: number}[] = [];
        for (let thread = 0; thread < this.threadCount; thread++) {
            const from: number = thread * this.imageHeight / this.threadCount;
            const to: number = (thread + 1) * this.imageHeight / this.threadCount;
            taskData.push({from, to: to < this.imageHeight ? to : this.imageHeight});
        }

        const task = new Parallel(taskData);

        task.map((scope: any) => {
            return World.renderTask(this, scope.from, scope.to);
        }).then((data: any[]) => {
            console.log(data.length);
        });
    }

    render() {
        const imageData: number[] = [];

        let count: number = 0;
        const startTime: Date = new Date();
        for (let z = this.imageHeight - 1; z >= 0; z--) {
            for (let x = 0; x < this.imageWidth; x++) {
                const colors: Color[] = [];
                for (let rand = 0; rand < 20; rand++) {
                    const row = z + Math.random() - 0.5;
                    const col = x + Math.random() - 0.5;
                    const tempColor = this.tracePixel(row, col);
                    colors.push(tempColor);
                    // imageData.push(...pixelColor.toImageData());
                }

                const pixelColor = Color.average(...colors);
                imageData.push(...pixelColor.toImageData());
                // const pixelColor = this.tracePixel(z, x);
                // imageData.push(...pixelColor.toImageData());
            }
        }
        console.log(count, `Spend Time: ${(new Date().valueOf() - startTime.valueOf()) / 1000}s`);

        return imageData;
    }

    static renderTask(world: World, rowFrom: number, rowTo: number) {
        const imageData: number[] = [];

        for (let z = rowFrom; z < rowTo; z++) {
            for (let x = 0; x < world.imageWidth; x++) {
                const colors: Color[] = [];
                for (let rand = 0; rand < 5; rand++) {
                    const row = z + Math.random() - 0.5;
                    const col = x + Math.random() - 0.5;
                    const tempColor = world.tracePixel(row, col);
                    colors.push(tempColor);
                }

                const pixelColor = Color.average(...colors);
                imageData.push(...pixelColor.toImageData());
            }
        }
        return imageData;
    }
}
