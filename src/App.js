import React, { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineCloseCircle } from "react-icons/ai";
import { TbArrowsDownUp } from "react-icons/tb";

import Todo from "./Todo";
import Search from "./Search";

import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-t from-[dodgerblue] to-[deepskyblue]`,
  container: `bg-slate-100 w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between pb-2`,
  input: `border p-2 w-full text-xl rounded-md`,
  button: `border p-4 ml-2 bg-blue-400 rounded-md text-xl`,
  count: `text-center p-2`,
  close: `border p-4 ml-2 bg-red-400 rounded-md`,
  addbutton: `border text-xl p-4 bg-blue-400 rounded-md w-full`,
  datalist: `border p-2 w-full text-xl rounded-md`,
  prioritybutton: `flex text-center pt-2 pl-5 m-auto`,
  duebutton: `flex text-center pt-2 pr-2 m-auto`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [qkeywords, setQKeywords] = useState("");
  const [qpriority, setQPriority] = useState("");
  const [qstatus, setQStatus] = useState("");
  // const [sortbyduedate, setSortbyduedate] = useState(false);
  const [sortbypriority, setSortbypriority] = useState(false);
  const [newPriority, setNewPriority] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  //  Create todo
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("please enter a valid string");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
      due: dueDate, // Include the due date in the new todo
      priority: priority, // Include the priority in the new todo
    });
    setInput("");
    setDueDate(null);
    setShowForm(false);
    setPriority(""); // Reset priority state after adding the todo
  };

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe;
  }, []);

  // Update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  // Edit todo
  const editTodo = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      priority: newPriority,
      due: newDueDate,
    });
  };

  // Search todos
  const searchTodos = (e) => {
    e.preventDefault();
    let filteredTodos = [...todos];

    // Filter by keywords
    if (qkeywords.trim() !== "") {
      filteredTodos = filteredTodos.filter((todo) =>
        todo.text.toLowerCase().includes(qkeywords.toLowerCase())
      );
    }

    // Filter by priority
    if (qpriority !== "") {
      filteredTodos = filteredTodos.filter(
        (todo) => todo.priority === qpriority
      );
    }

    // Filter by state
    if (qstatus !== "") {
      if (qstatus === "true") {
        filteredTodos = filteredTodos.filter((todo) => todo.completed);
      } else if (qstatus === "false") {
        filteredTodos = filteredTodos.filter((todo) => !todo.completed);
      }
    }

    setTodos(filteredTodos);
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>ToDo App</h3>
        <Search
          qkeywords={qkeywords}
          setQKeywords={setQKeywords}
          qpriority={qpriority}
          setQPriority={setQPriority}
          qstatus={qstatus}
          setQStatus={setQStatus}
          searchTodos={searchTodos}
        />
        {showForm ? (
          <form onSubmit={createTodo} className={style.form}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={style.input}
              type="text"
              placeholder="Add new..."
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              id="priorityInput"
              className={style.input}
              placeholder="Select priority">
              <option value="">Select priority...</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <input
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={style.input}
              type="date"
              placeholder="Due date..."
            />
            <button className={style.button}>
              <AiOutlinePlus size={27} />
            </button>
            <button className={style.close} onClick={() => setShowForm(false)}>
              <AiOutlineCloseCircle size={27} />
            </button>
          </form>
        ) : (
          <button className={style.addbutton} onClick={() => setShowForm(true)}>
            Add a new to-do
          </button>
        )}
        <div className="grid grid-cols-4">
          <div></div>
          <div
            className={style.prioritybutton}
            onClick={() => setSortbypriority(true)}>
            <strong>Priority</strong>
            <TbArrowsDownUp size={27} />
          </div>
          <div
            className={style.duebutton}
            // onClick={() => setSortbyduedate(true)}
          >
            <strong>Due</strong>
            <TbArrowsDownUp size={27} />
          </div>
          <div></div>
        </div>
        <div>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              newPriority={setNewPriority}
              newDueDate={setNewDueDate}
              editTodo={editTodo}
            />
          ))}
        </div>
        {todos.length < 1 ? null : (
          <p className={style.count}>You have {todos.length} todos</p>
        )}
      </div>
    </div>
  );
}

export default App;
