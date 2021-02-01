import Color from './color';
import World from '../lib/world';
import things from '../lib/things';

const canvasWidth = 1280 * 2, canvasHeight = 720 * 2;

export class RayTracing {
    constructor() {
        this.world = new World({
            things: [],
            imageWidth: canvasWidth,
            imageHeight: canvasHeight
        });

        this.world.add('things', ...things.thing);
        this.world.add('things', ...things.ball);
        this.world.add('things', ...things.light);
    }

    async renderRow(rowFrom, rowTo) {
        const imageData = [];

        for (let z = rowTo - 1; z >= rowFrom; z--) {
            for (let x = 0; x < this.world.imageWidth; x++) {
                const colors = [];
                for (let rand = 0; rand < 20; rand++) {
                    const row = z + Math.random() - 0.5;
                    const col = x + Math.random() - 0.5;
                    const tempColor = this.world.tracePixel(row, col);
                    colors.push(tempColor);
                }

                const pixelColor = Color.average(...colors);
                imageData.push(...pixelColor.toImageData());
            }
        }

        return imageData;
    }
}

export function close() {
    // eslint-disable-next-line no-restricted-globals
    return self.close();
}
