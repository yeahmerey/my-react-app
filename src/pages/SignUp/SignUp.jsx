import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../services/firebase.js";
export default function SingUp() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSignUp = async () => {
    setErr("");
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      navigate("/profile");
    } catch (e) {
      setErr(e.message);
    }
    setLoading(false);
  };
  return (
    <>
      <p>Signup page</p>
      <div>
        <input
          type={"email"}
          placeholder={"Enter your email"}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={"password"}
          placeholder={"Enter your password"}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
      {loading && <p>Loading...</p>}
      {err && <p style={{ color: "red" }}>{err}</p>}
      <div>
        <button onClick={handleSignUp}>Sign Up</button>
      </div>
      <p>
        Already have an account? ... <Link to={"/login"}>Login</Link>
      </p>
    </>
  );
}
