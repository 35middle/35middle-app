import { Typography } from '@mui/material';

import { AppConfig } from '@/utils/AppConfig';

const Footer = () => {
  return (
    <footer className="flex justify-center py-2">
      <Typography variant="caption" className="border-gray-300">
        Copyright ©{new Date().getFullYear()} {AppConfig.title} all rights
        reserved.
      </Typography>
    </footer>
  );
};

export default Footer;
