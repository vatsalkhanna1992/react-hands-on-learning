export const ErrorBoundary = ({error}) => {
  let msg = (
    <>
      <h1>Oops! Something went wrong.</h1>
      <p>We're working on getting this fixed. Please try again later.</p>
    </>
  )
  if (process.env.NODE_ENV === 'development') {
    msg = (
      <pre>{error.stack}</pre>
    )
  }
  return (
    msg
  )
}
