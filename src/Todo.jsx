import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const style = {
  li: `justify-between bg-slate-200 p-4 my-2 capitalize`,
  liComplete: `justify-between bg-slate-400 p-4 my-2 capitalize`,
  row: `flex text-center`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex items-center`,
  close: `border p-4 ml-2 bg-red-400 rounded-md`,
  addbutton: `border text-xl p-4 bg-blue-400 rounded-md w-full`,
  justifyright: `text-right`,
  justifycenter: `text-center`,
  icon: `pl-4`,
};

const Todo = ({ todo, toggleComplete, deleteTodo }) => {
  // Convert the dueDate object to a Date object
  const dueDate = todo.due ? todo.due : null;
  const priority = todo.priority ? todo.priority : null;

  return (
    <div className={todo.completed ? style.liComplete : style.li}>
      <div className="grid grid-cols-4">
        <div className={style.row}>
          <input
            onChange={() => toggleComplete(todo)}
            type="checkbox"
            checked={todo.completed ? "checked" : ""}
          />
          <p
            onClick={() => toggleComplete(todo)}
            className={todo.completed ? style.textComplete : style.text}>
            {todo.text}
          </p>
        </div>
        <div className={style.justifycenter}>
          {priority && <div>{priority}</div>}{" "}
        </div>
        <div className={style.justifyright}>
          {dueDate && <div>{dueDate.toString()}</div>}{" "}
        </div>
        <div className={style.justifyright}>
          <button class={style.icon} onClick={() => deleteTodo(todo.id)}>
            Edit
          </button>
          <button class={style.icon} onClick={() => deleteTodo(todo.id)}>
            {<FaRegTrashAlt />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
