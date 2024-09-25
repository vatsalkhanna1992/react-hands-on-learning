import useFetch from "../useFetch";
import '../styles.css';
import { ErrorBoundary } from "./ErrorBoundary";

export const TodosByUser = ({userId}) => {
  const {data, isError, error} = useFetch("http://127.0.0.1:3002/todos?userId=" + userId)
  return (
    isError ? <ErrorBoundary error={error} /> :
    <>
      <h3 className="mt-4 mb-2">Todos</h3>
      <div className="container">
        <ul>
          {data.map(todo => {
            return (
              <li className={todo.completed ? "strike-through" : ""} key={todo.id}>{todo.title}</li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
