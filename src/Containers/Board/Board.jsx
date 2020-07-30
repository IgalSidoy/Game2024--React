import React, { Component } from "react";
import classes from "./Board.module.css";
import Number from "../../Components/Number/Number";
import colors from "../../Utili/numberColor";
export default class Board extends Component {
  render() {
    return (
      <div className={classes.container}>
        <Number
          number={2}
          color={colors[2].color}
          backgroundColor={colors[2].backgroundColor}
          fontSize={colors[2].fontSize}
        ></Number>
        <Number
          number={4}
          color={colors[4].color}
          backgroundColor={colors[4].backgroundColor}
          fontSize={colors[4].fontSize}
        ></Number>
        <Number
          number={8}
          color={colors[8].color}
          backgroundColor={colors[8].backgroundColor}
          fontSize={colors[8].fontSize}
        ></Number>
        <Number
          number={16}
          color={colors[16].color}
          backgroundColor={colors[16].backgroundColor}
          fontSize={colors[16].fontSize}
        ></Number>
        <Number
          number={32}
          color={colors[32].color}
          backgroundColor={colors[32].backgroundColor}
          fontSize={colors[32].fontSize}
        ></Number>
        <Number
          number={64}
          color={colors[64].color}
          backgroundColor={colors[64].backgroundColor}
          fontSize={colors[64].fontSize}
        ></Number>
        <Number
          number={128}
          color={colors[128].color}
          backgroundColor={colors[128].backgroundColor}
          fontSize={colors[128].fontSize}
        ></Number>
        <Number
          number={256}
          color={colors[256].color}
          backgroundColor={colors[256].backgroundColor}
          fontSize={colors[256].fontSize}
        ></Number>
        <Number
          number={512}
          color={colors[512].color}
          backgroundColor={colors[512].backgroundColor}
          fontSize={colors[512].fontSize}
        ></Number>
        <Number
          number={1024}
          color={colors[1024].color}
          backgroundColor={colors[1024].backgroundColor}
          fontSize={colors[1024].fontSize}
        ></Number>
        <Number
          number={2048}
          color={colors[2048].color}
          backgroundColor={colors[2048].backgroundColor}
          fontSize={colors[2048].fontSize}
        ></Number>
      </div>
    );
  }
}
