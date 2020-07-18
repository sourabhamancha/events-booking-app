import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/auth";
// components
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";

// sem-ui
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";

function App() {
  return (
    <>
      <Container>
        <AuthProvider>
          <Router>
            <Navigation />
            <div className="App">
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
            </div>
          </Router>
        </AuthProvider>
      </Container>
    </>
  );
}

export default App;
