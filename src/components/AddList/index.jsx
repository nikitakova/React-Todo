import React from "react";
import axios from "axios";

import List from "./../List";
import Badge from "./../Badge";

import closeSvg from "./../../assets/img/close.svg";

import "./addList.scss";

function AddButtonList({ colors, onAdd }) {
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const [selectedColor, setSelectColor] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectColor(colors && colors[0].id);
    }
  }, [colors]);

  const showPopup = () => setVisiblePopup(true);
  const onClose = () => {
    setInputValue("");
    setSelectColor(colors[0].id);
    setVisiblePopup(false);
  };

  const addList = () => {
    if (!inputValue) {
      alert("Введите название списка!🤗");
      return;
    }

    setIsLoading(true);

    axios
      .post("http://localhost:3001/lists", {
        name: inputValue,
        colorId: selectedColor,
      })
      .then(({ data }) => {
        const color = colors.filter((color) => color.id === selectedColor)[0];
        const listObj = { ...data, color: { name: color.name, hex: color.hex }, tasks: [] };
        onAdd(listObj);
        onClose();
      })
      .catch(() => alert("Ошибка при добавлении списка"))
      .finally(() => setIsLoading(false));
  };

  const handleKeyPress = (e) => {
    if(e.key === "Enter") addList();
  }

  return (
    <div className="add-list">
      <List
        items={[
          {
            className: "list__add-button",
            name: "Добавить список",
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
          },
        ]}
        onClick={showPopup}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <div className="add-list__popup-close-btn" onClick={onClose}>
            <img src={closeSvg} alt="Close button" />
          </div>
          <input
            className="field"
            type="text"
            placeholder="Название папки"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <div className="add-list__popup-colors">
            {colors.map(({ id, name }) => (
              <Badge
                key={`${name}_${id}`}
                className={selectedColor === id && "active"}
                color={name}
                onClick={() => setSelectColor(id)}
              />
            ))}
          </div>
          <button className="button" onClick={addList}>
            {isLoading ? "Добавление..." : "Добавить"}
          </button>
        </div>
      )}
    </div>
  );
}

export default AddButtonList;
