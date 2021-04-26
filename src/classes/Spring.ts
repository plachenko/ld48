import Pos from './Pos';

export class MoveObj {
  pos: Pos;
  off: Pos;

  constructor(pos = new Pos(), vel= new Pos(), off = new Pos()){
    this.pos = pos;
    this.off = off;
  }

  public getDistance(obj: MoveObj){
    return this.pos.getDistance(obj.pos);
  }
}

export class SpringConfiguration{
  public Mass : number;
  public Tension : number;
  public Friction : number;
  public Precision : number;
  public Clamp : boolean;
  
  constructor(Mass : number, Tension : number, Friction : number, Precision : number, Clamp : boolean){
    this.Mass = Mass;
    this.Tension = Tension;
    this.Friction = Friction;
    this.Precision = Precision;
    this.Clamp = Clamp;
  }
}

export class SpringState{
  public Target : number;
  public Current : number;
  public Velocity : number;
  public Resting : boolean;
  
  constructor(Target : number, Current : number, Velocity : number){
    this.Target = Target;
    this.Current = Current;
    this.Velocity = Velocity;
    this.Resting = false;
  }
}

export class SpringObj extends MoveObj {
  private springConfiguration = new SpringConfiguration(.01, 1.4, .04, 30, true);
  private xSpring: Spring;
  private ySpring: Spring;
  
  constructor(pos = new Pos(), off = new Pos()){
    super(pos, off);
    this.xSpring = new Spring(pos.x, this.springConfiguration);
    this.ySpring = new Spring(pos.y, this.springConfiguration);
  }

  public update(target: MoveObj, dt: number){
    this.xSpring.SetTarget(target.pos.x);
    this.ySpring.SetTarget(target.pos.y);
    dt =  dt / 1000;

    this.xSpring.Update(dt);
    this.ySpring.Update(dt);

    this.pos.x = this.xSpring.GetValue();
    // this.pos.y = this.ySpring.GetValue();
    this.pos.y = target.pos.y;
  }
}

export class Spring {
  private config : SpringConfiguration;
  private state : SpringState;

  constructor(initialValue:number, _config:SpringConfiguration){
    this.config = _config;
    this.state = new SpringState(initialValue, initialValue, 0);
  }
  
  public IsResting()
  {
      return this.state.Resting;
  }

  public GetValue()
  {
      return this.state.Current;
  }

  public GetTarget()
  {
      return this.state.Target;
  }

  public GetVelocity()
  {
      return this.state.Velocity;
  }

  public SetTarget(value : number)
  {
      this.state.Target = value;
  }

  public Update(deltaTime : number){
    const force = -this.config.Tension * (this.state.Current - this.state.Target);
    const damping = -this.config.Friction * this.state.Velocity;
    const acceleration = (force + damping) / this.config.Mass;

    //update our velocity and position
    this.state.Velocity = this.state.Velocity + (acceleration * deltaTime);
    this.state.Current = this.state.Current + (this.state.Velocity * deltaTime);

    if (this.config.Clamp)
    {
      //figure out if we're resting
      console.log(`Difference: ${Math.abs(this.state.Target - this.state.Current)}`);

      //T 100
      //C 300
      //p 100
      //300 > 100 + 100 = 200

      //300 < 100 - 100 = 0
      
      //D > P
      //C = T
      if(this.state.Current > this.state.Target + this.config.Precision)
      {
        this.state.Current = this.state.Target + this.config.Precision;
        this.state.Velocity = 0;
      }
      else if(this.state.Current < this.state.Target - this.config.Precision)
      {
        this.state.Current = this.state.Target - this.config.Precision;
        this.state.Velocity = 0;
      }
    }
    else
    {
        //figure out if we're resting
        if (Math.abs(this.state.Velocity) < this.config.Precision &&
            Math.abs(this.state.Current - this.state.Target) < this.config.Precision)
        {
            this.state.Current = this.state.Target;
            this.state.Velocity = 0;
            this.state.Resting = true;
            return;
        }
    }
    this.state.Resting = false;
  }
}
