import { useState } from "react";
import { Link } from "react-router-dom";
import { userSignUp } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../assets/styling/signup.css"; 

export default function SignUp() {

  let [data, setData] = useState({username: "", password: ""});
  let [error, setError] = useState("");
  let { login } = useAuth();
  let navigate = useNavigate();

  async function handleOnSubmit(event) {
    event.preventDefault();
    await userSignUp(data).then((res) => {
      if (res.status == 200) {
        login(res.data);
        navigate("/home");
      }
    }).catch((err) => {
      if (err.status == 409) {
        setError("Account already exists");
      } else if (err.status == 500) {
        setError("Some error in setting up account");
      }
    });
  }

  function handleOnChange(event) {
    setData({...data, [event.target.name]: event.target.value});
  }

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <h1 className="signup-title">Create Account</h1>
        <p className="signup-subtitle">Join our community today</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleOnSubmit} className="signup-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input 
              className="signup-input"
              type="text" 
              placeholder="Choose a username" 
              name="username" 
              value={data.username} 
              onChange={handleOnChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              className="signup-input"
              type="password" 
              placeholder="Create a password" 
              name="password" 
              value={data.password} 
              onChange={handleOnChange}
            />
            <small className="password-hint">Must be at least 8 characters</small>
          </div>

          <button className="signup-button">Create Account</button>
        </form>

        <nav className="signup-nav">
          <Link to={"/login"} className="signup-link">
            Already have an account? Sign in
          </Link>
        </nav>
      </div>
    </div>
  );
}