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
            onChange={(event) => setUserName(event.target.value)}
            type="text"
          />
        </div>
        <div>
          <input
            className="SignUpInput mt-20"
            type="text"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
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
