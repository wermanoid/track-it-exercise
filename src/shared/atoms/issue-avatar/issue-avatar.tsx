import styled from '@emotion/styled';
import { Avatar } from '@material-ui/core';
import { AvatarProps } from '@material-ui/core/Avatar';

import { IssueState } from '#shared/types';

const stateToHighlightColor: Record<IssueState, string> = {
  [IssueState.OPEN]: 'red',
  [IssueState.PENDING]: 'darkorange',
  [IssueState.CLOSED]: 'green',
};

export interface IssueAvatarProps extends AvatarProps {
  status?: IssueState;
}

const mapBackground = ({ status }: IssueAvatarProps) =>
  status ? stateToHighlightColor[status] : '#eee';

export const IssueAvatar = styled<
  React.ComponentType<AvatarProps>,
  { status: IssueState }
>(Avatar)`
  && {
    background-color: ${mapBackground};
  }
` as React.ComponentType<IssueAvatarProps>;

export default IssueAvatar;
