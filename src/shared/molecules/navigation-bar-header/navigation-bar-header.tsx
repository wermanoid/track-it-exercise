import React from 'react';
import { IconButton, Typography } from '@material-ui/core';

const NavigationBarHeader: React.FC<{
  title: string;
  icon: React.ReactElement | null;
}> = ({ title, icon }) => (
  <>
    {icon}
    <Typography variant="h6" noWrap css={{ cursor: 'default' }}>
      {title}
    </Typography>
  </>
);

export default NavigationBarHeader;
