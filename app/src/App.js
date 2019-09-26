import React from "react";
import { BrowserRouter as BR, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import Landing from "./components/layouts/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

function App() {
  return (
    <BR>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <div>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>
        <Footer />
      </div>
    </BR>
  );
}

export default App;
