<template>
  <div id="capture" ref="capture" />
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import Pos from '../classes/Pos';

@Component
export default class Capture extends Vue {
  $refs!: {
    capture: HTMLCanvasElement,
  }

  @Prop() private position!: any;

  mounted() {
    const el: HTMLElement = this.$refs.capture;

    el.addEventListener('mousemove', (e)=> {
      const x = e.offsetY;
      const y = e.offsetX;
      const mPos = new Pos(x, y);

      this.$emit('mEvent', mPos);
    });

    el.addEventListener('contextmenu', (e) =>{
      e.preventDefault();
      return false;
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#capture{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 9999;
  background-color:rgba(233,0,0,.4);
  }
</style>
