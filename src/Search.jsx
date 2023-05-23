import React from "react";

const style = {
  form: `flex justify-between pb-2`,
  input: `border p-2 w-full text-xl rounded-md`,
  button: `border p-4 ml-2 bg-blue-400 rounded-md text-xl`,
};

const Search = ({
  qkeywords,
  setQKeywords,
  qpriority,
  setQPriority,
  qstatus,
  setQStatus,
  searchTodos,
}) => {
  return (
    <form onSubmit={searchTodos} className={style.form}>
      <input
        value={qkeywords}
        onChange={(e) => setQKeywords(e.target.value)}
        className={style.input}
        type="text"
        placeholder="Add keywords..."
      />
      <select
        value={qpriority}
        onChange={(e) => setQPriority(e.target.value)}
        id="priorityInput"
        className={style.input}
        placeholder="Select priority">
        <option value="">All priorities...</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <select
        value={qstatus}
        onChange={(e) => setQStatus(e.target.value)}
        id="priorityInput"
        className={style.input}
        placeholder="Select priority">
        <option value="">All States...</option>
        <option value="true">Done</option>
        <option value="false">Undone</option>
      </select>
      <button className={style.button}>Search</button>
    </form>
  );
};

export default Search;
