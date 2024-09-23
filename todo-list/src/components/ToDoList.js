import { useState } from "react";
import ToDoItem from "./ToDoItem";

const ToDoList = () => {

  const [toDoItemName, setToDoItemName] = useState("");
  const [toDoList, setToDoList] = useState([]);

  function addTodo() {
    if (toDoItemName === '') {
      return;
    }
    setToDoList((currentTodos) => {
      return [
        ...currentTodos,
        { name: toDoItemName, completed: false, id: crypto.randomUUID() }
      ]
    })

    setToDoItemName("");
  }

  function updateToDoName(value) {
    setToDoItemName(value);
  }

  function toggleTodo(id, completed) {
    toDoList.map(toDo => {
      if (toDo.id === id) {
        toDo.completed = completed
      }

      return toDo;
    })

    setToDoList(toDoList);
  }

  function deleteToDoItem(id) {
    setToDoList((currentTodos) => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
      <ToDoItem toDoList={toDoList} deleteToDoItem={deleteToDoItem} toggleTodo={toggleTodo} />
      <div id="new-todo-form">
        <label>New Todo</label>
        <input type="text" onChange={(e) => updateToDoName(e.target.value)} value={toDoItemName} /><br />
        <button onClick={addTodo}>Add Todo</button>
      </div>
    </>
  );
}

export default ToDoList;