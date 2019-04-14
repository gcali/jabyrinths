<template>
  <div class="grid" ref="grid" :style="{width: this.gridSize + 'px', height: this.gridSize + 'px'}">
    <GameTile
      v-for="tile in tiles"
      :key="tile.id"
      :tile="tile"
      :size="tileSize"
      :padding="padding"
      :directions="tile.directions"
    />
    <TileScroller
      v-for="scroller in scrollers"
      :key="scroller.id"
      :orientation="scroller.orientation"
      :position="scroller.position"
      :nearFar="scroller.nearFar"
      :spacing="{delta: tileSize + padding, border: padding + 4}"
      :size="{thin: padding - 3, large: tileSize - 8}"
      @scroll="handleTileScroll"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import GameTile from './GameTile.vue';
import TileScroller, { ScrollEvent } from './TileScroller.vue';
import { Tile, Direction } from '@/models/tile';
import { Scroller, Orientation, NearFar } from '@/models/scroller';
import { GameState } from '../models/gameState';

@Component({
  components: {
    GameTile,
    TileScroller,
  },
})
export default class GameGrid extends Vue {
  @Prop()
  public sideSize!: number;

  @Prop()
  public gameState?: GameState;

  private gridSize: number = 720;

  private padding: number = 20;
  // private tileModels: Tile[] = [];

  get tiles(): Tile[] {
    if (!this.gameState) {
      return [];
    } else {
      return this.gameState.tiles;
    }
  }

  private scrollers: Scroller[] = [];

  public handleTileScroll(e: ScrollEvent) {
    if (this.gameState) {
      this.gameState.scrollTiles(e.direction, e.position);
    }
  }

  get size() {
    return this.gridSize;
  }

  get tileSize() {
    return (this.size - this.padding) / this.sideSize - this.padding;
  }

  public mounted() {
    const newScrollers: Scroller[] = [];
    const possibleOrientations: Orientation[] = ['horizontal', 'vertical'];
    const possibleNearFar: NearFar[] = ['first', 'last'];
    let id = 0;
    for (const orientation of possibleOrientations) {
      for (const nearFar of possibleNearFar) {
        for (let position = 0; position < this.sideSize; position++) {
          if (position % 2 === 1) {
            newScrollers.push(
              new Scroller(position, orientation, nearFar, 's' + id++),
            );
          }
        }
      }
    }
    this.scrollers = newScrollers;
  }
}
</script>

<style lang="scss">
.grid {
  display: inline-block;
  position: relative;
  background-color: grey;
  background-color: #2c3e50;
  background-color: #42b983;
  background-color: #ffdead;
  background-color: #5a5a5a;
  border-radius: 6px;
}
</style>


