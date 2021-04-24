<template>
  <div id="app">
    <div id="overlays">
      <TitleScreen v-if="!bPlaying" />
      <GameOver v-if="bGameOver" />
    </div>

    <div id="capture" ref="capture" />
    <Arm :position="oPosition" />
    <Target :position="{x: 100, y: 100}" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Arm from './components/Arm.vue';
import Target from './components/Target.vue';
import TitleScreen from './components/overlays/TitleScreen.vue';
import GameOver from './components/overlays/GameOver.vue';

@Component({
  components: {
    Arm,
    Target,
    TitleScreen,
    GameOver
  },
})
export default class App extends Vue {

  $refs!: {
    capture: HTMLElement
  }

  bPlaying = false;
  bGameOver = false;
  oPosition: {x: number, y: number} = {x: 0, y: 0};

  mounted(){
    const el: HTMLElement = this.$refs.capture

    el.addEventListener('mousemove', (e)=> {
      let top = e.offsetY;
      let left = e.offsetX;

      this.oPosition = {x: left, y: top}
    });
    el.addEventListener('contextmenu', (e) =>{
      e.preventDefault();
      return false;
    })
  }

}
</script>

<style>
*{
  user-select: none;
  overscroll-behavior: none;
}
html, body{
  margin: 0px;
  padding: 0px;
  height: 100%;
  touch-action: none;
}
#app {
  overflow: hidden;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color:#FFF;
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: center;
  cursor: none;
  }

#capture{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 9999;
}
</style>
