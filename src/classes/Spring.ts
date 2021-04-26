import Pos from './Pos';

export class MoveObj {
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

export class SpringObj extends MoveObj {
  private tensionVal = .007
  private tension = new Pos(this.tensionVal, this.tensionVal);
  private dampVal = .9;
  private damp = new Pos(this.dampVal, this.dampVal);
  
  constructor(pos = new Pos(), vel= new Pos(), off = new Pos()){
    super(pos, vel, off)
  }

  private checkOffset(obj: MoveObj){
    const offsetVal = 10;
    const offsetMax = {
      x: offsetVal,
      y: offsetVal 
    }

    const offsetMin = {
      x: offsetVal,
      y: offsetVal 
    }

    // this.off.y = offsetMax.y;

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
    console.log(dist);

    // this.vel.x += dist.x * this.tension.x;
    // this.vel.y += dist.y * this.tension.y;

    // this.pos.x += this.vel.x * dt;
    // this.pos.y += this.vel.y * dt;

    // this.vel.x *= this.damp.x;
    // this.vel.y *= this.damp.y;

    // this.pos.x -= this.off.x;
    // this.pos.x = this.pos.x + this.off.x;
    // this.pos.y = this.pos.y + this.off.y;
  }
}