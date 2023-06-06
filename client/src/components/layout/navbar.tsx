import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Dashboard } from "@mui/icons-material";
import { logoutUser } from "../../action/authAction";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import jwt_decode from "jwt-decode";
import { TypeTokenData } from "../../action/actionType";

const pages = ["Dashboard", "Blog", "Add Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logout = () => {
    handleCloseUserMenu();
    navigate("/login");
    dispatch(logoutUser());
  };
  let isuser = false;
  const [username, setUsername] = React.useState("");
  if (localStorage.token) {
    isuser = true;
    const decoded: TypeTokenData = jwt_decode(localStorage.token);
    const currentTime: Number = Date.now() / 1000;
  } else isuser = false;
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HOME
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Button
                href="/dashboard"
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Dashboard
              </Button>
              <Button
                href="/myblog"
                sx={{ my: 2, color: "black", display: "block" }}
              >
                My Blog
              </Button>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              href="/dashboard"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Dashboard
            </Button>
            <Button
              href="/myblog"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              My Blog
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {
              <div className="flex gap-10 m-5">
                <Button className="text-white" href="#text-buttons">
                  Link
                </Button>
                {!isuser && (
                  <Typography textAlign="center">
                    <Button
                      sx={{ my: 2, color: "white", display: "block" }}
                      href="/register"
                    >
                      Sign Up
                    </Button>
                  </Typography>
                )}
                {!isuser && (
                  <Typography textAlign="center">
                    <Button
                      sx={{ my: 2, color: "white", display: "block" }}
                      href="/login"
                    >
                      Log In
                    </Button>
                  </Typography>
                )}
                {isuser && (
                  <Typography textAlign="center">
                    <Button
                      sx={{ my: 2, color: "white", display: "block" }}
                      onClick={() => logout()}
                    >
                      Log Out
                    </Button>
                  </Typography>
                )}
              </div>
            }
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {isuser && (
              <div>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Semy Sharp"
                      src="data:image/jpeg;base64,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"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem>
                    <Typography textAlign="center">
                      <Button href="/account">Account</Button>
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign="center">
                      <Button href="/dashboard">Dashboard</Button>
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign="center">
                      <Button href="/profile">Profile</Button>
                    </Typography>
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
