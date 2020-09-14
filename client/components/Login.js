import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="LoginOuterContainer">
      <h2 className="heading">Welcome to CodeCollab!</h2>
      <div className="LoginInnerContainer">
        <div>
          <input
            className="loginInput"
            placeholder="Email/Username"
            // state will be live updated with user input in the username field
            onChange={(event) => setUserName(event.target.value)}
            type="text"
          />
        </div>
        <div>
          <input
            className="loginInput mt-20"
            type="text"
            placeholder="Password"
            // state will be live updated with user input in the password field
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          {/* Link tag denotes connection to Route tag in App.js, brings user to editor component on button click */}
          <Link to="/editor">
            <button className="button mt-20" type="submit">
              Login
            </button>
          </Link>
        </div>
        <p>Don't have an account? Click below</p>
        {/* Link tag denotes connection to Route tag in App.js, brings user to signup component on button click */}
        <Link to="/signup">
          <button className="button mt-20" type="submit">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
