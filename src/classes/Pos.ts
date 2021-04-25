export default class Pos {
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
