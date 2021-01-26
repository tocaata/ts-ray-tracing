import Triangle from './triangle';
import Sphere from './sphere';
import Color from "./color";

export default {
    room: [
        new Triangle(
            {x: 6000, y: 6000, z: 0},
            {x: 6000, y: 6000, z: 6000},
            {x: 0, y: 6000, z: 0},
            new Color(0.9, 0.9, 0.9, 1),
            false
        ),
        new Triangle(
            {x: 0, y: 6000, z: 6000},
            {x: 6000, y: 6000, z: 6001},
            {x: -1, y: 6000, z: 0},
            new Color(0.9, 0.9, 0.9, 1),
            false
        ),
        new Triangle(
            {x: 6000, y: 6000, z: 0},
            {x: 6000, y: 6000, z: 6000},
            {x: 6000, y: 0, z: 0},
            new Color(0.9, 0.9, 0.9, 1),
            false
        ),
        new Triangle(
            {x: 6000, y: 6000, z: 0},
            {x: 6000, y: 6000, z: 6000},
            {x: 6000, y: 0, z: 6000},
            new Color(0.9, 0.9, 0.9, 1),
            false
        ),
        new Triangle(
            {x: 0, y: 6000, z: 6000},
            {x: 6000, y: 6000, z: 6000},
            {x: 0, y: 0, z: 6000},
            new Color(0.9, 0.9, 0.9, 1),
            false
        ),
        new Triangle(
            {x: 0, y: 6000, z: 6000},
            {x: 6000, y: 6000, z: 6000},
            {x: 6000, y: 0, z: 6000},
            new Color(0.9, 0.9, 0.9, 1),
            false
        )
    ],
    thing: [
        new Triangle(
            {x: 280, y: 580, z: 80},
            {x: 1220, y: 800, z: 715},
            {x: 50, y: 670, z: 1050},
            new Color(0.8, 0.5, 0.9, 1),
            false
        ),
        new Triangle(
            {x: 160, y: 40, z: 30},
            {x: 200, y: 60, z: 65},
            {x: 130, y: 120, z: 90},
            new Color(0.6, 0.9, 0.4, 1),
            false
        ),
        new Triangle(
            {x: 780, y: 380, z: 380},
            {x: 1220, y: 400, z: 715},
            {x: 650, y: 370, z: 1050},
            new Color(0.8, 0.5, 0.4, 1),
            false
        )
    ],
    ball: [
        new Sphere(
            {x: 140, y: 150, z: 300},
            150,
            new Color(0.7, 0.6, 0.3, 1),
            false
        ),
        new Sphere(
            {x: 400, y: 150, z: 300},
            40,
            new Color(0.5, 0.7, 0.3, 1),
            false
        )
    ],
    light: [
        new Sphere(
            {x: 200, y: 100, z: 800},
            20,
            new Color(1, 1, 1, 1),
            true
        ),
        new Sphere(
            {x: 350, y: 50, z: 570},
            40,
            new Color(0.9, 0.9, 0.9, 1),
            true
        ),
        new Triangle(
            {x: 0, y: 6000, z: 16000},
            {x: 6000, y: 6000, z: 16000},
            {x: 0, y: 0, z: 16000},
            new Color(1, 1, 1, 1),
            true
        ),
        new Triangle(
            {x: 0, y: 6000, z: 16000},
            {x: 6000, y: 6000, z: 16000},
            {x: 6000, y: 0, z: 16000},
            new Color(1, 1, 1, 1),
            true
        )
    ]
};
