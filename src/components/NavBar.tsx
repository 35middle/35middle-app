import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import * as React from 'react';

import { AppConfig } from '@/utils/AppConfig';

const settings = [
  'Projects',
  'Profile Settings',
  'Account Settings',
  'User Management',
  'Switch Account',
];

type Props = {
  title: string | null;
};

const NavBar = ({ title }: Props) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" className="bg-background">
      <Container maxWidth="xl">
        <Toolbar className="flex justify-between">
          <Box className="flex items-center">
            <img
              alt={AppConfig.title}
              src="/assets/images/logo.png"
              height="56px"
            />

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                ml: 2,
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                textDecoration: 'none',
              }}
            >
              {title || `Welcome to ${AppConfig.title}`}
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleCloseUserMenu}>
                <Button variant="contained">Logout</Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
