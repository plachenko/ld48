<template>
  <div id="armContainer">
    <div id="arm">
      <div id="sleeve" ref="sleeve">
        <div id="hand"></div>
        <canvas ref="chain" id="chain"></canvas>
      </div>
    </div>
    <div id="watch" ref="watch"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

class position()
class moveObj {
  velocity = 
}

@Component
export default class Arm extends Vue {
  $refs!: {
    sleeve: HTMLElement,
    watch: HTMLElement,
    chain: HTMLCanvasElement,
  }

  @Prop() private position!: any;

  hand: any = {
    position:{
      x: 0,
      y: 0,
    },
    velocity:{
      x: 0,
      y: 0,
    },
    offset: {
      x: 75,
      y: 0,
    }
  }

  watch: any = {
    position:{
      x: 0,
      y: 0,
    },
    vel:{
      x: 0,
      y: 0,
    },
    off: {
      x: 75,
      y: 0,
    }
  }

  prevTime = 0;

  @Watch('position')
  onPosChanged(val: {x: number, y:number}){
    this.renderPos(val.x, val.y, this.$refs.sleeve);
    this.hand.Pos = val;
    // this.renderPos(val.x, val.y, this.$refs.watch)
    // this.renderWatch();
  }

  public renderWatch(): any{
    const dt = performance.now() - this.prevTime;
    this.prevTime = performance.now();

    const watch = this.watch;
    const hand = this.hand;

    const watchEl = this.$refs.watch;
    const hand: HTMLElement = document.getElementById('hand') as HTMLElement;

    const tension = {
      x: .007,
      y: .007
    }

    const distance = {
      x: this.hand.pos.x - this.watch.pos.x,
      y: this.hand.pos.y - this.watch.pos.y,
    }

    let dy = this.handPos.y - this.watch.position.y; 
    let dx = this.handPos.x - this.watch.position.x; 

    this.watch.velocity.x += dx * tension.x; 
    this.watch.velocity.y += dy * tension.y;

    this.watch.position.x += this.watch.velocity.x * dt;
    // this.watch.position.y += this.watch.velocity.y * dt;
    this.watch.position.y = this.handPos.y;

    this.watch.velocity.x *= .9;
    this.watch.velocity.y *= .9;

    const offsetVal = 100;
    const offsetMax = {
      x: offsetVal,
      y: offsetVal 
    }

    const offsetMin = {
      x: offsetVal,
      y: offsetVal 
    }

    this.watch.offset.y = offsetMax.y;

    if(this.watch.position.y >= this.handPos.y + offsetMax.y){
      this.watch.velocity.y = 0;
      this.watch.position.y = this.handPos.y + offsetMax.y;
    }
    if(this.watch.position.y <= this.handPos.y - offsetMin.y){
      this.watch.position.y = this.handPos.y - offsetMin.y;
      this.watch.velocity.y = 0;
    }

    if(this.watch.position.x >= this.handPos.x + offsetMax.x){
      this.watch.velocity.x = 0;
      this.watch.position.x = this.handPos.x + offsetMax.x;
    }
    if(this.watch.position.x <= this.handPos.x - offsetMin.x){
      this.watch.position.x = this.handPos.x - offsetMin.x;
      this.watch.velocity.x = 0;
    }

    const disX = Math.pow((this.watch.position.x - 200), 2);
    const disY = Math.pow((this.watch.position.y - 200), 2);
    const dis = Math.sqrt(disX + disY);
    if(dis < 10){
      this.$emit('hit')
      console.log(dis)
    }

    this.drawChain();

    watch.style.left = `${this.watch.position.x - this.watch.offset.x}px`;
    watch.style.top = `${this.watch.position.y + this.watch.offset.y}px`;
  }

  private drawChain(){
    const can = this.$refs.chain;
    const ctx = can.getContext('2d');

    if(ctx){
      ctx.clearRect(0, 0, 400, 150);
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#440";
      ctx.setLineDash([15, 3, 3, 3]);
      ctx.beginPath();
      ctx.moveTo(160,0);
      ctx.lineTo(((this.watch.position.x - this.watch.offset.x) - (this.handPos.x - 115))*4, 250);
      ctx.stroke();
      ctx.closePath();
    }
  }

  private watchStep(){
    const step = 10;

    setTimeout(()=> {
      this.renderWatch();
      window.requestAnimationFrame(this.watchStep)
    }, step)
  }

  mounted() {
    this.$nextTick(()=>{
      this.renderWatch();
      window.requestAnimationFrame(this.watchStep);
    })
  }

  public renderPos(_x:number, _y:number, obj: HTMLElement){
    const x = Math.round(_x);
    const y = Math.round(_y);

    obj.style.left = `${x - 15}px`;
    obj.style.top = `${y + 5}px`;

    obj.style.width = (window.innerWidth - x) + 'px';
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#armContainer{
  width: 100%;
  height: 100%;
  position: absolute;
}

 #brush{
    position: absolute;
    z-index: 9987;
    background-repeat: repeat-x;
    color:#000;
    position: absolute;
    }
    #sleeve{
      width: 100%;
      box-sizing: border-box;
      height: 40px;
      border-top: 3px solid;
      border-bottom: 3px solid;
      position: absolute;
      background: #F00;
      left: 143px;
      top: 73px;
      background-color:#FFF;
    }
    #hand{
      background-color:#F00;
      width: 60px;
      height: 60px;
      left: -60px;
      top: -15px;
      position: absolute;
    }
    #watch{
      background-color:#FF0;
      width: 60px;
      height: 60px;
      border-radius: 60px;
      position: absolute;
      left: 0px;
      top: 0px;
      border: 2px solid;
      z-index: 9999;
    }

    #chain{
      width: 140px;
      height: 100px;
      position: absolute;
      left: -100px;
      top: 40px;
    }
</style>
