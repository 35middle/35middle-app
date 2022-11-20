import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, Card, Divider, Typography } from '@mui/material';
import Image from 'next/image';

import type { ProjectEntity } from '@/hooks/useProjectsByAccountId';

type Props = ProjectEntity;

const ProjectCard = ({ name, imageUrl, color = '#8249FC' }: Props) => {
  return (
    <Card
      className="flex flex-col items-center justify-center p-4"
      elevation={3}
      sx={{
        boxShadow: `0px 3px 3px -2px ${color}, 0px 3px 4px 0px ${color}, 0px 1px 8px 0px ${color}`,
      }}
    >
      <Box className="flex w-full items-center justify-between">
        <Typography variant="body1" component="h6">
          {name}
        </Typography>
        <Image src={imageUrl || ''} width={40} height={40} alt="logo" />
      </Box>

      <Divider variant="middle" className="my-5 w-full border" />

      <Box className="w-full text-left">
        <Button startIcon={<ManageAccountsOutlinedIcon fontSize="medium" />}>
          User management
        </Button>
      </Box>

      <Divider variant="middle" className="my-5 w-full border" />

      <Box className="flex w-full justify-between">
        <Button variant="contained">View project</Button>
        <Button variant="outlined" startIcon={<SettingsIcon />}>
          Edit project
        </Button>
      </Box>
    </Card>
  );
};

export default ProjectCard;
