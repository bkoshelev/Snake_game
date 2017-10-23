export default class Table {
  constructor(length, weight) {
    this.length = length;
    this.weight = weight;
  }

  isInclude({ x, y }) {
    if (x < 0 || x >= this.length ||
  y < 0 || y >= this.weight) {
      return false;
    }
    return true;
  }

  getLength() {
    return this.length;
  }

  getWeigth() {
    return this.weight;
  }
}
