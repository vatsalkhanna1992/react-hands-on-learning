import { Link } from "react-router-dom";
import '../styles.css';
import useFetch from "../useFetch";
import { ErrorBoundary } from "../components/ErrorBoundary";

export const Users = () => {
  const {data, isError, isLoading, error} = useFetch("http://127.0.0.1:3002/users")
  return (
    isError ? <ErrorBoundary error={error} /> :
    <>
      { isLoading ? <div className="loading-spinner"></div> : (
        <div className={`container ${isLoading ? "loading" : ""}`}>
          <h1 className="page-title">Users</h1>
          <div className="card-grid">
            { data.map(user => {
                return (
                  <div className="card" key={user.id}>
                    <div className="card-header">{user.name}</div>
                    <div className="card-body">
                      <div>{user.company && user.company.name}</div>
                      <div>{user.website}</div>
                      <div>{user.email}</div>
                    </div>
                    <div className="card-footer">
                      <Link className="btn" to={"/users/" + user.id}>View</Link>
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
