import {
  BusinessOutlined,
  ChangeCircleOutlined,
  FolderOpenOutlined,
  GroupOutlined,
  LogoutOutlined,
  ManageAccountsOutlined,
} from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
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
  {
    pageName: 'Projects',
    pageUrl: 'projects',
    icon: <FolderOpenOutlined color="primary" />,
  },
  {
    pageName: 'Profile',
    pageUrl: 'profile',
    icon: <ManageAccountsOutlined color="primary" />,
  },
  {
    pageName: 'Account Settings',
    pageUrl: 'account-settings',
    icon: <BusinessOutlined color="primary" />,
  },
  {
    pageName: 'User Management',
    pageUrl: 'user-management',
    icon: <GroupOutlined color="primary" />,
  },
  {
    pageName: 'Switch Account',
    pageUrl: 'switch-account',
    icon: <ChangeCircleOutlined color="primary" />,
  },
];

type Props = {
  title: string;
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
            <Image alt={title} src="/assets/images/main-page-logo.svg" fill />
          </Box>
        </Box>

        <Box sx={{ flexGrow: 0 }} className="flex items-center">
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar>{userSession?.firstName?.charAt(0) || ''}</Avatar>
            </IconButton>
          </Tooltip>
          {userSession && (
            <Tooltip title="Logout" className="ml-5">
              <Link href="/api/logout">
                <LogoutOutlined
                  fontSize="large"
                  style={{
                    color: 'white',
                  }}
                />
              </Link>
            </Tooltip>
          )}
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
                <Link
                  href={`/account/${userSession?.accountId}/${setting.pageUrl}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Box
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {setting.icon}
                    <Typography
                      variant="body2"
                      color="primary"
                      style={{
                        marginLeft: '0.5rem',
                      }}
                    >
                      {setting.pageName}
                    </Typography>
                  </Box>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
