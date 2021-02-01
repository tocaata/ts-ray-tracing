import DiffuseSphere from './diffuse-sphere';
// import DiffuseTriangle from './diffuse-triangle';
import Triangle from './triangle';
import Sphere from './sphere';
import Color from './color';

const things = {
    room: [
        // new Triangle(
        //     {x: 6000, y: 6000, z: 0},
        //     {x: 6000, y: 6000, z: 6000},
        //     {x: 0, y: 6000, z: 0},
        //     new Color(0.9, 0.9, 0.9, 1),
        //     false
        // ),
        // new Triangle(
        //     {x: 0, y: 6000, z: 6000},
        //     {x: 6000, y: 6000, z: 6001},
        //     {x: -1, y: 6000, z: 0},
        //     new Color(0.9, 0.9, 0.9, 1),
        //     false
        // ),
        // new Triangle(
        //     {x: 6000, y: 6000, z: 0},
        //     {x: 6000, y: 6000, z: 6000},
        //     {x: 6000, y: 0, z: 0},
        //     new Color(0.9, 0.9, 0.9, 1),
        //     false
        // ),
        // new Triangle(
        //     {x: 6000, y: 6000, z: 0},
        //     {x: 6000, y: 6000, z: 6000},
        //     {x: 6000, y: 0, z: 6000},
        //     new Color(0.9, 0.9, 0.9, 1),
        //     false
        // ),
        // new Triangle(
        //     {x: 0, y: 6000, z: 6000},
        //     {x: 6000, y: 6000, z: 6000},
        //     {x: 0, y: 0, z: 6000},
        //     new Color(0.9, 0.9, 0.9, 1),
        //     false
        // ),
        // new Triangle(
        //     {x: 0, y: 6000, z: 6000},
        //     {x: 6000, y: 6000, z: 6000},
        //     {x: 6000, y: 0, z: 6000},
        //     new Color(0.9, 0.9, 0.9, 1),
        //     false
        // )
    ],
    thing: [
        new Triangle(
            {x: 158, y: 388, z: -108},
            {x: 228, y: 300, z: 21},
            {x: 155, y: 388, z: 105},
            new Color(0.6, 0.7, 0.4, 1),
            false
        ),
        // new Triangle(
        //     {x: 160, y: 40, z: 30},
        //     {x: 200, y: 60, z: 65},
        //     {x: 130, y: 120, z: 90},
        //     new Color(0.4, 0.6, 0.5, 1),
        //     false
        // ),
        // new Triangle(
        //     {x: 780, y: 380, z: 380},
        //     {x: 1220, y: 400, z: 715},
        //     {x: 650, y: 370, z: 1050},
        //     new Color(0.5, 0.5, 0.4, 1),
        //     false
        // ),
        // new DiffuseTriangle(
        //     {x: 1580, y: 380, z: 380},
        //     {x: 1820, y: 100, z: 715},
        //     {x: 1450, y: 370, z: 1050},
        //     0.08,
        //     new Color(0.5, 0.5, 0.4, 1),
        //     false
        // )
    ],
    ball: [
        // new Sphere(
        //     {x: 14, y: 15, z: 30},
        //     150,
        //     new Color(0.5, 0.5, 0.5, 1),
        //     false
        // ),
        new Sphere(
            {x: 0, y: 300, z: 0},
            60,
            new Color(0.7, 0.7, 0.7, 1),
            false
        ),
        new DiffuseSphere(
            {x: -200, y: 300, z: 0},
            60,
            1,
            new Color(0.5, 0.5, 0.5, 1),
            false
        ),
        new DiffuseSphere(
            {x: 0, y: 300, z: -60060},
            60000,
            1,
            new Color(0.2, 0.6, 0.2, 1),
            false
        ),
        // new DiffuseSphere(
        //     {x: 500, y: 850, z: 600},
        //     150,
        //     0.1,
        //     new Color(0.5, 0.5, 0.5, 1),
        //     false
        // )
    ],
    light: [
        new Sphere(
            {x: 100, y: 300, z: 100},
            20,
            new Color(1, 1, 1, 1),
            true
        ),
        new Sphere(
            {x: -150, y: 250, z: 170},
            20,
            new Color(0.3, 1, 1, 1),
            true
        ),
        // new Sphere(
        //     {x: 1350, y: 250, z: 870},
        //     100,
        //     new Color(0.3, 1, 1, 1),
        //     true
        // ),
        // new Sphere(
        //     {x: 1150, y: 250, z: 1370},
        //     70,
        //     new Color(1, 0.8, 1, 1),
        //     true
        // ),
        // new Sphere(
        //     {x: 1250, y: 350, z: 1570},
        //     70,
        //     new Color(1, 1, 0.4, 1),
        //     true
        // )
    ]
};

export default things;
