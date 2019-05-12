import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { RouterStore } from 'mobx-react-router';
import { MemoryRouter } from 'react-router-dom';

import NavBar from './nav-bar';

storiesOf('[Organism]|NavBar', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('default', () => {
    const routing = ({
      push: action('Navigate to clicked'),
    } as unknown) as RouterStore;

    return <NavBar title={text('Title', 'TracIt')} routing={routing} />;
  });
