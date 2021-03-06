import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import useAuth from "./hooks/auth.hook";
import useRoutes from "./routes";
import AuthContext from "./context/AuthContext";
import Navbar from "./components/Navbar";

function App() {
  const { token, userId, login, logout } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={{ token, login, userId, logout, isAuthenticated }}>
      <Router>
        {isAuthenticated && <Navbar />}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
