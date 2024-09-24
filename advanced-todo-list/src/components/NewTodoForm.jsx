export const NewTodoForm = ({newTodoName, setNewToDoName, addNewTodo}) => {
  return (
    <div id="new-todo-form">
      <label htmlFor="todo-input">New Todo</label>
      <input
        type="text"
        id="todo-input"
        value={newTodoName}
        onChange={e => setNewToDoName(e.target.value)}
      />
      <button onClick={addNewTodo}>Add Todo</button>
    </div>
  )
}
