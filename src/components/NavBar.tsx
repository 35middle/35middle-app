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

import type { UserSession } from '@/types';

const settings = [
  { pageName: 'Projects', pageUrl: 'projects' },
  { pageName: 'Profile Settings', pageUrl: 'profile-settings' },
  { pageName: 'Account Settings', pageUrl: 'account-settings' },
  { pageName: 'User Management', pageUrl: 'user-management' },
  { pageName: 'Switch Account', pageUrl: 'switch-account' },
];

type Props = {
  title?: string;
  userSession?: UserSession;
};

const NavBar = ({ title, userSession }: Props) => {
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
              alt={title}
              src="/assets/images/main-page-logo.svg"
              layout="fill"
              objectFit="contain"
            />
          </Box>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={userSession?.firstName}
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
