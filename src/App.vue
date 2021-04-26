<template>
  <div id="app">
    <div id="gameContainer">
      <Capture @mOutEvt="mOutEvt" @mInEvt="mInEvt" @mMovEvt="mMovEvt" />

      <div v-show="bTitle" id="title" class="menu">
        <div id="TitleText">
          <span id="deep1">Deeper</span>
          <span id="and">and</span>
          <span id="deep2">Deeper</span>
        </div>
      </div>
        <!--
      <transition
        @enter="onEnter"
        @leave="onLeave"
        >

        <div v-show="bPaused" id="pause" class="menu">
          <span>Pause</span>
        </div>
      </transition>
        -->

      <div id="armContainer">
        <Arm ref="arm" :position="oPosition" @hit="hitTarget" />
      </div>
    </div>
    <!--
    <div id="gameContainer">
      <div id="overlays" v-if="!bPlaying">
        <GameOver v-if="bGameOver" />
        <TitleScreen v-if="!bPlaying" @start="start" />
      </div>

      <div id="playContainer">
        <Target :position="{x: 200, y: 200}" />
      </div>
    </div>
    -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Arm from './components/Arm.vue';
import Target from './components/Target.vue';
import TitleScreen from './components/overlays/TitleScreen.vue';
import GameOver from './components/overlays/GameOver.vue';
import * as Tone from 'tone';
import Capture from './components/Capture.vue';
import gsap from 'gsap';

@Component({
  components: {
    Arm,
    Target,
    TitleScreen,
    GameOver,
    Capture
  },
})
export default class App extends Vue {

  $refs!: {
    capture: HTMLElement,
    arm: Arm
  }

  bPaused = false;
  bPlaying = false;
  bTitle =  true;

  bGameOver = false;
  oPosition: {x: number, y: number} = {x: 0, y: 0};

  private mOutEvt(){
    this.bPaused = true;
  }

  private mInEvt(){
    this.bPaused = false;
  }

  private mMovEvt(e: any){
    this.oPosition = e;
  }

  public hitTarget(){
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C4", "8n");
    Tone.start();
  }

  public start(){
    this.toneStart()
  }

  public async toneStart(){
    await Tone.start()
  }

  private onEnter(){
    gsap.from('#pause', {opacity: 0, duration: .3})
  }

  private onLeave(){
    this.step();
  }

  private step(){
    const step = 10;

    setTimeout(()=> {
      this.$refs.arm.update();
      window.requestAnimationFrame(this.step)
    }, step)
  }

  mounted(){
    this.$nextTick(()=>{
      // this.renderWatch();
      gsap.to('#title', {y: 0, duration: 1});
      window.requestAnimationFrame(this.step);
    });
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
  align-items: center;
  }

#gameContainer{
  border: 2px solid;
  width: 500px;
  height: 500px;
  position: relative;
  overflow: none;
  }
  #armContainer{
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    left: 0px;
    top: 0px;
  }

  #title{
    opacity: 1;
  }
  #title span{
    display: inline-block;
    margin: 0px 5px;
  }
  #title #titleText{
    font-size: 2em;
  }
  .menu{
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    left: 0px;
    top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    color: #FFF;
    opacity: .8;
    z-index: 9998;
    }
</style>
