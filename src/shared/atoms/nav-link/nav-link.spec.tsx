import React from 'react';
import { mount } from 'enzyme';

import NavLink from './nav-link';

describe('nav-link:', () => {
  const wrapper = mount(<NavLink>test</NavLink>);

  it('should render anchor element', () => {
    expect(wrapper.find('a')).toHaveLength(1);
  });

  it('should render "test" as conten', () => {
    expect(wrapper.text()).toBe('test');
  });

  it('should chatch defaultPrevented click event', () => {
    const handlerMock = jest.fn();
    const mounted = mount(
      <div onClick={handlerMock}>
        <NavLink>test</NavLink>
      </div>
    );

    mounted.find('a').simulate('click');

    expect(handlerMock).toHaveBeenCalled();
    expect(handlerMock.mock.calls[0][0].isDefaultPrevented()).toBeTruthy();
  });
});
