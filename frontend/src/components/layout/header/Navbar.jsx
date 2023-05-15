import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../actions/userActions";

export default function Navbar() {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  // console.log(user?.user.avatar);

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    console.log("logout out successful");
    dispatch(logoutUser());
  };

  // React.useEffect(() => {}, [user?.user.avatar]);
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Link style={{ color: "black" }} to="/search">
          <Typography sx={{ minWidth: 100 }}>Search</Typography>
        </Link>
        <Link style={{ color: "black" }} to="/">
          <Typography sx={{ minWidth: 100 }}>Home</Typography>
        </Link>
        <Link style={{ color: "black" }} to="/products">
          <Typography sx={{ minWidth: 100 }}>Products</Typography>
        </Link>
        <Link style={{ color: "black" }} to="/contact">
          <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        </Link>
        <Link style={{ color: "black" }} to="/about">
          <Typography sx={{ minWidth: 100 }}>About</Typography>
        </Link>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{ width: 38, height: 38 }}
              src={
                user?.user?.avatar?.url
                  ? user?.user?.avatar?.url
                  : "/profile.webp"
              }
            ></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link style={{ color: "black" }} to="/profile">
          <MenuItem onClick={handleClose}>
            <Avatar
              sx={{ width: 38, height: 38 }}
              src={
                user?.user?.avatar?.url
                  ? user?.user?.avatar?.url
                  : "/profile.webp"
              }
            ></Avatar>{" "}
            Profile
          </MenuItem>
        </Link>
        {user?.user?.role == "admin" && (
          <Link style={{ color: "black" }} to="/dashboard">
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <SpaceDashboardIcon fontSize="small" />
              </ListItemIcon>
              Dashboard
            </MenuItem>
          </Link>
        )}
        <Link style={{ color: "black" }} to="/cart">
          <MenuItem
            onClick={() => {
              handleClose();
            }}
          >
            <ListItemIcon>
              <ShoppingCartIcon fontSize="small" />
            </ListItemIcon>
            Cart
          </MenuItem>
        </Link>
        <Link style={{ color: "black" }} to="/settings">
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
        </Link>
        <Divider />
        {isAuthenticated ? (
          <MenuItem
            onClick={() => {
              handleClose();
              logout();
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        ) : (
          <Link style={{ color: "black" }} to="/login">
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Login
            </MenuItem>
          </Link>
        )}
      </Menu>
    </React.Fragment>
  );
}
