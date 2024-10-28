import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Outlet, useLocation } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';
import CollectionsIcon from '@mui/icons-material/Collections';

const drawerWidth = 240;

function Admin(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0); // Estado para la opción seleccionada
  const location = useLocation(); // Para detectar cambios en la URL

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Función para manejar el cambio de selección
  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <Link to="petición-registro" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={() => handleListItemClick(0)} // Cambia el índice de la opción seleccionada
              sx={{ backgroundColor: selectedIndex === 0 ? '#53676c' : 'transparent' }} // Color si está seleccionada
            >
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Petición de registros" />
            </ListItemButton>
          </ListItem>
        </Link>
{/* 
        <Link to="actualizar-escuela" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={() => handleListItemClick(1)} // Cambia el índice
              sx={{ backgroundColor: selectedIndex === 1 ? '#f0f0f0' : 'transparent' }}
            >
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Actualizar escuela" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="publicar-galeria" style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={() => handleListItemClick(2)} // Cambia el índice
              sx={{ backgroundColor: selectedIndex === 2 ? '#f0f0f0' : 'transparent' }}
            >
              <ListItemIcon>
                <CollectionsIcon />
              </ListItemIcon>
              <ListItemText primary="Publicar galeria" />
            </ListItemButton>
          </ListItem>
        </Link> */}
      </List>
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
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
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
        <Outlet />
      </Box>
    </Box>
  );
}

Admin.propTypes = {
  window: PropTypes.func,
};

export default Admin;
