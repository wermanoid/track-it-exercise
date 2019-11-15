import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export const NotFound: React.SFC<RouteComponentProps> = ({ staticContext }) => {
  if (staticContext) {
    staticContext.statusCode = 404;
  }

  return <h2> Page not found</h2>;
};
