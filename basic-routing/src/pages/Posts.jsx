import { Link } from "react-router-dom";
import '../styles.css';
import useFetch from "../useFetch";
import { ErrorBoundary } from "../components/ErrorBoundary";

export const Posts = () => {
  const {data, isError, isLoading, error} = useFetch("http://127.0.0.1:3002/posts")
  return (
    isError ? <ErrorBoundary error={error} /> :
    <>
      { isLoading ? <div className="loading-spinner"></div> : (
        <div className={`container ${isLoading ? "loading" : ""}`}>
          <h1 className="page-title">Posts</h1>
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
                })
              }
          </div>
        </div>
      )}
    </>
  )
}