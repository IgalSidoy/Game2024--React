import React, { Component } from "react";
import Board from "../../Components/Board/Board";
import classes from "./Game.module.css";
export default class Game extends Component {
  state = {
    title: "2048",
    score: 0,
  };
  render() {
    return (
      <div className={classes.container}>
        <div className={classes.row}>
          <div className={classes.col3}>
            <div className={classes.title}>
              <label>{this.state.title}</label>
            </div>
          </div>
          <div className={classes.col1}>
            <div className={classes.score}>
              <label className={classes.score_title}>score</label>
              <label className={classes.score_value}>{this.state.score}</label>
            </div>
          </div>
        </div>
        <Board updateScoreHandler={this.updateScoreHandler}></Board>
      </div>
    );
  }
  updateScoreHandler = (score) => {
    this.setState({ score });
  };
}
