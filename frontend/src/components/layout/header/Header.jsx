import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { Link } from "react-router-dom";
import "./Header.scss";
//icons
import HomeIcon from "@mui/icons-material/Home";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div id="header">
      <TemporaryDrawer />
      <Navbar />
    </div>
  );
};

export default Header;

function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: 250,
        marginTop: 0,
        // border: "1px solid red",
        padding: 0,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{ margin: 0 }}>
        {["Home", "Products", "Contact", "About"].map((text, index) => (
          <ListItem sx={{ width: "250" }} key={text} disablePadding>
            <Link
              to={index == 0 ? `/` : `/${text.toLowerCase()}`}
              style={{ width: "100%", color: "black" }}
            >
              <ListItemButton
                sx={{
                  padding: "1rem 0.5rem",
                  border: "1px solid #eaeaea",
                }}
              >
                <ListItemIcon></ListItemIcon>
                <ListItemText primary={text} sx={{ fontSize: "3rem" }} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon sx={{ fontSize: "2rem" }} />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
