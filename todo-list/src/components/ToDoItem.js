const ToDoItem = ({toDoList, deleteToDoItem, toggleTodo}) => {

  const toDos = toDoList.map((toDoItem) => {
    const name_html = toDoItem.completed ? <del><span data-list-item-text>{toDoItem.name}</span></del> : <span data-list-item-text>{toDoItem.name}</span>
    return (
      <li key={toDoItem.id} className="list-item">
        <label className="list-item-label">
          <input type="checkbox" data-list-item-checkbox onChange={(e) => toggleTodo(toDoItem.id, e.target.checked)} />
          {name_html}
          <button onClick={() => deleteToDoItem(toDoItem.id)} data-button-delete>Delete</button>
        </label>
      </li>
    )
  })
  return (
    <ul id="list">
      {toDos}
    </ul>
  );

}

export default ToDoItem;