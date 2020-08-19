<template>
  <div class="home">
    <GameGrid :sideSize="sideSize" :gameState="gameState"/>
    <div class="sidebar">
      <button @click="reload">Reload</button>
      <div class="section">
          <label>Players</label>
          <label v-for="value in validPlayers" :key="value" ><input type="radio" v-model="players" :value="value"/>{{value}}</label>
      </div>
      <div class="section">
        <div v-if="gameState && gameState.currentPlayer" class="line">
          <label>Current player:&nbsp;</label>
          <div class="player-indicator" :style="{backgroundColor: `${gameState.currentPlayer.type}`}"></div>
        </div>
      </div>
      <div class="section">
        <button v-if="gameState" @click="confirm">Confirm</button>
      </div>
    </div>
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
  public players = 4;
  private get validPlayers() {
    return [1,2,3,4];
  }

  public mounted() {
    this.reload();
  }

  public confirm() {
    if (this.gameState) {
      this.gameState.confirm();
    }
  }

  public reload() {
    GameState
      .generate(this.sideSize, this.players)
      .then((v) => this.gameState = v);
  }
}
</script>

<style lang="scss">
.home {
  display: flex;
  align-items: stretch;
  .sidebar {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    margin-left: 2em;
    padding: 1em 2em;
    input[type="radio"] {
      margin-right: 0.5em;
      margin-left: 0;
    }
    .section {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-top: 1em;
    }
    .player-indicator {
      width: 1em;
      height: 1em;
      border: 1px solid black;
    }
    .line {
      display: flex;
    }
  }
}
</style>