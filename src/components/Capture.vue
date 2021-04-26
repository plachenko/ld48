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

  @Prop() private position!: Pos;
  @Prop() private scale !: Pos;

  mounted() {
    const el: HTMLElement = this.$refs.capture;
    const offsetPadding = 30;

    el.style.left = (offsetPadding * -1) + "px";
    el.style.top = (offsetPadding * -1) + "px";
    el.style.width = el.offsetWidth + (offsetPadding*2) + "px";
    el.style.height = el.offsetHeight + (offsetPadding*2) + "px";

    el.addEventListener('mousemove', (e)=> {
      const x = e.offsetX - offsetPadding;
      const y = e.offsetY - offsetPadding;
      const mPos = new Pos(x, y);

      this.$emit('mMovEvt', mPos);
    });

    el.addEventListener('contextmenu', (e) =>{
      e.preventDefault();
      return false;
    });

    el.addEventListener('mouseover', (e) => {
      this.$emit('mInEvt');
    });

    el.addEventListener('mouseout', (e) => {
      this.$emit('mOutEvt');
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#capture{
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 9999;
  /* background-color:rgba(233,0,0,.4); */
  cursor: none;
  }
</style>
