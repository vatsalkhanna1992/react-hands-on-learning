import { Link, useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { Comments } from "../components/Comments";
import '../styles.css';
import { ErrorBoundary } from "../components/ErrorBoundary";

export const Post = () => {
  const { id } = useParams();
  const {data, isLoading, isError, error} = useFetch("http://127.0.0.1:3002/posts/" + id)
  const userData = useFetch("http://127.0.0.1:3002/users/" + data.userId)

  return (
    isError ? <ErrorBoundary error={error} /> :
    <>
      { isLoading || userData.isLoading ? <div className="loading-spinner"></div> : (
        <div className={`container ${isLoading ? "loading" : ""}`}>
          <h1 className="page-title">
            {data.title}
          </h1>
          <span className="page-subtitle">By: <Link to={"/users/" + data.userId}>{ userData.data.name }</Link></span>
          <div>
            {data.body}
          </div>
          <Comments postId={id}/>
        </div>
      )}
    </>
  )
}