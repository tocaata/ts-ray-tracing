import World from '../lib/world';
import things from '../lib/things';
import Color from './color';

const canvasWidth = 1280 * 2, canvasHeight = 720 * 2;

export default class RayTracing {
    world = null;

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

        for (let z = rowFrom; z < rowTo; z++) {
            for (let x = 0; x < this.world.imageWidth; x++) {
                const colors = [];
                for (let rand = 0; rand < 5; rand++) {
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
