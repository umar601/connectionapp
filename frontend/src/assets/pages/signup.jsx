import { Link } from "react-router-dom";
export default function SignUp() {
  return (
    <>
      <nav>
        <Link to={"/login"}>login</Link>
        <Link to={"/signup"}>sigup</Link>
      </nav>

      <h1>signup</h1>
    </>
  );
}
