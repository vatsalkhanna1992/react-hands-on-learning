import { useParams } from "react-router-dom";
import useFetch from "../useFetch"
import { ErrorBoundary } from "../components/ErrorBoundary";
import { PostForm } from "../components/PostForm";

export const EditPost = () => {
  const { id } = useParams();
  const {data, isError, isLoading, error} = useFetch('http://127.0.0.1:3002/posts/' + id);

  return (
    isError ? <ErrorBoundary error={error} /> :
    isLoading ? <div className="loading-spinner"></div> :
    <PostForm data={data} type="update" />
  )
}