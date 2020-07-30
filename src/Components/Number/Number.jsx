import React from "react";
import classes from "./Number.module.css";
export default (props) => {
  let style = {};
  style.backgroundColor = props.backgroundColor;
  style.color = props.color;
  style.fontSize = props.fontSize;

  return (
    <div className={classes.container} style={style}>
      <div>
        <label>{props.number}</label>
      </div>
    </div>
  );
};
