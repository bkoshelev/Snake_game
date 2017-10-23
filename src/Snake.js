export default class Snake {
  constructor(list) {
    this.color = 'black';
    this.list = list;
    this.speed = 0;
  }

  setList(list) {
    this.list = list;
  }
  getList() {
    return this.list;
  }

  getLength() {
    return this.list.length;
  }

  getHead() {
    return this.getList()[0];
  }

  lengthenTail() {
    const list = this.getList();
    this.setList([...list, this.possibleNewTailEnd]);
  }

  action(action) {
    const newRest = this.list.filter((item, index) => index !== this.list.length - 1);
    this.possibleNewTailEnd = this.list[this.list.length - 1];
    const newHead = this.createNewHead(action);
    const newList = [newHead, ...newRest];
    this.setList(newList);
  }


  createNewHead(action) {
    const head = this.list.slice(0, 1)[0];
    console.log(head);
    const actions = {
      left: { x: head.x - 1, y: head.y },
      right: { x: head.x + 1, y: head.y },
      up: { x: head.x, y: head.y - 1 },
      down: { x: head.x, y: head.y + 1 },
    };

    const result = actions[action];
    return result;
  }

  isInclude(item) {
    const fn = (elem, ...rest) => {
      if (elem === undefined) return false;
      if (elem.x === item.x && elem.y === item.y) {
        return true;
      }
      return fn(...rest);
    };
    return fn(...this.list);
  }

  isTailInclude(item) {
    // console.log(`head: ${item.x} ${item.y}`);
    const fn = (elem, ...rest) => {
      if (elem === undefined) return false;
      if (elem.x === item.x && elem.y === item.y) {
        return true;
      }
      return fn(...rest);
    };

    const tail = this.list.slice(1);
    console.log(tail);
    return fn(...tail);
  }
}
