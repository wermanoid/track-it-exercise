import React from 'react';
import { mount } from 'enzyme';

import { IssueState } from '#shared/types';
import IssueAvatar from './issue-avatar';

// TODO: Check why .toHaveStyleRule is not added to expect

describe('issue-avatar:', () => {
  const content = 'C';

  it('should render with #eee background', () => {
    const wrap = mount(<IssueAvatar>{content}</IssueAvatar>);

    expect(wrap).toMatchSnapshot();
  });

  it('should render with #red background', () => {
    const wrap = mount(
      <IssueAvatar status={IssueState.OPEN}>{content}</IssueAvatar>
    );

    expect(wrap).toMatchSnapshot();
  });

  it('should render with #darkorange background', () => {
    const wrap = mount(
      <IssueAvatar status={IssueState.PENDING}>{content}</IssueAvatar>
    );

    expect(wrap).toMatchSnapshot();
  });

  it('should render with #green background', () => {
    const wrap = mount(
      <IssueAvatar status={IssueState.CLOSED}>{content}</IssueAvatar>
    );

    expect(wrap).toMatchSnapshot();
  });
});
