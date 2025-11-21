import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../AuthContext.jsx";
import { auth, signInWithGooglePopup } from "../../services/firebase.js";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
export default function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setErr("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      navigate("/profile");
    } catch (e) {
      setErr(e.message);
    }
    setLoading(false);
  };
  const handleGoogle = async () => {
    setErr("");
    setLoading(true);
    try {
      await signInWithGooglePopup();
      navigate("/profile");
    } catch (e) {
      setErr(e.message);
    }
    setLoading(false);
  };
  return (
    <>
      <h2>{user ? "You are already logged in" : "Login"} </h2>
      <div>
        <input
          type={"email"}
          placeholder={"Enter your email"}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type={"password"}
          placeholder={"Enter your password"}
          onChange={(e) => setPass(e.target.value)}
          required
        />
      </div>

      {loading && <p>Loading...</p>}
      {err && <p style={{ color: "red" }}>{err}</p>}
      <div>
        <button onClick={handleLogin}> Login </button>
        <button onClick={handleGoogle}> Sign in with Google </button>

        <p>
          Don't have an account? ...{" "}
          <Link id="signup-text" to={"/signup"}>
            Signup
          </Link>
        </p>
      </div>
    </>
  );
}
