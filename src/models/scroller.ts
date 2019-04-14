export type Orientation = 'horizontal' | 'vertical';
export type NearFar = 'first' | 'last';

export class Scroller {
    constructor(public position: number, public orientation: Orientation, public nearFar: NearFar, public id: string) {

    }
}
