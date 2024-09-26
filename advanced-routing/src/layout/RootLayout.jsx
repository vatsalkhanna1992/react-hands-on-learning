import { Outlet, ScrollRestoration } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const RootLayout = () => {
  return (
    <>
      <Navbar />
      <ScrollRestoration />
      <Outlet />
    </>
  )
}