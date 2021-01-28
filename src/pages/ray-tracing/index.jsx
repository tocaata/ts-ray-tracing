import React from 'react';
import Space from '../../lib/space';
import things from '../../lib/things';
import Panel from '../../components/panel';

export default class RayTracing extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = null;
        this.space = null;
        this.state = {};
    }

    componentDidMount() {
        const ctx = this.canvas.getContext('2d');
        const spaceWidth = 1200, spaceHeight = 1200;
        const imgData = ctx.createImageData(spaceWidth + 1, spaceHeight + 1);
        this.space = new Space({
            screen:[{x: 0, y: 0, z: 0}, {x: spaceWidth, y: 0, z: spaceHeight}],
            things: []
        });

        // this.space.add('things', ...things.room);
        this.space.add('things', ...things.thing);
        this.space.add('things', ...things.ball);
        this.space.add('things', ...things.light);
        const colorData = this.space.render();
        console.log(imgData.data.length, colorData.length);
        for (let i = 0; i < imgData.data.length; i++) {
            imgData.data[i] = colorData[i];
        }
        ctx.putImageData(imgData, 0, 0);
    }

    render() {
        return (
            <div>
                <canvas style={{width: 1000, height: 1000}} ref={ref => this.canvas = ref} width={2000} height={2000} />
                <Panel />
            </div>
        );
    }
}
