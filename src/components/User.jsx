import { useParams } from "react-router";
export default function User() {
  const { id } = useParams();
  return <h3>User ID : {id}</h3>;
}
