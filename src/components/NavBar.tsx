import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import * as React from 'react';
import { useSelector } from 'react-redux';

import type { AccountState, RootState } from '@/store';
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
  const account = useSelector<RootState, AccountState>(
    (state) => state.account
  );
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
    <AppBar position="sticky">
      <Toolbar className="flex justify-between py-2">
        <Box className="flex h-full items-center justify-between">
          <Box className="relative mr-10 h-full w-40">
            <Image
              alt={AppConfig.title}
              src="/assets/images/main-page-logo.svg"
              layout="fill"
              objectFit="contain"
            />
          </Box>

          <Typography variant="h6">
            {title || `Welcome to ${account.firstName} ${account.lastName}`}
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={account.firstName}
                src="/static/images/avatar/2.jpg"
              />
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
    </AppBar>
  );
};
export default NavBar;
