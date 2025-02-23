import * as React from "react";
import PropTypes from "prop-types";
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
import styles from "../../styles/Navbar/Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import axios from "axios";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

function DrawerAppBar(props) {
  const { window } = props;
  const [professional, setProfessional] = React.useState(null);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [token, setToken] = React.useState("");
  const [role, setRole] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  console.log(role)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dataPersonal = async () => {
    try {
      const tokenFromStorage = localStorage.getItem("token"); // Obtener el token directamente
      if (!tokenFromStorage) {
        throw new Error("Token no encontrado en localStorage");
      }
      const response = await axios.get(
        `https://vitalclic-production.up.railway.app/api/datapersonal`,
        {
          headers: {
            Authorization: tokenFromStorage, // Usa el token aquí
            "Content-Type": "application/json",
          },
        }
      );

      setProfessional(response.data);
      setRole(response.data.role);
    } catch (error) {
      console.error("Error al obtener los detalles:", error);
    } finally {
    }
  };
  React.useEffect(() => {
    if (token) {
      dataPersonal();
    }
  }, [token]);
  const handleLogout = async () => {
    try {
      await localStorage.removeItem("token");
      navigate("/iniciar-sesión");
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    setToken(token);
  }, []);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
    <Typography variant="h6" sx={{  background: "#53676c", p: 2 }} >
      <Link to="/" className={[styles.optionsNavbar]}>
              <img
                src={require("../../assets/Images/logo.png")}
                alt="Logo"
                className={styles.logoMobile}
              />
            </Link>
      </Typography>
      <Divider />
      <List>
        <Link to="/registrar-empresa" style={{textDecoration: "none", color: "black"}}>
          <ListItem disablePadding>
            <ListItemButton >
              <ListItemText primary={"¿Eres un proveedor?"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/registrar-profesional"  style={{textDecoration: "none", color: "black"}}>

          <ListItem disablePadding>
            <ListItemButton >
              <ListItemText primary={"¿Eres un personal de salud?"} />
            </ListItemButton>
          </ListItem>
          </Link>
          <Link to="/registrar-sede"  style={{textDecoration: "none", color: "black"}}>

          <ListItem disablePadding>
            <ListItemButton >
              <ListItemText primary={"¿Eres una clínica?"} />
            </ListItemButton>
          </ListItem>

          </Link>


          <ListItem >
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"INICIAR SESIÓN"} />
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "#53676c" }}>
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

          <Typography
            component="div"
            sx={{ flexGrow: 1, display: { sm: "block" } }}
          >
            <a href="/" className={[styles.optionsNavbar]}>
              <img
                src={require("../../assets/Images/logo.png")}
                alt="Logo"
                className={styles.logo}
              />
            </a>
          </Typography>

      
          {token && role === "personal" ? (
            <>
              <Box
                sx={{
                  display: {
                    xs: "none",
                    sm: "flex",
                    gap: "2em",
                    placeItems: "center",
                    paddingRight: 30,
                  },
                }}
              >
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
                      src={professional && professional.image}
                      sx={{
                        backgroundColor:
                          professional && professional.backgroundColor,
                        width: 50,
                        height: 50,
                      }}
                    >
                      {professional && professional.image
                        ? null
                        : professional && professional.name[0]}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
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
                      "&::before": {
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
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
             {/*    <Link
                  to={"/mi-perfil"}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Perfil
                  </MenuItem>
                </Link> */}
               
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Cerrar sesión
                </MenuItem>
              </Menu>
            </>
          ) :  token && role === "profesional" ? (
            <>
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                  gap: "2em",
                  placeItems: "center",
                  paddingRight: 30,
                },
              }}
            >
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
                    src={professional && professional.image}
                    sx={{
                      backgroundColor:
                        professional && professional.backgroundColor,
                      width: 50,
                      height: 50,
                    }}
                  >
                    {professional && professional.image
                      ? null
                      : professional && professional.name[0]}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
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
                    "&::before": {
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
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
            <Link
                to={"/mi-perfil"}
                style={{ textDecoration: "none", color: "#000" }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Mi Perfil
                </MenuItem>
              </Link> 
              <Link
                to={"/panel/turnos/disponibles"}
                style={{ textDecoration: "none", color: "#000" }}
              >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Turnos reservados
              </MenuItem>
              </Link>

              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Cerrar sesión
              </MenuItem>
            </Menu>
          </>
          ):  token && role === "sede" ? (
            <>
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                  gap: "2em",
                  placeItems: "center",
                  paddingRight: 30,
                },
              }}
            >
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
                    src={professional && professional.image}
                    sx={{
                      backgroundColor:
                        professional && professional.backgroundColor,
                      width: 50,
                      height: 50,
                    }}
                  >
                    {professional && professional.image
                      ? null
                      : professional && professional.name[0]}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
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
                    "&::before": {
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
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
         {/*      <Link
                to={"/mi-perfil"}
                style={{ textDecoration: "none", color: "#000" }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Perfil
                </MenuItem>
              </Link> */}
              <Link
                to={"/panel/sede"}
                style={{ textDecoration: "none", color: "#000" }}
              >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Turnos reservados sede
              </MenuItem>
              </Link>

              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Cerrar sesión
              </MenuItem>
            </Menu>
          </> ): (
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                  gap: "2em",
                  placeItems: "center",
                  paddingRight: 30,
                },
              }}
            >
               <Link to="/registrar-empresa" className={[styles.optionsNavbar]}>
                ¿Eres un proveedor?
              </Link>
              <Link
                to="/registrar-profesional"
                className={[styles.optionsNavbar]}
              >
                ¿Eres un personal de salud?
              </Link>
              <Link to="/registrar-sede" className={[styles.optionsNavbar]}>
                ¿Eres una clínica?
              </Link>

             

              <Link to="/iniciar-sesión" className={[styles.btnLogin]}>
                INICIAR SESIÓN
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <nav>
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
      </nav>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
