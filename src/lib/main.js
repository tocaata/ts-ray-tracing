import Worker from './ray-tracing.worker';

const canvasWidth = 1280 * 2, canvasHeight = 720 * 2;

export default class MainJob {
    threadCount = 6;
    imageHeight = canvasHeight;
    imageWidth = canvasWidth;

    constructor() {
    }

    async renderWorld() {
        const tasks = [];

        for (let thread = 0; thread < this.threadCount; thread++) {
            const from = thread * this.imageHeight / this.threadCount;
            const to = (thread + 1) * this.imageHeight / this.threadCount;
            const worker = await new Worker();
            tasks.push(worker.renderRow(from, to < this.imageHeight ? to : this.imageHeight));
        }

        return Promise.all(tasks).then((values) => [].concat(...values));
    }
}
