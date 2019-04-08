import { Coordinates } from './geometry';

export type Direction = 'up' | 'down' | 'right' | 'left';

export class Tile {
    constructor(public id: number, public coordinates: Coordinates, public directions: Direction[] = []) {
    }
}
