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
import Pos from '../classes/Pos';
import {MoveObj, SpringObj} from '../classes/Spring';

@Component
export default class Arm extends Vue {
  $refs!: {
    sleeve: HTMLElement,
    watch: HTMLElement,
    chain: HTMLCanvasElement,
  }

  @Prop() private position!: any;

  hand = new MoveObj();
  handOff = new MoveObj(new Pos(this.hand.pos.x - 65, this.hand.pos.y+100));
  sleeve = new MoveObj(...Array(0), new Pos(0, 30));
  watch = new SpringObj(this.handOff.pos, new Pos(0, 100));
  prevTime = 0;

  @Watch('position')
  onPosChanged(val: {x: number, y:number}){
    this.renderPos(val.x, val.y, this.$refs.sleeve);
    this.hand.pos = new Pos(val.x, val.y);
    this.handOff.pos = new Pos(val.x - 65, val.y+100);
  }

  public renderWatch(): any{
    const dt = performance.now() - this.prevTime;
    this.prevTime = performance.now();

    const watchEl = this.$refs.watch;
    const watch = this.watch;
    const hand = this.hand;

    watch.update(this.handOff, dt);

    /*
    let dy = hand.pos.y - this.watch.position.y; 
    let dx = hand.pos.x - this.watch.position.x; 

    this.watch.position.x += this.watch.velocity.x * dt;
    // this.watch.position.y += this.watch.velocity.y * dt;
    this.watch.position.y = this.handPos.y;

    this.watch.velocity.x *= .9;
    this.watch.velocity.y *= .9;


    const disX = Math.pow((this.watch.position.x - 200), 2);
    const disY = Math.pow((this.watch.position.y - 200), 2);
    const dis = Math.sqrt(disX + disY);
    if(dis < 10){
      this.$emit('hit')
      console.log(dis)
    }
    */
    this.drawChain();

    watchEl.style.left = `${watch.pos.x - watch.off.x}px`;
    watchEl.style.top = `${watch.pos.y - watch.off.y}px`;
  }

  private drawChain(){
    const can = this.$refs.chain;
    const ctx = can.getContext('2d');
    const midX = 150;
    const dist = this.handOff.getDistance(this.watch).x * 4;

    if(ctx){
      ctx.clearRect(0, 0, 400, 150);
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#440";
      ctx.setLineDash([15, 3, 3, 3]);
      ctx.beginPath();
      ctx.moveTo(midX,0);
      ctx.lineTo(midX-dist, 250);
      ctx.stroke();
      ctx.closePath();
    }
  }

  public update(){
    this.renderWatch();
  }

  mounted() {
    /*
    this.$nextTick(()=>{
      window.requestAnimationFrame(this.watchStep);
    });
    */
  }

  public renderPos(_x:number, _y:number, obj: HTMLElement){
    const x = Math.round(_x);
    const y = Math.round(_y) - this.sleeve.off.y;

    obj.style.left = `${x}px`;
    obj.style.top = `${y}px`;
    // console.log(this.$parent.$el)
    // const parentWidth = this;

    // obj.style.width = (parentWidth - x) + 'px';
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
      /* left: 143px; */
      top: -1073px;
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
      z-index: 9997;
    }

    #chain{
      width: 140px;
      height: 100px;
      position: absolute;
      left: -100px;
      top: 40px;
    }
</style>
