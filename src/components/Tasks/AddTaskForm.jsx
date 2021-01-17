import React from "react";
import axios from "axios";

import addSvg from "./../../assets/img/add.svg";

function AddTaskForm({ list, onAddTask }) {
  const [visibleForm, setVisibleForm] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const toggleFormVisible = () => {
    setVisibleForm(!visibleForm);
    setInputValue("");
  };

  const addTask = () => {
    if (!inputValue) return;
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false,
    };

    setIsLoading(true);

    axios
      .post(`http://localhost:3001/tasks/`, obj)
      .then(({ data }) => {
        onAddTask(list.id, data);
        toggleFormVisible();
      })
      .catch(() => alert("Ошибка при добавлении задачи"))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div className="tasks__form-new" onClick={toggleFormVisible}>
          <img src={addSvg} alt="Add icon" />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
            className="field"
            type="text"
            placeholder="Текст задачи"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="button" disabled={isLoading} onClick={addTask}>
            {isLoading ? "Добавление..." : "Добавить задачу"}
          </button>
          <button className="button button--grey" onClick={toggleFormVisible}>
            Отмена
          </button>
        </div>
      )}
    </div>
  );
}

export default AddTaskForm;
