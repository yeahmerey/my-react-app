import { NavLink } from "react-router-dom";
import { useAuth } from "../../AuthContext.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase.js";
import "./NavBar.css";
import { useState } from "react";
import LogoutButton from "../LogoutButton/LogoutButton.jsx";
export default function NavBar() {
  const [err, setErr] = useState();
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Signed out");
    } catch (e) {
      setErr(e.message);
    }
  };
  return (
    <nav className="nav">
      {err}
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/items">Characters</NavLink>
      {user ? (
        <>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink
            to="/login"
            onClick={handleSignOut}
            style={{ cursor: "pointer" }}
          >
            Logout
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </>
      )}
    </nav>
  );
}
