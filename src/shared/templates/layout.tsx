import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import React from 'react';

export interface LayoutProps {
  header?: React.ComponentType;
  footer?: React.ComponentType;
}

const flexColumn = {
  display: 'flex',
  flexDirection: 'column' as const,
};

const screenView = {
  ...flexColumn,
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  height: '100vh',
};

const viewport = {
  ...flexColumn,
  minHeight: '100%',
  padding: '1rem',
  backgroundColor: '#eee',
};

const overflowView = { height: '100%', overflow: 'auto' };

const Layout: React.SFC<LayoutProps> = ({ children, header, footer }) => (
  <>
    <CssBaseline />
    <div css={screenView}>
      {header && <section>{React.createElement(header, null)}</section>}
      <section css={overflowView}>
        <Container maxWidth="lg">
          <Typography component="div" css={viewport}>
            <div css={{ flex: 1 }}>{children}</div>
            {footer && React.createElement(footer, null)}
          </Typography>
        </Container>
      </section>
    </div>
  </>
);

export default Layout;
