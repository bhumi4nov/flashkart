import { AppBar, Toolbar, Typography, Button } from "@mui/material";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { logout } from "../../redux/slices/authSlice";

import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const dispatch = useDispatch();

  const auth = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          FlashKart
        </Typography>

        <Button color="inherit" component={Link} to="/">
          Products
        </Button>

        <Button color="inherit" component={Link} to="/cart">
          Cart
        </Button>

        <Button color="inherit" component={Link} to="/orders">
          Orders
        </Button>

        {auth.isAuthenticated ? (
          <>
            <Typography sx={{ mx: 2 }}>Welcome {auth.user?.name}</Typography>

            <Button color="inherit" onClick={() => dispatch(logout())}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
