<template>
  <div class="home">
    <GameGrid sideSize="7"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GameGrid from '@/components/GameGrid.vue'; // @ is an alias to /src

@Component({
  components: {
    GameGrid,
  },
})
export default class Home extends Vue { }
</script>
