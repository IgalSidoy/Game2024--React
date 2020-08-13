import React, { Component } from "react";
import classes from "./Board.module.css";
import Number from "../Number/Number";
import colors from "../../Utili/numberColor";
export default class Board extends Component {
  state = {
    board: [
      [64, 8, 4, ""],
      [32, 4, 2, 4],
      [16, 8, 16, 2],
      [8, 4, 2, 16],
    ],
    number: 2,
  };

  initBoard() {
    let board = [
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", 4, 2],
    ];

    this.setState({ board });
  }

  insertNumber(board, number, row_i, col_i) {
    board[row_i][col_i] = number;
    return board;
  }
  addNumberBoBoard = async (board) => {
    let empty = [];
    for (let row_i in board) {
      for (let col_i in board[row_i]) {
        if (board[row_i][col_i] === "") {
          empty.push(row_i + "-" + col_i);
        }
      }
    }
    if (empty.length === 0) {
      alert("game over");
      this.initBoard();
      return;
    }

    let selected = Math.round(Math.random() * empty.length - 1);
    if (selected < 0) selected = 0;
    let row_i = empty[selected].split("-")[0];
    let col_i = empty[selected].split("-")[1];
    this.insertNumber(board, this.state.number, row_i, col_i);
    this.setState({
      board,
    });
  };

  componentDidMount() {
    window.addEventListener("keypress", (e) => {
      this.onKeyDownHandler(e);
    });
    this.initBoard();
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
                  paddingTop={colors[number].paddingTop}
                ></Number>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
  onKeyDownHandler = async (e) => {
    let key = e.key.toLowerCase();
    //left
    if (key === "a") {
      await this.moveBoardHandler("left");
    }
    //right
    else if (key === "d") {
      await this.moveBoardHandler("right");
    }
    //up
    else if (key === "w") {
      await this.moveBoardHandler("up");
    }
    //down
    else if (key === "s") {
      await this.moveBoardHandler("down");
    }
  };
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
  moveBoardHandler = async (dir) => {
    let board = JSON.parse(JSON.stringify(this.state.board));

    if (dir === "right") {
      for (let row_index in board) {
        board[row_index] = await this.moveRowRight(board[row_index], dir);
      }
    }
    if (dir === "left") {
      for (let row_index in board) {
        board[row_index] = await this.moveRowLeft(board[row_index], dir);
      }
    }
    if (dir === "up") {
      for (let col_1 in board) {
        board = await this.moveUp(board, col_1);
      }
    }
    if (dir === "down") {
      for (let col_1 in board) {
        board = await this.moveDown(board, col_1);
      }
    }

    this.props.updateScoreHandler(this.calcScore(board));
    this.setState({ board });

    this.addNumberBoBoard(this.state.board);
  };

  calcScore = (board) => {
    let score = 0;
    let max = 4;
    for (let row in board) {
      for (let col in board[row]) {
        let number = board[row][col];
        if (number === 2) continue;

        //(n−1) 2ⁿ
      }
    }
    score = (max - 1) * Math.pow(2, max);
    return score;
  };
  moveRowRight = async (row, dir) => {
    let is_added = false;
    for (let loop in row) {
      for (let i = row.length; i > 0; i--) {
        let res = this.checkTwoNumber(row, dir, i - 1, i, is_added);
        row = res.row;
        is_added = res.is_added;
      }
    }
    return row;
  };
  moveRowLeft = async (row, dir) => {
    let is_added = false;
    for (let loop in row) {
      for (let i = 0; i < row.length - 1; i++) {
        let res = this.checkTwoNumber(row, dir, i, i + 1, is_added);

        row = res.row;
        is_added = res.is_added;
      }
    }
    return row;
  };
  moveUp = async (board, col_i) => {
    let row = this.colToRow(board, col_i);
    row = await this.moveRowLeft(row, "left");
    board = this.rowToCol(board, col_i, row);
    return board;
  };
  moveDown = async (board, col_i) => {
    let row = this.colToRow(board, col_i);
    row = await this.moveRowLeft(row, "right");
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
  checkTwoNumber = (row, dir, left_i, right_i, is_added) => {
    let right_num = row[right_i];
    let left_num = row[left_i];
    let result = {};
    //console.log("row", row, "left", left_num, "right", right_num);
    if (dir === "right") {
      if (right_num === left_num) {
        if (is_added) {
          result.row = row;
          result.is_added = is_added;
          return result;
        }
        row[right_i] = right_num * 2;
        row[left_i] = "";
        is_added = true;
      }
      if (right_num === "") {
        row[right_i] = left_num;
        row[left_i] = "";
      }
    }
    if (dir === "left") {
      if (right_num === left_num) {
        if (is_added) {
          result.row = row;
          result.is_added = is_added;
          return result;
        }
        row[left_i] = left_num * 2;
        row[right_i] = "";
        is_added = true;
      }
      if (left_num === "") {
        row[left_i] = right_num;
        row[right_i] = "";
      }
    }

    result.row = row;
    result.is_added = is_added;
    return result;
  };
}
