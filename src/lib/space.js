import {toVector} from './vector';
import Ray from './ray';
import Color from './color';

export default class Space {
    constructor({screen, eye, things}) {
        this.things = things || [];
        this.screen = screen || [{x: 0, y: 0, z: 0}, {x: 600, y: 0, z: 600}];
        this.eye = eye || {x: 100, y: -1014, z: 100};
        this.background = new Color(0.7, 0.7, 0.7, 1);
        this.maxJump = 5;
    }

    setScreen(screen) {
        this.screen = screen;
    }

    setEye(eye) {
        this.eye = eye;
    }

    add(type, ...items) {
        if (!['lights', 'things'].includes(type)) {
            console.log('error type');
        }

        this[type].push(...items);
    }

    render() {
        const maxJump = this.maxJump;
        const imageData = [];
        const [{x: x0, z: z0}, {x: x1, z: z1}] = this.screen;
        let count = 0;
        const startTime = new Date();
        for (let z = z1; z >= z0; z-- ) {
            for (let x = x0; x <= x1; x++) {
                const sp = {x, y: 0, z};
                const lights = [new Ray(this.eye, toVector(this.eye, sp), new Color(1, 1, 1, 1))];
                let colorMask = new Color(1,1, 1, 1);
                let jump = 0;
                count ++;

                let lastThing = null;
                while(lights.length > 0 && jump < maxJump) {
                    const l = lights.pop();
                    let shortD = Number.MAX_VALUE, shortC = null, shortT = null;
                    for (let th of this.things) {
                        if (th === lastThing) {
                            continue;
                        }
                        const {isCross, dist, cross} = th.isCross(l);
                        if (isCross && dist < shortD) {
                            shortD = dist;
                            shortC = cross;
                            shortT = th;
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

                    lastThing = shortT;
                    if (shortT) {
                        if (shortT.isLight) {
                            // if (jump !== 0 && jump !== 5) {
                            //     console.log('isLight');
                            // }
                            const tempColor = colorMask.mask(shortT.color);
                            imageData.push(...tempColor.toImageData());
                            break;
                        } else {
                            jump++;
                            colorMask = colorMask.mask(shortT.color);
                            lights.push(...shortT.traceLine(l, shortC));
                            // if (count % 500 === 0) {
                            //     console.log(lights.length);
                            // }
                            if (jump >= this.maxJump) {
                                imageData.push(...colorMask.mask(this.background).toImageData());
                            }
                        }
                    } else {
                        // 黑色点
                        // if (jump !== 0) {
                        //     console.log(jump);
                        // }
                        imageData.push(...colorMask.mask(this.background).toImageData());
                        break;
                    }
                }
                // if (jump !== 5 && jump !== 1) {
                //     console.log('jump', jump);
                // }
            }
        }
        console.log(count, `Spend Time: ${(new Date() - startTime) / 1000}s`);

        return imageData;
    }
}
