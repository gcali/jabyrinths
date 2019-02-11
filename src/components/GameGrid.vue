<template>
  <div class="grid" ref="grid">
    <GameTile
      v-for="tile in tileModels"
      :key="tile.id"
      :tile="tile"
      :size="tileSize"
      :padding="padding"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import GameTile from './GameTile.vue';
import TileScroller from './TileScroller.vue';
import { Tile } from '@/models/tile';

@Component({
  components: {
    GameTile,
    TileScroller,
  },
})
export default class GameGrid extends Vue {

  @Prop()
  public sideSize!: number;

  private padding: number = 20;
  private tileModels: Tile[] = [];

  get size() {
    return (this.$refs.grid as HTMLDivElement).clientWidth;
  }

  get tileSize() {
    return (this.size - this.padding) / this.sideSize - this.padding;
  }

  public mounted() {
    const newTiles: Tile[] = [];
    let id = 0;
    for (let row = 0; row < this.sideSize; row++) {
      for (let col = 0; col < this.sideSize; col++) {
        newTiles.push(new Tile(id++, { row, column: col }));
      }
    }
    this.tileModels = newTiles;
  }

}
</script>

<style lang="scss">
$grid-size: 35em;
.grid {
  display: inline-block;
  position: relative;
  width: $grid-size;
  background-color: grey;
  height: $grid-size;
}
</style>


