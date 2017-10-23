import randomInteger from './Functions';

export default class Food {
  constructor(xMaxValue, yMaxValue) {
    this.xMaxValue = xMaxValue;
    this.yMaxValue = yMaxValue;
  }

  generate() {
    const x = randomInteger(0, this.xMaxValue);
    const y = randomInteger(0, this.yMaxValue);
    console.log(`${this.xMaxValue} ${this.yMaxValue}`);
    console.log(`foodCurPos : ${x} ${y}`);
    this.currentPos = { x, y };

    return this;
  }

  isInclude({ x, y }) {
    // console.log(x);
    const pos = this.currentPos;
    // console.log(this.currentPos);
    return (x === pos.x && y === pos.y);
  }

  getCurrentPos() {
    return this.currentPos;
  }
}
