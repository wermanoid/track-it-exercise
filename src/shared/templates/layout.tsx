import React from 'react';

export interface LayoutProps {
  header?: React.ComponentType;
  footer?: React.ComponentType;
}

const Layout: React.SFC<LayoutProps> = ({ children, header, footer }) => (
  <div
    css={{
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    {header && <section>{React.createElement(header, null)}</section>}
    <section css={{ flex: '1', overflow: 'auto' }}>
      <div>
        {children}
        {footer && React.createElement(footer, null)}
      </div>
    </section>
  </div>
);

export default Layout;
