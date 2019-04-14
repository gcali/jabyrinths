<template>
  <div @click="scroll" :class="['scroller', this.orientation, this.nearFar]" :style="style"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import { Orientation, NearFar } from '../models/scroller';
import { Direction } from '../models/tile';

export interface Sizes {
  thin: number;
  large: number;
}
export interface Spacing {
  delta: number;
  border: number;
}

export interface ScrollEvent {
  position: number;
  direction: Direction;
}
@Component({
  components: {},
})
export default class TileScroller extends Vue {

  public get style() {
    const horizontal = this.orientation === 'horizontal';
    const delta = this.spacing.delta * this.position + this.spacing.border;
    return {
      width: this.appendPx(horizontal ? this.size.large : this.size.thin),
      height: this.appendPx(horizontal ? this.size.thin : this.size.large),
      top: this.appendPx(
        horizontal ? (this.nearFar === 'first' ? 0 : undefined) : delta,
      ),
      bottom: this.appendPx(
        horizontal && this.nearFar === 'last' ? 0 : undefined,
      ),
      left: this.appendPx(
        horizontal ? delta : this.nearFar === 'first' ? 0 : undefined,
      ),
      right: this.appendPx(
        !horizontal && this.nearFar === 'last' ? 0 : undefined,
      ),
    };
  }
  @Prop({ required: true })
  public orientation!: Orientation;
  @Prop({ required: true })
  public size!: Sizes;
  @Prop({ required: true })
  public nearFar!: NearFar;
  @Prop({ required: true })
  public spacing!: Spacing;
  @Prop({ required: true })
  public position!: number;

  @Emit('scroll')
  public scroll(): ScrollEvent {
    return {
      position: this.position,
      direction: this.direction,
    };
  }

  private get direction() {
    if (this.orientation === 'horizontal') {
      if (this.nearFar === 'first') {
        return 'up';
      } else {
        return 'down';
      }
    } else {
      if (this.nearFar === 'first') {
        return 'left';
      } else {
        return 'right';
      }
    }
  }

  private appendPx(e: any): string {
    if (e) {
      return e + 'px';
    } else {
      return e;
    }
  }
}
</script>


<style lang="scss">
$radius: 6px;
.scroller {
  background-color: red;
  position: absolute;
}
.horizontal {
  &.first {
    border-bottom-left-radius: $radius;
    border-bottom-right-radius: $radius;
  }
  &.last {
    border-top-left-radius: $radius;
    border-top-right-radius: $radius;
  }
}
.vertical {
  &.first {
    border-bottom-right-radius: $radius;
    border-top-right-radius: $radius;
  }
  &.last {
    border-bottom-left-radius: $radius;
    border-top-left-radius: $radius;
  }
}
</style>


