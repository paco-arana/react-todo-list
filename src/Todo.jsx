import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
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

const Todo = ({
  todo,
  toggleComplete,
  deleteTodo,
  newPriority,
  setNewPriority,
  newDueDate,
  setNewDueDate,
  editTodo,
}) => {
  // Convert the dueDate object to a Date object
  const dueDate = todo.due ? todo.due : null;
  const priority = todo.priority ? todo.priority : null;
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      {showForm ? (
        <form onSubmit={editTodo} className={style.form}>
          <div className="grid grid-cols-4">
            <div>
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
            <div>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
                id="priorityInput"
                className={style.input}
                placeholder="Select priority"
                defaultValue="Select New Priority">
                <option value="">Select New Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div>
              <input
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className={style.input}
                type="date"
                defaultValue={dueDate}
              />
            </div>
            <div>
              <button className={style.button}>Save Changes</button>
              <button
                className={style.close}
                onClick={() => setShowForm(false)}>
                <AiOutlineCloseCircle size={27} />
              </button>
            </div>
          </div>
        </form>
      ) : (
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
            <div className={style.justifycenter}>
              {dueDate && <div>{dueDate.toString()}</div>}{" "}
            </div>
            <div className={style.justifyright}>
              <button class={style.icon} onClick={() => setShowForm(true)}>
                Edit
              </button>
              <button class={style.icon} onClick={() => deleteTodo(todo.id)}>
                {<FaRegTrashAlt />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
