import { Size, manhattan } from './geometry';
import { Tile, Direction } from './tile';
import { Player } from './playerState';

export class GameState {

    public static async generate(size: number, players: number): Promise<GameState> {
        if (players < 1 || players > 4) {
            throw new Error("Cannot create a game with " + players + " players");
        }
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

        const chosenPlayers = ["red", "blue", "yellow", "green"].slice(0,players);

        const gameState = new GameState(
            tiles,
            new Tile(
                // id++,
                { row: 0, column: 0 },
                directions.filter((d) => Math.random() >= 0.5),
            ),
            chosenPlayers
        );
        gameState.currentPlayer = gameState.playerState[0];
        return gameState;

    }
    private size: Size;

    public playerState: Player[];

    public currentPlayer: Player | null = null;

    public hasScrolled: boolean = false;

    public isTargettable(tile: Tile) {
        if (this.currentPlayer === null) {
            return false;
        }
        return manhattan(this.currentPlayer.coordinates, tile.coordinates) === 1;
    }

    constructor(public tiles: Tile[], public pickedTile: Tile, players: string[]) {
        const maxRow = Math.max(...tiles.map((t) => t.coordinates.row));
        const maxCol = Math.max(...tiles.map((t) => t.coordinates.column));
        this.size = {
            height: maxRow + 1,
            width: maxCol + 1,
        };
        const corners = [
            {row: 0, column: 0},
            {row: maxRow, column: maxCol},
            {row: 0, column: maxCol},
            {row: maxRow, column: 0},
        ];
        this.playerState = players.map((p,i) => new Player(p, p, corners[i]));
    }

    public scrollTiles(direction: Direction, index: number) {
        if (this.hasScrolled) {
            return;
        }
        this.hasScrolled = true;
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

    public confirm() {
        this.hasScrolled = false;
        if (this.currentPlayer) {
            this.currentPlayer.isMoving = false;
            const lastIndex = this.playerState.indexOf(this.currentPlayer);
            this.currentPlayer = this.playerState[(lastIndex + 1) % this.playerState.length];
        } else {
            this.currentPlayer = this.playerState[0];
        }

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
