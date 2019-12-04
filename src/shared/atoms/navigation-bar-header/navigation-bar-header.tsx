import React from 'react';
import { IconButton, Typography } from '@material-ui/core';

const NavigationBarHeader: React.FC<{
  title: string;
  icon: React.ReactElement;
}> = ({ title, icon }) => (
  <>
    <IconButton color="inherit">{icon}</IconButton>
    <Typography variant="h6" noWrap>
      {title}
    </Typography>
  </>
);

export default NavigationBarHeader;
