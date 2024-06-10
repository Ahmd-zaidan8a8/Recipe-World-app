import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme.ts";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./pages/routes.tsx";
import AuthContext from "./contexts/authContext";

function Root() {

  const token = localStorage.getItem("authToken");

  const [isLoggedIn, setIsLoggedIn] = useState(token != null);

  return (
    <AuthContext.Provider value={{isLoggedIn , setIsLoggedIn}}>
        <React.StrictMode>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <RouterProvider router={router} />
        </ChakraProvider>
      </React.StrictMode>
    </AuthContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Root/>);
