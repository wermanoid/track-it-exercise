import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';

const NavigationBar: React.FC = ({ children }) => (
  <Toolbar
    variant="dense"
    css={{ maxWidth: '1280px', margin: 'auto', width: '100%' }}
  >
    {children}
  </Toolbar>
);

export default NavigationBar;
