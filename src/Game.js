import React from 'react';
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import cn from 'classnames';
import PropTypes from 'prop-types';
import './Game.css';
import './Row.css';
import Snake from './Snake';
import Food from './Food';
import Table from './Table';

export default class Game extends React.PureComponent {

  constructor (props) {
    super(props);
    this.snake = new Snake([
      {
        x: 5,
        y: 5,
      },
      {
        x: 5,
        y: 6,
      },
    ]);

    this.food = new Food(this.props.length-1,
                    this.props.weigth-1).generate();

    this.table = new Table(this.props.length,
                          this.props.weigth);
  }

  state = {
    points : 0,
    step : 1000,
    timerId : 0,
    gameState: 'prepared',
    snakeState: 'up',
    foodState: 'not eat',
    seconds: 0,
    list: [
      {
        x: 5,
        y: 5,
      },
      {
        x: 5,
        y: 6,
      },
    ],
  }

  isFoodWasEaten = () => {
    return this.food.isInclude(this.snake.getHead());
  }

  makeAction = () => {

    if (this.state.gameState !== 'play') {
      return false;
    }
    this.snake.action(this.state.snakeState);
    console.log(`isFoodWasEaten: ${this.isFoodWasEaten()}`);
    console.log(`headPos : ${this.snake.getHead().x} ${this.snake.getHead().y}`);
    console.log(`isTailInclude: ${this.snake.isTailInclude(this.snake.getHead())}`);

    if ((!this.table.isInclude(this.snake.getHead())) ||
      this.snake.isTailInclude(this.snake.getHead())) {
            this.setState({
              gameState: 'game over'
            })
            alert(`game over!\nОчков набрано : ${this.state.points}`);
            clearTimeout(this.state.timerId);
    }

    if (this.isFoodWasEaten()) {
      this.snake.lengthenTail();
      this.setState({
        foodState: 'eat',
        points : this.state.points + 1
      })
    }

    if (this.state.foodState === 'eat') {
          this.generateNewFood();
          this.setState({
            step : this.state.step - 50,
            foodState: 'not eat'
          })
    }

    const timerId = setTimeout(this.makeAction, this.state.step);

    this.setState({
      seconds: this.state.seconds + 1,
      timerId: timerId
    });
  }

  //запрещаем движение в сторону хвоста
  isActionEnable = (action_name) => {
    if (this.state.snakeState === 'left' &&
        action_name === 'right') return false;
    if (this.state.snakeState === 'right' &&
        action_name === 'left') return false;
    if (this.state.snakeState === 'up' &&
        action_name === 'down') return false;
    if (this.state.snakeState === 'down' &&
        action_name === 'up') return false;
    return true;
    }

  handleKeyPress = (event) => {
    event.preventDefault();
    if (event.key === 'q' && this.state.gameState === 'prepared') {
      const intervalId = setTimeout(this.makeAction, 1000);
      this.setState({
        gameState: 'play',
      });
      return;
    }
    const keyTypes = {
      w: 'up',
      a: 'left',
      s: 'down',
      d: 'right',
    };

    if(!this.isActionEnable(keyTypes[event.key])) {
      return false;
    }

    this.setState({
      snakeState: keyTypes[event.key],
    });
  }

  actionStop =(event) => {
    event.preventDefault();
    clearTimeout(this.state.timerId);
  }

  generateNewFood = () => {
    const food = new Food(this.table.getLength()-1,
                    this.table.getWeigth()-1);
    food.generate();
    this.food = food;

    //Защита от случаев, когда еда сгенерируется на теле змеи
    if (this.snake.isInclude(this.food.getCurrentPos())) {
      this.generateNewFood();
    }
  }


  getTable = () => {

    const cols = this.table.getLength();
    const rows = this.table.getWeigth();

    const createTr = (col, row, acc) => {
      if (col === cols) return acc;
      const currentPos = { x: col, y: row };
      const classes = cn({
        'Row-row': true,
        'Row-active': this.snake.isInclude(currentPos),
        'Row-food': this.food.isInclude(currentPos)
      });
      const newAcc = [...acc,
          <td
              className={classes}
              key={col}
          ></td>,
      ];
      return createTr(col + 1, row, newAcc);
    };

    const createTable = (row, acc) => {
      if (row === rows) return acc;
      const newAcc = [...acc, <tr key={row} >{createTr(0, row, [])}</tr>];
      return createTable(row + 1, newAcc);
    };

    return (
        <table className='Game-table col-md-offset-4'>
            <tbody className='Game-tbody'>
                {createTable(0, [])}
            </tbody>
        </table>);
  }


  render() {
    const table = this.getTable(); // столбцы х строки
    return (
        <div className='Game-component '>
            <KeyHandler
                keyEventName={KEYPRESS}
                keyValue="w"
                onKeyHandle={this.handleKeyPress}
            />
            <KeyHandler
                keyEventName={KEYPRESS}
                keyValue="a"
                onKeyHandle={this.handleKeyPress}
            />
            <KeyHandler
                keyEventName={KEYPRESS}
                keyValue="s"
                onKeyHandle={this.handleKeyPress}
            />
            <KeyHandler
                keyEventName={KEYPRESS}
                keyValue="d"
                onKeyHandle={this.handleKeyPress}
            />
            <KeyHandler
                keyEventName={KEYPRESS}
                keyValue="q"
                onKeyHandle={this.handleKeyPress}
            />
            <KeyHandler
                keyEventName={KEYPRESS}
                keyValue="p"
                onKeyHandle={this.actionStop}
            />
            <div ><p >{'Очки:'}{this.state.points}</p></div>
            {table}
        </div>);
  }
}
