import { useAuth } from "../../AuthContext.jsx";
import "./Profile.css";
import LogoutButton from "../../components/LogoutButton/LogoutButton.jsx";
export default function Profile() {
  const { user } = useAuth();
  if (!user) {
    return <p>Loading user info...</p>;
  }
  return (
    <>
      <p className="info">Salem , {user.displayName || "Guest"} </p>
      <p className="info">User UID:{user.uid}</p>
      <p className="info">User Email : {user.email}</p>
      <LogoutButton />
    </>
  );
}
