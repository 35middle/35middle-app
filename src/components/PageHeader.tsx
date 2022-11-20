import { Box, Typography } from '@mui/material';

type Props = {
  icon?: JSX.Element;
  title?: string;
  subtitle?: string;
};

const PageHeader = ({ icon, title, subtitle }: Props) => {
  return (
    <Box>
      <Box className="space-left mb-3 flex items-center">
        {icon}
        <Typography variant="h4" className="ml-5 font-bold">
          {title}
        </Typography>
      </Box>
      <Typography variant="body2">{subtitle}</Typography>
    </Box>
  );
};

export default PageHeader;
