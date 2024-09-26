import useFetch from "../useFetch";
import '../styles.css';
import { ErrorBoundary } from "./ErrorBoundary";

export const Comments = ({postId}) => {
  const {data, isError, error} = useFetch("http://127.0.0.1:3002/posts/" + postId + "/comments")
  return (
    isError ? <ErrorBoundary error={error} /> :
    <>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        { data.map(comment => {
          return (
            <div className="card" key={comment.id}>
              <div className="card-body">
                <div className="text-sm mb-1">{comment.email}</div>
                {comment.body}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
