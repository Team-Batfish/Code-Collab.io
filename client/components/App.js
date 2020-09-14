import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import Editor from "./Editor";

function App() {
  return (
    // wrapped components in react Router tag
    <Router>
      <div>
        <h1></h1>
      </div>
      {/* route url to login component on app's 'home page' */}
      <Route path="/" exact component={Login} />
      {/* route url to signup page */}
      <Route path="/signup">
        <SignUp />
      </Route>
      {/* route url to editor component */}
      <Route path="/editor">
        <Editor />
      </Route>
    </Router>
  );
}

export default App;
