<template>
  <div :class="['tile', {'targettable': targettable}]" :style="style">
    <div v-for="direction in directions" :key="direction" :class="direction"/>
    <div v-if="player" class="player" :style="{backgroundColor: `${playerColor}`, color: `${playerColor}`}"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Tile, Direction } from '@/models/tile';

@Component({
  components: {},
})
export default class GameTile extends Vue {
  @Prop()
  public tile!: Tile;

  @Prop({ default: () => [] })
  public directions!: Direction[];

  @Prop()
  public size!: number;

  @Prop()
  public padding!: number;

  @Prop({default: () => null})
  public player?: string;

  @Prop({default: () => true})
  public targettable!: boolean;

  private get playerColor(): string | null {
    if (!this.player) {
      return null;
    }
    return this.player;
  }


  private style: any = {};

  public mounted() {
    const x =
      this.padding + (this.size + this.padding) * this.tile.coordinates.column;
    const y =
      this.padding + (this.size + this.padding) * this.tile.coordinates.row;
    this.style = {
      width: this.size + 'px',
      height: this.size + 'px',
      transform: `translate(${x}px, ${y}px)`,
    };
  }
}
</script>


<style lang="scss">
@mixin left {
  position: absolute;
  background-color: white;
  background-color: #ffdead;
  background-color: #2c3e50;
  background-color: #42b983;
  width: 30%;
  height: 40%;
  top: 30%;
  left: 0%;
}

@mixin up {
  @include left;
  width: 40%;
  height: 30%;
  top: 0%;
  left: 30%;
}
.tile {
  &:before {
    position: absolute;
    content: "";
    background-color: white;
    background-color: #ffdead;
    background-color: #2c3e50;
    background-color: #42b983;
    width: 40%;
    height: 40%;
  }

  border-radius: 6px;
  background-color: blue;
  background-color: #42b983;
  background-color: #2c3e50;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  .left {
    @include left;
  }

  .right {
    @include left;
    left: 70%;
  }

  .up {
    @include up;
  }
  .down {
    @include up;
    top: 70%;
  }
  .player {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 50%;
    width: 25%;
    height: 25%;
  }
  .player-blue {
    background-color: blue;
    color: blue;
  }
  .player-yellow {
    background-color: yellow;
    color: yellow;
  }
  .player-red {
    background-color: red;
    color: red;
  }
  .player-green {
    background-color: green;
    color: green;
  }

  &.targettable:hover {
    border: 1px solid white;
  }
}
</style>

