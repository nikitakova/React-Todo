import React from "react";
import classNames from "classnames";
import axios from "axios";

import Badge from "./../Badge";

import removeSvg from "./../../assets/img/remove.svg";

import "./list.scss";

function List({
  items,
  isRemovable,
  activeItem,
  onRemove,
  onClickItem,
  onClick,
}) {
  const removeList = (item) => {
    if (window.confirm("Вы действительно хотите удалить список?🤔")) {
      axios.delete(`http://localhost:3001/lists/${item.id}`).then(() => {
        onRemove(item.id);
      });
    }
  };

  return (
    <ul className="list" onClick={onClick}>
      {items.map((item, index) => (
        <li
          key={`${item.name}_${index}`}
          className={classNames(item.className, {
            active: (activeItem && item.id === activeItem.id) || item.active,
          })}
          onClick={onClickItem ? () => onClickItem(item) : null}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>
            {item.name}
            {item.tasks && ` (${item.tasks.length})`}
          </span>
          {isRemovable && (
            <img
              src={removeSvg}
              className="list__remove-icon"
              alt="Remove icon"
              onClick={() => removeList(item)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default List;
