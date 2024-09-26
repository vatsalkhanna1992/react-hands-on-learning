

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateTitle, validateBody, validateUser } from "../validators";
import { ErrorBoundary } from "./ErrorBoundary";

export const PostForm = ({type, data = []}) => {
  const title = useRef("");
  const userId = useRef("");
  const body = useRef("");
  const [titleError, setTitleError] = useState('');
  const [bodyError, setBodyError] = useState('');
  const [userError, setUserError] = useState('');

  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const hasValidationErrors = () => {
    const titleErrors = validateTitle(title.current.value)
    setTitleError(titleErrors)

    const bodyErrors = validateBody(body.current.value)
    setBodyError(bodyErrors)

    const userErrors = validateUser(userId.current.value)
    setUserError(userErrors)

    if (titleErrors.length !== 0 || bodyErrors.length !== 0 || userErrors.length !== 0) {
      setIsSubmitting(false)
      return true
    }
    return false;
  }

  const createPost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true)

    if (hasValidationErrors()) {
      return false;
    }

    callFetch('http://127.0.0.1:3002/posts', 'POST')
  }

  const updatePost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true)

    if (hasValidationErrors()) {
      return false;
    }

    callFetch('http://127.0.0.1:3002/posts/' + data.id, 'PUT')
  }

  const callFetch = async (url, method) => {
    const formData = {title: title.current.value, userId: userId.current.value, body: body.current.value }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const post = await response.json();
      navigate('/posts/' + post.id);
    }
    catch (error) {
      setIsError(true)
      setError(error)
    }
    finally {
      setIsSubmitting(false)
    }
  }

  return (
    isError ? <ErrorBoundary error={error} /> :
    <div className="container">
      <h1 className="page-title">{type === 'create' ? "New Post" : "Edit Post"}</h1>
      <form method="post" className="form" onSubmit={type === 'create' ? createPost : updatePost}>
        <div className="form-row">
          <div className={titleError.length > 0 ? "form-group error" : "form-group"}>
            <label>Title</label>
            <input type="text" name="title" id="title" defaultValue={data && data.title} ref={title} />
            {titleError.length > 0 ? <div className="error-message">{titleError}</div> : ""}
          </div>
          <div className={userError.length > 0 ? "form-group error" : "form-group"}>
            <label>Author</label>
            <select name="userId" id="userId" defaultValue={data && data.userId} ref={userId}>
              <option value="">- Select -</option>
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
            {userError.length > 0 ? <div className="error-message">{userError}</div> : ""}
          </div>
        </div>
        <div className="form-row">
          <div className={bodyError.length > 0 ? "form-group error" : "form-group"}>
            <label>Body</label>
            <textarea name="body" id="body" defaultValue={data && data.body} ref={body}></textarea>
            {bodyError.length > 0 ? <div className="error-message">{bodyError}</div> : ""}
          </div>
        </div>
        <div className="form-row form-btn-row">
          <a className="btn btn-outline" href="/posts/2">Cancel</a>
          <button className="btn" disabled={isSubmitting ? "disabled" : ""}>Save</button>
        </div>
      </form>
    </div>
  )
}