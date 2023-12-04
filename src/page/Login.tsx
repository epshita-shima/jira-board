import { useParams } from "react-router-dom";
import { useSingleTaskQuery } from "../redux/api/apiSlice";

export default function Login() {
  const{id}=useParams()
  console.log(id)
  const {data}=useSingleTaskQuery(id)
  console.log(data)
  return <div>

  </div>;
}
