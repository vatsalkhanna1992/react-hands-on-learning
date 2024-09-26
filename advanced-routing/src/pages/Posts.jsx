import { Link } from "react-router-dom";
import { useRef, useState, useEffect} from "react";
import '../styles.css';
import useFetch from "../useFetch";
import { ErrorBoundary } from "../components/ErrorBoundary";

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const {data, isError, isLoading, error} = useFetch("http://127.0.0.1:3002/posts")


  const [isFilterError, setIsFilterError] = useState(false);
  const [filterError, setFilterError] = useState('');

  useEffect(() => {
    setPosts(data);
  }, [data]);

  const query = useRef("");
  const userId = useRef("");

  const filterPost = async (e) => {
    e.preventDefault();

    try {
      let url = 'http://127.0.0.1:3002/posts?q=' + query.current.value;
      if (userId.current.value !== '') {
        url += "&userId=" + userId.current.value
      }
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setPosts(data);
    }
    catch (e) {
      setIsFilterError(true);
      setFilterError(e)
    }
  }
  return (

    isError || isFilterError ? <ErrorBoundary error={isError ? error : filterError} /> :
    <>
      { isLoading ? <div className="loading-spinner"></div> : (
        <div className={`container ${isLoading ? "loading" : ""}`}>
          <h1 className="page-title">
            Posts
            <div className="title-btns">
              <Link className="btn btn-outline" to="/posts/new">New</Link>
            </div>
          </h1>
          <form className="form mb-4" onSubmit={filterPost}>
            <div className="form-row">
              <div className="form-group">
                <label>Query</label>
                <input type="search" name="query" id="query" ref={query}/>
              </div>
              <div className="form-group">
                <label>Author</label>
                <select type="search" name="userId" id="userId" ref={userId}>
                  <option value="">Any</option>
                  <option value="1">Leanne Graham</option>
                  <option value="2">Ervin Howell</option>
                  <option value="3">Clementine Bauch</option>
                  <option value="4">Patricia Lebsack</option>
                  <option value="5">Chelsey Dietrich</option>
                  <option value="6">Mrs. Dennis Schulist</option>
                  <option value="7">Kurtis Weissnat</option>
                  <option value="8">Nicholas Runolfsdottir V</option>
                  <option value="9">Glenna Reichert</option>
                  <option value="10">Clementina DuBuque</option>
                </select>
              </div>
              <button className="btn">Filter</button>
            </div>
          </form>
          <div className="card-grid">
              { posts.map(post => {
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