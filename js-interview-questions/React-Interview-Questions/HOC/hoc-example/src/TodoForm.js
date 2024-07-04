import React from "react";

const TodoForm = ({ newTodo, setNewTodo, addTodo }) => {
  console.log(" --", newTodo);
  // console.log(" ---", typeof setNewTodo);
  // console.log("- ---", typeof addTodo);
  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a new todo"
      />
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
};

export default TodoForm;
