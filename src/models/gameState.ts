import { Size } from './geometry';
import { Tile, Direction } from './tile';

export class GameState {

    public static async generate(size: number): Promise<GameState> {
        const tiles: Tile[] = [];
        const id = 0;
        const directions: Direction[] = ['up', 'down', 'left', 'right'];
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                tiles.push(
                    new Tile(
                        // id++,
                        { row, column: col },
                        directions.filter((d) => Math.random() >= 0.5),
                    ),
                );
            }
        }

        return new GameState(
            tiles,
            new Tile(
                // id++,
                { row: 0, column: 0 },
                directions.filter((d) => Math.random() >= 0.5),
            ),
        );

    }
    private size: Size;

    constructor(public tiles: Tile[], public pickedTile: Tile) {
        const maxRow = Math.max(...tiles.map((t) => t.coordinates.row));
        const maxCol = Math.max(...tiles.map((t) => t.coordinates.column));
        this.size = {
            height: maxRow + 1,
            width: maxCol + 1,
        };
    }

    public scrollTiles(direction: Direction, index: number) {
        const oldPicked = this.pickedTile;
        this.tiles
            .filter((t) => this.shouldTileBeScrolled(direction, index, t))
            .forEach((t) => { this.scrollTile(direction, t); });
        this.pickedTile = this.getPickedTile();
        this.updatePickedCoordinates(oldPicked, direction, index);
        this.tiles.push(oldPicked);
        this.tiles = this.tiles.sort((a, b) => (
            (a.coordinates.row - b.coordinates.row) * this.size.width + (a.coordinates.column - b.coordinates.column)
        ));
    }

    private updatePickedCoordinates(tile: Tile, direction: Direction, index: number) {
        switch (direction) {
            case 'up':
                tile.coordinates.column = index;
                tile.coordinates.row = this.size.height - 1;
                break;
            case 'down':
                tile.coordinates.column = index;
                tile.coordinates.row = 0;
                break;
            case 'left':
                tile.coordinates.column = this.size.width - 1;
                tile.coordinates.row = index;
                break;
            case 'right':
                tile.coordinates.column = 0;
                tile.coordinates.row = index;
                break;
        }
    }

    private getPickedTile(): Tile {
        const foundIndex = this.tiles.findIndex((t) => this.shouldTileBePicked(t));
        if (foundIndex < 0) {
            throw new RangeError('No tile to be picked found');
        }
        const [picked] = this.tiles.splice(foundIndex, 1);
        return picked;
    }

    private shouldTileBePicked(tile: Tile) {
        return tile.coordinates.row < 0 ||
            tile.coordinates.row >= this.size.height ||
            tile.coordinates.column < 0 ||
            tile.coordinates.column >= this.size.width;
    }

    private scrollTile(direction: Direction, tile: Tile) {
        if (direction === 'up') {
            tile.coordinates.row -= 1;
        } else if (direction === 'down') {
            tile.coordinates.row += 1;
        } else if (direction === 'left') {
            tile.coordinates.column -= 1;
        } else if (direction === 'right') {
            tile.coordinates.column += 1;
        }
    }

    private shouldTileBeScrolled(direction: Direction, index: number, tile: Tile) {
        if (direction === 'up' || direction === 'down') {
            return tile.coordinates.column === index;
        } else {
            return tile.coordinates.row === index;
        }
    }

}
