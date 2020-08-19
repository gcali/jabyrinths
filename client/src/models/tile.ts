import { Coordinates } from './geometry';

export type Direction = 'up' | 'down' | 'right' | 'left';

export class Tile {
    constructor(public coordinates: Coordinates, public directions: Direction[] = []) {
    }

    get id() {
        return this.coordinates.row * 10000 + this.coordinates.column;
    }
}
