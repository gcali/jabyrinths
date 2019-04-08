<template>
  <div class="grid" ref="grid" :style="{width: this.gridSize + 'px', height: this.gridSize + 'px'}">
    <GameTile
      v-for="tile in tileModels"
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
import { Component, Vue, Prop } from "vue-property-decorator";
import GameTile from "./GameTile.vue";
import TileScroller, { ScrollEvent } from "./TileScroller.vue";
import { Tile, Direction } from "@/models/tile";
import { Scroller, Orientation, NearFar } from "@/models/scroller";

@Component({
  components: {
    GameTile,
    TileScroller
  }
})
export default class GameGrid extends Vue {
  @Prop()
  public sideSize!: number;

  private gridSize: number = 720;

  private padding: number = 20;
  private tileModels: Tile[] = [];

  private scrollers: Scroller[] = [];

  public handleTileScroll(e: ScrollEvent) {
    console.log(e);
  }

  get size() {
    return this.gridSize;
  }

  get tileSize() {
    return (this.size - this.padding) / this.sideSize - this.padding;
  }

  public mounted() {
    const newTiles: Tile[] = [];
    let id = 0;
    let directions: Direction[] = ["up", "down", "left", "right"];
    for (let row = 0; row < this.sideSize; row++) {
      for (let col = 0; col < this.sideSize; col++) {
        newTiles.push(
          new Tile(
            id++,
            { row, column: col },
            directions.filter(d => Math.random() >= 0.5)
          )
        );
      }
    }
    this.tileModels = newTiles;

    const newScrollers: Scroller[] = [];
    const possibleOrientations: Orientation[] = ["horizontal", "vertical"];
    const possibleNearFar: NearFar[] = ["first", "last"];
    for (const orientation of possibleOrientations) {
      for (const nearFar of possibleNearFar) {
        for (let position = 0; position < this.sideSize; position++) {
          if (position % 2 === 1) {
            newScrollers.push(
              new Scroller(position, orientation, nearFar, id++)
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


