import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { PostsByUser } from "../components/PostsByUser";
import { TodosByUser } from "../components/TodosByUser";
import { ErrorBoundary } from "../components/ErrorBoundary";

export const User = () => {
  const { id } = useParams();
  const {data, isError, isLoading, error} = useFetch("http://127.0.0.1:3002/users/" + id)
  return (
    isError ? <ErrorBoundary error={error}/> :
    <>
      { isLoading ? <div className="loading-spinner"></div> : (
        <div className={`container ${isLoading ? "loading" : ""}`}>
          <h1 className="page-title">{data.name}</h1>
          <div className="page-subtitle">{data.email}</div>
          <div><b>Company:</b> {data.company && data.company.name}</div>
          <div><b>Website:</b> {data.website}</div>
          <div><b>Address:</b> {data.address && data.address.street} {data.address && data.address.suite}, {data.address && data.address.city}, {data.address && data.address.zipcode}</div>
          <PostsByUser userId={id} />
          <TodosByUser userId={id} />
        </div>
      )}
    </>
  )
}
