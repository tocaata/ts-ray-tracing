import React from 'react';
import World from '../../lib/world';
import things from '../../lib/things';
import Panel from '../../components/panel';
import MainJob from '../../lib/main';

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
        // this.world = new World({
        //     things: [],
        //     imageWidth: canvasWidth,
        //     imageHeight: canvasHeight
        // });

        const main = new MainJob();
        const startTime = new Date();
        main.renderWorld().then((colorData) => {
            const size = imgData.data.length;
            for (let i = 0; i < size; i++) {
                imgData.data[i] = colorData[i];
            }
            ctx.putImageData(imgData, 0, 0);
            console.log(`Spend Time: ${(new Date().valueOf() - startTime.valueOf()) / 1000}s`);
        });

        // this.space.add('things', ...things.room);
        // this.world.add('things', ...things.thing);
        // this.world.add('things', ...things.ball);
        // this.world.add('things', ...things.light);
        // const colorData = this.world.render();
        // console.log(imgData.data.length, colorData.length);
        // for (let i = 0; i < imgData.data.length; i++) {
        //     imgData.data[i] = colorData[i];
        // }
        // ctx.putImageData(imgData, 0, 0);

        // this.world.renderWithThread(); //.then((colorData) => {
        //     console.log(imgData.data.length, colorData.length);
        //     for (let i = 0; i < imgData.data.length; i++) {
        //         imgData.data[i] = colorData[i];
        //     }
        //     ctx.putImageData(imgData, 0, 0);
        // });
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
