<template>
  <div id="armContainer">
    <div id="arm" class="hello">
      <div id="sleeve" ref="sleeve">
        <div id="hand"></div>
      </div>
    </div>
    <div id="watch" ref="watch"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  $refs!: {
    sleeve: HTMLElement,
    watch: HTMLElement,
  }

  @Prop() private msg!: string;
  @Prop() private position!: any;

  handPos: {x: number, y: number} = {x: 0, y: 0};
  watch: any = {
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

  prevTime = 0;

  @Watch('position')
  onPosChanged(val: {x: number, y:number}){
    this.renderPos(val.x, val.y, this.$refs.sleeve);
    this.handPos = val;
    // this.renderPos(val.x, val.y, this.$refs.watch)
    // this.renderWatch();
  }

  public renderWatch(): any{
    const watch = this.$refs.watch;
    const hand: HTMLElement = document.getElementById('hand') as HTMLElement;
    const tensionY = .007;
    const tensionX = .007;

    const offset = 100;

    const dt = performance.now() - this.prevTime;
    this.prevTime = performance.now();

    let dy = this.handPos.y - this.watch.position.y; 
    let dx = this.handPos.x - this.watch.position.x; 

    this.watch.velocity.x += dx * tensionX; 
    this.watch.velocity.y += dy * tensionY;

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

    watch.style.left = `${this.watch.position.x - this.watch.offset.x}px`;
    watch.style.top = `${this.watch.position.y + this.watch.offset.y}px`;

    setTimeout(()=> {
      window.requestAnimationFrame(this.renderWatch)
    }, 10)
  }

  mounted() {
    this.$nextTick(()=>{
      window.requestAnimationFrame(this.renderWatch);
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
      z-index: 9999;
    }
</style>
