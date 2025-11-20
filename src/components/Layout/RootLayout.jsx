import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar.jsx";
import "./RootLayout.css";
export default function RootLayout() {
  return (
    <div className="layout">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
