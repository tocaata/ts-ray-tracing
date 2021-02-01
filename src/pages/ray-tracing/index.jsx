import React from 'react';
import MainJob from '../../lib/main';
import Panel from '../../components/panel';

const canvasWidth = 1280 * 2, canvasHeight = 720 * 2;

export default class RayTracing extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = null;
        this.world = null;
        this.state = {};
    }

    componentDidMount() {
        const ctx = this.canvas.getContext('2d');
        const imgData = ctx.createImageData(canvasWidth, canvasHeight);

        const main = new MainJob();
        const startTime = new Date();
        main.renderWorld().then((colorData) => {
            const size = imgData.data.length;
            for (let i = 0; i < size; i++) {
                imgData.data[i] = colorData[i];
            }
            ctx.putImageData(imgData, 0, 0);
            console.log(`Spend Time: ${(new Date().valueOf() - startTime.valueOf()) / 1000}s`);
            main.cleanWorkers().then(() => console.log('all workers are closed.'));
        });
    }

    render() {
        return (
            <div>
                <canvas
                    style={{width: canvasWidth / 2, height: canvasHeight / 2}}
                    ref={ref => this.canvas = ref} width={canvasWidth} height={canvasHeight}
                />
                <Panel />
            </div>
        );
    }
}
