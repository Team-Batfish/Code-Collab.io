import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";




const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userObj, setUserObj] = useState(null);
  const [filesArr, setFilesArr] = useState([]);


  useEffect(()=>{
  
  }, []);
  // fetch request to backend
  const signUpUser = () => {

    console.log("user: ", userName, "pass: ", password);

    fetch('/signup', {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ username: userName, password: password })
    })
      .then(res => res.json())
      .then(data => {
        setUserObj(data.user);
      })
      .catch(err => {
        console.log(`Invalid username or password, please try again`, err);
      })
  };

  if(userObj){
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
  }
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

          <button className="button mt-20" type="submit" onClick={() => {signUpUser()}}>
            Sign Up
          </button>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
