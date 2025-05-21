import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet, useNavigate,Link, useLocation } from 'react-router-dom';
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PeopleIcon from '@mui/icons-material/People';
import StorefrontIcon from '@mui/icons-material/Storefront';

import DashboardIcon from "@mui/icons-material/Dashboard";
const drawerWidth = 240;

function PanelAdmin(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Hook para obtener la ruta actual

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const handleLogout = async () => {
    try {
      await localStorage.removeItem("token");
      navigate("/iniciar-sesión");
    } catch (error) {
      console.log(error);
    }
  };
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <Link
          to="opciones/profesionales"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem
            disablePadding
            sx={{
              backgroundColor:
                location.pathname === "/administrar/opciones/profesionales"
                  ? "#e0f7fa"
                  : "transparent",
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon
                  sx={{
                    color:
                      location.pathname === "/administrar/opciones/profesionales"
                        ? "#53676c"
                        : "black",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={"Profesionales"}
                sx={{
                  color:
                    location.pathname === "/administrar/opciones/profesionales"
                      ? "#53676c"
                      : "black",
                }}
              />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link
          to="sedes"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem
            disablePadding
            sx={{
              backgroundColor:
                location.pathname === "/administrar/sedes"
                  ? "#e0f7fa"
                  : "transparent",
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <EventAvailableIcon
                  sx={{
                    color:
                      location.pathname === "/administrar/sedes"
                        ? "#53676c"
                        : "black",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={"Sedes"}
                sx={{
                  color:
                    location.pathname === "/administrar/sedes"
                      ? "#53676c"
                      : "black",
                }}
              />
            </ListItemButton>
          </ListItem>
        </Link>


        <Link
          to="usuarios"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem
            disablePadding
            sx={{
              backgroundColor:
                location.pathname === "/administrar/usuarios"
                  ? "#e0f7fa"
                  : "transparent",
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon
                  sx={{
                    color:
                      location.pathname === "/administrar/usuarios"
                        ? "#53676c"
                        : "black",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={"Usuarios"}
                sx={{
                  color:
                    location.pathname === "/administrar/usuarios"
                      ? "#53676c"
                      : "black",
                }}
              />
            </ListItemButton>
          </ListItem>
        </Link>


         <Link
          to="proveedores"
          style={{ textDecoration: "none", color: "black" }}
        >
          <ListItem
            disablePadding
            sx={{
              backgroundColor:
                location.pathname === "/administrar/proveedores"
                  ? "#e0f7fa"
                  : "transparent",
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <StorefrontIcon
                  sx={{
                    color:
                      location.pathname === "/administrar/proveedores"
                        ? "#53676c"
                        : "black",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={"Proveedores"}
                sx={{
                  color:
                    location.pathname === "/administrar/proveedores"
                      ? "#53676c"
                      : "black",
                }}
              />
            </ListItemButton>
          </ListItem>
        </Link>
        <Toolbar />
        <Divider />
        <ListItem
            disablePadding
            sx={{
           backgroundColor: "red"
            }}
            onClick={handleLogout}
          >
            <ListItemButton>
         
              <ListItemText
                primary={"Cerrar sesión"}
                sx={{
                color: "white",
                textAlign: "center"
               
                }}
              />
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#53676c",

        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Administrar
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
     <Outlet/>
      </Box>
    </Box>
  );
}



export default PanelAdmin;
