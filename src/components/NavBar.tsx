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
import Link from 'next/link';
import * as React from 'react';
<<<<<<< HEAD

import type { UserSession } from '@/types';
||||||| parent of 5605905 (style: update font, logo, navbar)
import { useSelector } from 'react-redux';

import type { AccountState, RootState } from '@/store';
=======
>>>>>>> 5605905 (style: update font, logo, navbar)

const settings = [
  { pageName: 'Projects', pageUrl: 'projects' },
  { pageName: 'Profile', pageUrl: 'profile' },
  { pageName: 'Account Settings', pageUrl: 'account-settings' },
  { pageName: 'User Management', pageUrl: 'user-management' },
  { pageName: 'Switch Account', pageUrl: 'switch-account' },
];

type Props = {
  title: string;
  userSession?: UserSession;
};

<<<<<<< HEAD
const NavBar = ({ title, userSession }: Props) => {
||||||| parent of 5605905 (style: update font, logo, navbar)
const NavBar = ({ title }: Props) => {
  const account = useSelector<RootState, AccountState>(
    (state) => state.account
  );
=======
const NavBar = ({ title }: Props) => {
>>>>>>> 5605905 (style: update font, logo, navbar)
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
            <Image alt={title} src="/assets/images/main-page-logo.svg" fill />
          </Box>
<<<<<<< HEAD
||||||| parent of 5605905 (style: update font, logo, navbar)

          <Typography variant="h6">
            Welcome to {account.firstName} {account.lastName}
          </Typography>
=======

          <Typography variant="h6">Welcome to {title}</Typography>
>>>>>>> 5605905 (style: update font, logo, navbar)
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
<<<<<<< HEAD
              <Avatar>{userSession?.firstName?.charAt(0) || ''}</Avatar>
||||||| parent of 5605905 (style: update font, logo, navbar)
              <Avatar
                alt={account.firstName}
                src="/static/images/avatar/2.jpg"
              />
=======
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
>>>>>>> 5605905 (style: update font, logo, navbar)
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
              <MenuItem key={setting.pageName} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Link
                    href={`/account/${userSession?.accountId}/${setting.pageUrl}`}
                  >
                    {setting.pageName}
                  </Link>
                </Typography>
              </MenuItem>
            ))}
            <MenuItem onClick={handleCloseUserMenu}>
              <Link href="/api/logout">
                <Button variant="contained">Logout</Button>
              </Link>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
