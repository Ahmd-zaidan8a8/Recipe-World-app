import { useState } from "react";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import AuthContext from "./contexts/authContext";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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
