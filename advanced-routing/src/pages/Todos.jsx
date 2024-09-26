import useFetch from "../useFetch"
import '../styles.css';
import { ErrorBoundary } from "../components/ErrorBoundary";

export const Todos = () => {
  const {data, isError, isLoading, error} = useFetch("http://127.0.0.1:3002/todos")
  return (
    isError ? <ErrorBoundary error={error} /> :
    <>
      { isLoading ? <div className="loading-spinner"></div> : (
          <div className={`container ${isLoading ? "loading" : ""}`}>
          <h1 className="page-title">Todos</h1>
          <ul>
            {data.map(todo => {
              return (
                <li className={todo.completed ? "strike-through" : ""} key={todo.id}>{todo.title}</li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}
