import RayWorker from './ray-tracing.worker';

const canvasWidth = 1280 * 2, canvasHeight = 720 * 2;

export default class MainJob {
    threadCount = 8;
    imageHeight = canvasHeight;
    imageWidth = canvasWidth;
    rayWorkers = [];

    constructor() {
        for (let i = 0; i < this.threadCount; i++) {
            this.rayWorkers.push(new RayWorker());
        }
    }

    cleanWorkers() {
        const closeTasks = [];
        for (let i = this.rayWorkers.length - 1; i >= 0; i--) {
            const worker = this.rayWorkers[i];
            closeTasks.push(worker.close());
        }

        return Promise.all(closeTasks);
    }

    async renderWorld() {
        const tasks = [];

        for (let thread = this.threadCount - 1; thread >= 0; thread--) {
            const from = thread * this.imageHeight / this.threadCount;
            const to = (thread + 1) * this.imageHeight / this.threadCount;

            const worker = this.rayWorkers[thread];
            const rayTask = await new (worker.RayTracing)();
            tasks.push(rayTask.renderRow(from, to < this.imageHeight ? to : this.imageHeight));
        }

        return Promise.all(tasks).then((values) => [].concat(...values));
    }
}
