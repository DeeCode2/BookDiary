import { useRef, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { UserAuth } from "../config/AuthContext.jsx";
import '../styles/Navbar.scss';

//MUI components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = "100%";
const navItems = ["Library", "New book", "Wishlist", "Sign out"];

function Navbar(props) {
  //get user auth and logout functions from config
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  //navbar MUI
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box  onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      {/* <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="Library" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="New book" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="Wishlist" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="Sign out" />
          </ListItemButton>
        </ListItem>
      </List> */}
      <ul>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
      </ul>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box  sx={{ display: "flex" }}>
      {/* <CssBaseline /> */}
      <AppBar component="nav" id="nav-container">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: "none", sm: "block" } }} id="navlinks">

            <NavLink to='/library'>Library<AutoStoriesIcon/></NavLink>
            <NavLink to='/library'>New book<AddCircleIcon/></NavLink>
            {/* <NavLink to='/library'>Wishlist</NavLink> */}
            <button className="sign-out" onClick={handleLogout}>Logout</button>

          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Navbar;