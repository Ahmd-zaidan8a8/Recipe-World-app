import { useContext } from "react";
import { Button, HStack, Image } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate('/');
  }

  return (
    <HStack justifyContent="space-between" padding="10px">
      <Image src={logo} boxSize='100px'  />
      <Button><Link to="/addRecipe">Create a new Recipe</Link></Button>
      <Button onClick={logout}>Logout</Button>
      <ColorModeSwitch />
    </HStack>
  );
};

export default Navbar;
