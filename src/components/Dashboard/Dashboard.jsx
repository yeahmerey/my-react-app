import { useNavigate, Outlet } from "react-router-dom";
import Info from "../Info/Info.jsx";
import { NavLink } from "react-router";
const link = {
  marginRight: 10,
  textDecoration: "none",
  color: "black",
};

const active = ({ isActive }) => ({
  ...link,
  fontWeight: isActive ? "bold" : "normal",
});
export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <h2>Dashboard</h2>
      <button onClick={() => navigate("/login")}>Go to Login</button>
      <button onClick={() => navigate(-1)}>Back</button>
      <Info />
      <nav>
        <NavLink to={"stats"} style={active}>
          Stats
        </NavLink>
        <NavLink to={"settings"} style={active}>
          Settings
        </NavLink>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
}
