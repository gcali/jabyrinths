<template>
  <div class="tile" :style="style"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Tile } from '@/models/tile';

@Component({
  components: {},
})
export default class GameTile extends Vue {
  @Prop()
  public tile!: Tile;

  @Prop()
  public size!: number;

  @Prop()
  public padding!: number;

  private style: any = {};

  public mounted() {
    const x = this.padding + (this.size + this.padding) * this.tile.coordinates.column;
    const y = this.padding + (this.size + this.padding) * this.tile.coordinates.row;
    this.style = {
      width: this.size + 'px',
      height: this.size + 'px',
      transform: `translate(${x}px, ${y}px)`,
    };
  }

}
</script>


<style lang="scss">
.tile {
  &:before {
    position: absolute;
    content: "";
    background-color: white;
    width: 40%;
    height: 40%;
  }
  background-color: blue;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}
</style>

