<template>
  <div class="scroller" :style="style"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

export type Orientation = 'horizontal' | 'vertical';
export type NearFar = 'first' | 'last';
export interface Sizes {
  thin: number;
  large: number;
}
@Component({
  components: {},
})

export default class TileScroller extends Vue {

  @Prop()
  public orientation!: Orientation;
  @Prop()
  public size!: Sizes;
  @Prop()
  public nearFar!: NearFar;
  @Prop()
  public delta!: number;
  @Prop()
  public position!: number;

  public get style() {
    const horizontal = orientation === 'horizontal';
    const delta = this.delta * this.position;
    return {
      width: (horizontal ? this.size.large : this.size.thin) + 'px',
      height: (horizontal ? this.size.thin : this.size.large) + 'px',
      top: horizontal ? (this.nearFar === 'first' ? '0px' : undefined) : delta,
      bottom: horizontal && this.nearFar === 'last' ? '0px' : undefined,
      left: horizontal ? delta : (this.nearFar === 'first' ? '0px' : undefined),
      right: (!horizontal) && this.nearFar === 'last' ? '0px' : undefined,
    };
  }


}
</script>


<style lang="scss">
.scroller {
  background-color: red;
  position: absolute;
}
</style>


