import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AddTaskForm from "./AddTaskForm";
import Task from "./Task";

import editSvg from "./../../assets/img/edit.svg";

import "./tasks.scss";

function Tasks({
  list,
  withoutEmpty,
  onEditTitle,
  onAddTask,
  onCompleteTask,
  onRemoveTask,
  onEditTask,
}) {
  const editTitle = () => {
    const newTitle = window.prompt("Название списка", list.name);
    if (newTitle) {
      axios
        .patch(`http://localhost:3001/lists/${list.id}`, {
          name: newTitle,
        })
        .then(() => {
          onEditTitle(list.id, newTitle);
        })
        .catch(() => alert("Не удалось обновить название списка!"));
    }
  };

  return (
    <div className="tasks">
      <Link to={`/lists/${list.id}`}>
        <h2 style={{ color: list.color.hex }} className="tasks__title">
          {list.name}
          <img src={editSvg} alt="Edit icon" onClick={editTitle} />
        </h2>
      </Link>     

      <div className="tasks__items">
        {!withoutEmpty && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
        {list.tasks &&
          list.tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              list={list}
              onRemove={onRemoveTask}
              onEdit={onEditTask}
              onComplete={onCompleteTask}
            />
          ))}
        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
}

export default Tasks;
