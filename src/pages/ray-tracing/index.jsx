import React from 'react';
import World from '../../lib/world';
import things from '../../lib/things';
import Panel from '../../components/panel';

const canvasWidth = 1280, canvasHeight = 720;

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
        this.world = new World({
            things: [],
            imageWidth: canvasWidth,
            imageHeight: canvasHeight
        });

        // this.space.add('things', ...things.room);
        this.world.add('things', ...things.thing);
        this.world.add('things', ...things.ball);
        this.world.add('things', ...things.light);
        const colorData = this.world.render();
        console.log(imgData.data.length, colorData.length);
        for (let i = 0; i < imgData.data.length; i++) {
            imgData.data[i] = colorData[i];
        }
        ctx.putImageData(imgData, 0, 0);
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
