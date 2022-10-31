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
import Link from 'next/link';
import Image from 'next/image';
import * as React from 'react';
import { useSelector } from 'react-redux';

import type { AccountState, RootState } from '@/store';

const settings = [
  { pageName: 'Projects', pageUrl: 'projects' },
  { pageName: 'Profile Settings', pageUrl: 'profile-settings' },
  { pageName: 'Account Settings', pageUrl: 'account-settings' },
  { pageName: 'User Management', pageUrl: 'user-management' },
  { pageName: 'Switch Account', pageUrl: 'switch-account' },
];

type Props = {
  title?: string;
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
              alt={title}
              src="/assets/images/main-page-logo.svg"
              layout="fill"
              objectFit="contain"
            />
          </Box>

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
            Welcome to {account.firstName} {account.lastName}
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
              <MenuItem key={setting.pageName} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Link
                    href={`/accounts/${account.accountId}/${setting.pageUrl}`}
                  >
                    {setting.pageName}
                  </Link>
                </Typography>
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
