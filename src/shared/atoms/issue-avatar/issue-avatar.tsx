import styled from '@emotion/styled';
import Avatar, { AvatarProps } from '@material-ui/core/Avatar';

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

export const IssueAvatar: React.ComponentType<IssueAvatarProps> = styled(
  Avatar
)`
  && {
    background-color: ${mapBackground};
  }
`;

export default IssueAvatar;
