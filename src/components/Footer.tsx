import { Typography } from '@mui/material';

import { AppConfig } from '@/utils/AppConfig';

const Footer = () => {
  return (
    <footer>
      <Typography
        variant="body2"
        className="my-0 border-t border-gray-300 py-4 text-center"
      >
        Copyright ©{new Date().getFullYear()} {AppConfig.title} {}
        <span role="img" aria-label="Love">
          all rights reserved.
        </span>
      </Typography>
    </footer>
  );
};

export default Footer;
