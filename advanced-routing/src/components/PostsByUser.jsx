import useFetch from "../useFetch";
import '../styles.css';
import { Link } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";

export const PostsByUser = ({userId}) => {
  const { data, isError, error } = useFetch("http://127.0.0.1:3002/posts?userId=" + userId)
  return (
    isError ? <ErrorBoundary error={error} /> :
    <>
      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        { data.map(post => {
          return (
            <div className="card" key={post.id}>
              <div className="card-header">
                {post.title}
              </div>
              <div className="card-body">
                <div className="card-preview-text">
                  {post.body}
                </div>
              </div>
              <div className="card-footer">
                <Link className="btn" to={"/posts/" + post.id}>View</Link>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
