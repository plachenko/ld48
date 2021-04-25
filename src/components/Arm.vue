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

class Pos {
  x: number;
  y: number;

  constructor(x = 0, y = 0){
    this.x = x; 
    this.y = y;
  }

  public getDistance(pos: Pos){
    const distX = this.x - pos.x;
    const distY = this.y - pos.y;

    return new Pos(distX, distY);
  }
}

class MoveObj {
  pos: Pos;
  vel: Pos;
  off: Pos;

  constructor(pos = new Pos(), vel= new Pos(), off = new Pos()){
    this.pos = pos;
    this.vel = vel;
    this.off = off;
  }

  public getDistance(obj: MoveObj){
    return this.pos.getDistance(obj.pos);
  }
}

class SpringObj extends MoveObj {
  private tensionVal = .007
  private tension = new Pos(this.tensionVal, this.tensionVal);
  private dampVal = .9;
  private damp = new Pos(this.dampVal, this.dampVal);
  
  constructor(pos = new Pos(), vel= new Pos(), off = new Pos()){
    super(pos, vel, off)
  }

  private checkOffset(obj: MoveObj){
    const offsetVal = 100;
    const offsetMax = {
      x: offsetVal,
      y: offsetVal 
    }

    const offsetMin = {
      x: offsetVal,
      y: offsetVal 
    }

    this.off.y = offsetMax.y;

    if(this.pos.y >= obj.pos.y + offsetMax.y){
      this.vel.y = 0;
      this.pos.y = obj.pos.y + offsetMax.y;
    }
    if(this.pos.y <= obj.pos.y - offsetMin.y){
      this.pos.y = obj.pos.y - offsetMin.y;
      this.vel.y = 0;
    }

    if(this.pos.x >= obj.pos.x + offsetMax.x){
      this.vel.x = 0;
      this.pos.x = obj.pos.x + offsetMax.x;
    }
    if(this.pos.x <= obj.pos.x - offsetMin.x){
      this.pos.x = obj.pos.x - offsetMin.x;
      this.vel.x = 0;
    }
  }

  public update(obj: MoveObj, dt: number){
    this.checkOffset(obj);

    const dist = obj.getDistance(this);

    this.vel.x += dist.x * this.tension.x;
    this.vel.y += dist.y * this.tension.y;

    this.pos.x += this.vel.x * dt;
    this.pos.y += this.vel.y * dt;

    this.vel.x *= this.damp.x;
    this.vel.y *= this.damp.y;

    // this.pos.x -= this.off.x;
    // this.pos.x = this.pos.x + this.off.x;
    // this.pos.y = this.pos.y + this.off.y;
  }
}

@Component
export default class Arm extends Vue {
  $refs!: {
    sleeve: HTMLElement,
    watch: HTMLElement,
    chain: HTMLCanvasElement,
  }

  @Prop() private position!: any;

  hand = new MoveObj();
  watch = new SpringObj(new Pos(), new Pos(), new Pos(10, -475));
  prevTime = 0;

  @Watch('position')
  onPosChanged(val: {x: number, y:number}){
    this.renderPos(val.x, val.y, this.$refs.sleeve);
    this.hand.pos = new Pos(val.x, val.y);
  }

  public renderWatch(): any{
    const dt = performance.now() - this.prevTime;
    this.prevTime = performance.now();

    const watchEl = this.$refs.watch;
    const watch = this.watch;
    const hand = this.hand;

    watch.update(hand, dt);

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

    if(ctx){
      ctx.clearRect(0, 0, 400, 150);
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#440";
      ctx.setLineDash([15, 3, 3, 3]);
      ctx.beginPath();
      ctx.moveTo(160,0);
      ctx.lineTo(this.watch.pos.x - (this.hand.pos.x - 115), 250);
      // ctx.lineTo(((this.watch.pos.x - this.watch.off.x) - (this.hand.pos.x - 115))*4, 250);
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
