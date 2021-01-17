import React from "react";
import classNames from "classnames";

import "./badge.scss";

function Bage({ color, onClick, className }) {
  return (
    <i
      className={classNames(
        `badge `,
        {
          [`badge--${color}`]: color,
        },
        className
      )}
      onClick={onClick}
    ></i>
  );
}

export default Bage;
