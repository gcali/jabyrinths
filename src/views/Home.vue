<template>
  <div class="home">
    <GameGrid :sideSize="sideSize" :gameState="gameState"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GameGrid from '@/components/GameGrid.vue'; // @ is an alias to /src
import { GameState } from '@/models/gameState';

@Component({
  components: {
    GameGrid,
  },
})
export default class Home extends Vue {
  private gameState: GameState | null = null;
  private sideSize = 7;
  public mounted() {
    GameState
      .generate(this.sideSize)
      .then((v) => this.gameState = v);
  }
}
</script>
