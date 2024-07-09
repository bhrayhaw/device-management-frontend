import { createContext, useState, useContext, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // Check token expiration if needed
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          handleLogout(); // Token expired, log out
        } else {
          setIsLoggedIn(true);
          setUser({
            id: decodedToken.id,
            role: decodedToken.role,
            name: decodedToken.name,
          });
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        handleLogout(); // Log out on token decode error
      }
    }
  }, []);

  const handleLogin = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      setUser({
        id: decodedToken.id,
        role: decodedToken.role,
        name: decodedToken.name,
      });
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
