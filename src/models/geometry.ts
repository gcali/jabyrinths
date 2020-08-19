export interface Coordinates {
    row: number;
    column: number;
}

export interface Size {
    width: number;
    height: number;
}

export function manhattan(a: Coordinates, b: Coordinates) {
    return Math.abs(a.column - b.column) + Math.abs(a.row - b.row);
}