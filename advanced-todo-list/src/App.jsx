import { useEffect, useState, useReducer, createContext } from "react"
import "./styles.css"
import { TodoItem } from "./components/TodoItem"
import { FilterForm } from "./components/FilterForm";
import { NewTodoForm } from "./components/NewTodoForm";

export const TodoContext = createContext();

function reducer(state, action) {
  switch(action.type) {
    case 'addTodo':
      if (state.length > 0) {
        return [
          ...state,
          action.payload.value
        ]
      }
      return [
        action.payload.value
      ]
    case 'toggleTodo':
      return state.map(todo => {
        if (todo.id === action.payload.todoId) {
          return {
            ...todo,
            completed: action.payload.completed
          }
        }
        return todo
      })
    case 'deleteTodo':
      return state.filter(todo => todo.id !== action.payload.todoId)
    case 'updateTodo':
      return state.map(todo => {
        if (todo.id === action.payload.todoId) {
          return {...todo, name: action.payload.name}
        }
        return todo
      })
    case 'setFilter':
      return !state;
    default:
      throw new Error("Action doesn't exists.");
  }
}

function App() {
  const [newTodoName, setNewToDoName] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterHideCompleted, setFilterHideCompleted] = useState(false);
  const todo = localStorage.getItem("todos");
  const [todos, dispatchTodos] = useReducer(reducer, todo !== undefined && todo !== null ? JSON.parse(todo) : []);

  function addNewTodo() {
    if (newTodoName === "") return
    dispatchTodos({
      type: 'addTodo',
      payload: {
        value: {
          name: newTodoName, completed: false, id: crypto.randomUUID()
        }
      }
    })
    setNewToDoName("")
  }

  function toggleTodo(todoId, completed) {
    dispatchTodos({
      type: 'toggleTodo',
      payload: {
        todoId,
        completed
      }
    })
  }

  function deleteTodo(todoId) {
    dispatchTodos({
      type: 'deleteTodo',
      payload: {
        todoId
      }
    })
  }

  function updateTodo(todoId, name) {
    dispatchTodos({
      type: 'updateTodo',
      payload: {
        todoId,
        name
      }
    })
  }

  const filteredTodos = todos.filter(todo => {
    if (filterHideCompleted && todo.completed) {
      return false;
    }
    return todo.name.includes(filterName)
  })

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])


  return (
    <>
      <FilterForm name={filterName} setName={setFilterName} hideCompleted={filterHideCompleted} setHideCompleted={setFilterHideCompleted} />

      <ul id="list">
        {filteredTodos.map(todo => {
          return (
            <TodoContext.Provider value={{key: todo.id, ...todo, toggleTodo, deleteTodo, updateTodo}}>
              <TodoItem />
            </TodoContext.Provider>
          )
        })}
      </ul>

      <NewTodoForm newTodoName={newTodoName} setNewToDoName={setNewToDoName} addNewTodo={addNewTodo} />
    </>
  )
}

export default App
