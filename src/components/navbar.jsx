import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const Navbar = () => {
  const location = useLocation();
  const { isLoggedIn, user, handleLogout } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar style={{ marginBottom: "100px" }} position="static">
      <Toolbar>
        <Typography
          color="inherit"
          component={Link}
          sx={{ flexGrow: 1, fontWeight: "bold" }}
          to="/"
        >
          DeviceFIX
        </Typography>
        {isLoggedIn && user?.role === "IT Personnel" && (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/dashboard"
              sx={{
                fontWeight:
                  location.pathname === "/dashboard" ? "bold" : "normal",
              }}
            >
              Dashboard
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/devices"
              sx={{
                fontWeight:
                  location.pathname === "/devices" ? "bold" : "normal",
              }}
            >
              Devices
            </Button>
          </>
        )}
        {isLoggedIn && (
          <Button
            color="inherit"
            component={Link}
            to="/tickets"
            sx={{
              fontWeight: location.pathname === "/tickets" ? "bold" : "normal",
            }}
          >
            Tickets
          </Button>
        )}
        {isLoggedIn ? (
          <Button
            color="inherit"
            onClick={() => {
              handleLogout();
              navigate("/login");
            }}
          >
            Logout
          </Button>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/register">
              Sign Up
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
