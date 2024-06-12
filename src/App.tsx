import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import AuthContext from "./contexts/authContext";
import {  useNavigate } from "react-router-dom";
import Login from "./pages/Login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  });
  
  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {isLoggedIn && <HomePage />}

        {!isLoggedIn && <Login />}
      </AuthContext.Provider>
    </>
  );
};

export default App;
