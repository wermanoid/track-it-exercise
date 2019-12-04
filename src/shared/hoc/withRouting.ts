import { RouterStore } from 'mobx-react-router';
import { inject, observer } from 'mobx-react';

export const withRouting = (c: React.ComponentType<any>) =>
  inject(({ routing }: { routing: RouterStore }) => ({
    goTo: (url: string, callback?: () => void) => (e: React.SyntheticEvent) => {
      e.preventDefault();
      routing.push(url);
      callback?.();
    },
    actualPath: routing.location.pathname,
  }))(observer(c));
