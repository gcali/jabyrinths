import { Coordinates } from './geometry';

export class Player {
    public coordinates: Coordinates;
    constructor(public id: string, public type: string, coordinates?: Coordinates) {
        this.coordinates = coordinates || {row: 0, column: 0};
    }
    public isMoving: boolean = false;
}