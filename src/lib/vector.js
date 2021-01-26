export function normalVector(vector) {
    const {x, y, z} = vector;
    const len = Math.sqrt(x * x + y * y + z * z);
    return {x: x / len, y: y / len, z: z / len};
}

export function dotProduct(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

export function crossProduct(v1, v2) {
    return {
        x: v1.y * v2.z - v1.z * v2.y,
        y: v1.z * v2.x - v1.x * v2.z,
        z: v1.x * v2.y - v1.y * v2.x
    };
}

export function multiply(v, num) {
    return {x: v.x * num, y: v.y * num, z: v.z * num};
}

export function plus(v1, v2) {
    return {x: v1.x + v2.x, y: v1.y + v2.y, z: v1.z + v2.z};
}

export function subtract(v1, v2) {
    return {x: v1.x - v2.x, y: v1.y - v2.y, z: v1.z - v2.z};
}

export function toVector(p1, p2) {
    return {
        x: p2.x - p1.x,
        y: p2.y - p1.y,
        z: p2.z - p1.z
    };
}

export function vectorLength(v1) {
    return Math.sqrt(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z);
}
