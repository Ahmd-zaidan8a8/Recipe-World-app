import { useContext } from "react";
import HomePage from "./pages/HomePage";
import AuthContext from "./contexts/authContext";
import Login from "./pages/Login";

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      {isLoggedIn && <HomePage />}

      {!isLoggedIn && <Login />}
    </>
  );
};

export default App;
