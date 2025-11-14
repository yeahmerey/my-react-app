import { useLocation } from "react-router";
export default function Info() {
  const location = useLocation();
  return (
    <div>
      <i>Current Location : {location.pathname}</i>
    </div>
  );
}
