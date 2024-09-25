import { createBrowserRouter, Navigate } from "react-router-dom"
import { RootLayout } from "./layout/RootLayout"
import { Users } from "./pages/Users"
import { Posts } from "./pages/Posts"
import { Todos } from "./pages/Todos"
import { Post } from "./pages/Post"
import { User } from "./pages/User"
import { PageNotFound } from "./pages/PageNotFound"
import { ErrorBoundary } from "./components/ErrorBoundary"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { errorElement: <ErrorBoundary />, children: [
        { index: true, element: <Navigate to="/posts" />},
        { path: "posts", children: [
          { index: true, element: <Posts />},
          { path: ":id", element: <Post /> }
        ]},
        { path: "users", children: [
          { index: true, element: <Users /> },
          { path: ":id", element: <User />}
        ]},
        { path: "todos", element: <Todos />},
        { path: "*", element: <PageNotFound />}
      ]},
    ]
  }
])
