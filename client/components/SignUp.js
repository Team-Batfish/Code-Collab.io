import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="SignUpOuterContainer">
      <h2 className="heading">Welcome to CodeCollab!</h2>
      <div className="SignUpInnerContainer">
        <div>
          <input
            className="SignUpInput"
            placeholder="Email/Username"
            // state will be live updated with user input in the username field
            onChange={(event) => setUserName(event.target.value)}
            type="text"
          />
        </div>
        <div>
          <input
            className="SignUpInput mt-20"
            type="text"
            placeholder="Password"
            // state will be live updated with user input in the password field
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          {/* on successful signup, user is redirected to editor component */}
          <Link to="/editor">
            <button className="button mt-20" type="submit">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
