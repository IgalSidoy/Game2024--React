import React, { Component } from "react";
import classes from "./Board.module.css";
import Number from "../../Components/Number/Number";
import colors from "../../Utili/numberColor";
export default class Board extends Component {
  constructor() {
    super();
  }

  state = {
    board: [
      [2, 2, "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", 16],
    ],
    number: 2,
  };

  initBoard() {
    let board = [
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", 2, 2],
    ];

    this.setState({ board });
  }

  insertNumber(board, number, row_i, col_i) {
    board[row_i][col_i] = number;
    return board;
  }
  addNumberBoBoard(board) {
    if (this.gameOver(board)) {
      alert("game over");
      return;
    }
    let empty = [];
    for (let row_i in board) {
      for (let col_i in board[row_i]) {
        if (board[row_i][col_i] === "") {
          empty.push(row_i + "-" + col_i);
        }
      }
    }
    let selected = Math.round(Math.random() * empty.length - 1);
    if (selected < 0) selected = 0;
    let row_i = empty[selected].split("-")[0];
    let col_i = empty[selected].split("-")[1];
    this.insertNumber(board, this.state.number, row_i, col_i);
    this.setState({
      board,
    });
  }

  gameOver(board) {
    let gameover = true;
    for (let row_i in board) {
      for (let col_i in board[row_i]) {
        if (board[row_i][col_i] !== "") {
          gameover = false;
        }
      }
    }
    return gameover;
  }

  componentDidMount() {
    window.addEventListener("keypress", (e) => {
      this.onKeyDownHandler(e);
    });
  }
  componentWillUnmount() {
    window.removeEventListener("keypress", (e) => {});
  }
  render() {
    return (
      <div className={classes.container}>
        {this.state.board.map((line, key) => (
          <div className={classes.row} key={key}>
            {line.map((number, key2) => (
              <div className={classes.col} key={key2}>
                <Number
                  number={number}
                  backgroundColor={colors[number].backgroundColor}
                  color={colors[number].color}
                  fontSize={colors[number].fontSize}
                ></Number>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
  onKeyDownHandler(e) {
    let key = e.key.toLowerCase();
    //left
    if (key === "a") {
      this.moveBoardHandler("left");
      return;
    }
    //right
    if (key === "d") {
      this.moveBoardHandler("right");
      return;
      return;
    }
    //up
    if (key === "w") {
      this.moveBoardHandler("up");
      return;
    }
    //down
    if (key === "s") {
      this.moveBoardHandler("down");
      return;
    }
  }
  printBoard(board) {
    for (let line in board) {
      let line_str = "";
      for (let number in board[line]) {
        let num = board[line][number];
        if (num.toString().length === 0) line_str += num + "    |  ";
        if (num.toString().length === 1) line_str += num + "   |  ";
        if (num.toString().length === 2) line_str += num + "  |  ";
        if (num.toString().length === 3) line_str += num + " |  ";
        if (num.toString().length === 4) line_str += num + "|  ";
      }
      console.log(line_str);
    }
  }
  moveBoardHandler(dir) {
    console.clear();
    let board = JSON.parse(JSON.stringify(this.state.board));

    if (dir === "right") {
      for (let row_index in board) {
        board[row_index] = this.moveRowRight(board[row_index], dir);
      }
    }
    if (dir === "left") {
      for (let row_index in board) {
        board[row_index] = this.moveRowLeft(board[row_index], dir);
      }
    }
    if (dir === "up") {
      for (let col_1 in board) {
        board = this.moveUp(board, col_1);
      }
    }
    if (dir === "down") {
      for (let col_1 in board) {
        board = this.moveDown(board, col_1);
      }
    }

    this.setState({ board });
    this.addNumberBoBoard(this.state.board);
  }
  moveRowRight = (row, dir) => {
    for (let loop in row) {
      for (let i = row.length; i > 0; i--) {
        row = this.checkTwoNumber(row, dir, i - 1, i);
      }
    }
    return row;
  };
  moveRowLeft = (row, dir) => {
    for (let loop in row) {
      for (let i = 0; i < row.length - 1; i++) {
        row = this.checkTwoNumber(row, dir, i, i + 1);
      }
    }
    return row;
  };
  moveUp = (board, col_i) => {
    let row = this.colToRow(board, col_i);
    row = this.moveRowLeft(row, "left");
    board = this.rowToCol(board, col_i, row);
    return board;
  };
  moveDown = (board, col_i) => {
    let row = this.colToRow(board, col_i);
    row = this.moveRowLeft(row, "right");
    board = this.rowToCol(board, col_i, row);
    return board;
  };
  colToRow = (board, col) => {
    let row = [];
    for (let r in board) {
      row.push(board[r][col]);
    }
    return row;
  };
  rowToCol = (board, col_i, col) => {
    for (let r in board) {
      board[r][col_i] = col[r];
    }
    return board;
  };
  checkTwoNumber = (row, dir, left_i, right_i) => {
    let right_num = row[right_i];
    let left_num = row[left_i];
    //console.log("row", row, "left", left_num, "right", right_num);
    if (dir === "right") {
      if (right_num === left_num) {
        row[right_i] = right_num * 2;
        row[left_i] = "";
      }
      if (right_num === "") {
        row[right_i] = left_num;
        row[left_i] = "";
      }
    }
    if (dir === "left") {
      if (right_num === left_num) {
        row[left_i] = left_num * 2;
        row[right_i] = "";
      }
      if (left_num === "") {
        row[left_i] = right_num;
        row[right_i] = "";
      }
    }
    return row;
  };
}
