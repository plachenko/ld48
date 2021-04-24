<template>
  <div>
    <div ref="target" id="inner" class="circ"></div>
    <div ref="target" class="circ"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

@Component
export default class Target extends Vue {
  $refs!: {
    target: HTMLElement
  }
  @Prop() private position!: any;
  mounted(){
    this.$nextTick(()=>{
      const el = this.$refs.target;

      el.style.left = this.position.x + "px";
      el.style.top = this.position.y + "px";
    })
  }
}
/*
export default defineComponent({
  name: 'Target',
  props: {
    pos: Object,
  },
  computed: {
    styleObj(): string{
      let pos = this.pos || {x: 0, y: 0, hit: false};
      return `top: ${pos.x}px; left: ${pos.y}px;`;
    },
    styleObjInner(): string{
      let pos = this.pos || {x: 0, y: 0, hit: false};
      let size = 10;

      let offset = {
        x: pos.x + size,
        y: pos.y + size
      }

      return `top: ${offset.x}px; left: ${offset.y}px;`;
    }
  },
  data: function(){
    return {
      amtHit: 0
    }
  },
  methods:{
    onHit(amt = 1){
      this.amtHit += amt;
      this.$emit('on-hit', this);
    },
    animate(){
      const el: HTMLElement = this.$refs.target as HTMLElement;
      const speed = 4;
      let left: number = parseInt(el.style.left);
      let leftAmt = 0;
      let opacityAmt = 0;

      if(this.pos){

        let xPos = this.pos.x || 0;

        setInterval(()=>{
          if(left <= (xPos-left) + 10 || left >= xPos + 20){
            opacityAmt -= .05;
            leftAmt = ( left += speed );
          }else{
            opacityAmt += .04;
            leftAmt = ( left += speed/40 );
          }

          el.style.opacity = opacityAmt+"";
          el.style.left = ( leftAmt )+"px";
        }, 10);
      }
    }
  },
  mounted(){
    // console.log(this.k)
  }
});
*/
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.circ{
  position: absolute;
  height: 30px;
  width: 30px;
  border-radius: 30px;
  z-index: 9998;
  background-color:#F00;
  /* opacity: 0; */
}
#inner{
  background-color:#FF0;
  height: 10px;
  width: 10px;
  z-index: 9999;
}
</style>
