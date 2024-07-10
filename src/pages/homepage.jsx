import { Button, Typography, Box } from "@mui/material";
import { useAuth } from "../components/AuthProvider";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { user, isLoggedIn } = useAuth();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h2" gutterBottom>
        Welcome to Device Management System
      </Typography>
      <Typography variant="h6" gutterBottom>
        Manage your devices and tickets efficiently
      </Typography>
      {user && (
        <Typography variant="body1" gutterBottom>
          Hello, {user.name}! You are logged in as a {user.role}.
        </Typography>
      )}
      {!isLoggedIn ? (
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
        >
          Get Started
        </Button>
      ) : (
        user &&
        user.role === "IT Personnel" && (
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/dashboard"
          >
            Dashboard
          </Button>
        )
      )}
    </Box>
  );
};

export default HomePage;
