import { Card, CardHeader, IconButton } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import format from 'date-fns/format';
import { observer } from 'mobx-react';
import React, { SyntheticEvent } from 'react';

import IssueAvatar from '#shared/atoms/issue-avatar';
import { IssueStatuses } from '#shared/constants';
import { IssueState } from '#shared/types';

export interface IssueProps {
  id: string;
  title: string;
  created: string | number | Date;
  status: IssueState;
  onEdit?: (id: string) => void;
}

@observer
class Issue extends React.Component<IssueProps> {
  public handleEdit = (e: SyntheticEvent<{}>) => {
    const { onEdit, id } = this.props;
    e.stopPropagation();
    if (onEdit) {
      onEdit(id);
    }
  };

  public render() {
    const { title, created, status, onEdit } = this.props;

    const Icon = IssueStatuses[status].icon;

    return (
      <Card css={{ margin: '5px' }}>
        <CardHeader
          avatar={
            <IssueAvatar status={status}>
              <Icon />
            </IssueAvatar>
          }
          action={
            onEdit ? (
              <IconButton onClick={this.handleEdit}>
                <Edit />
              </IconButton>
            ) : null
          }
          title={title}
          subheader={
            created ? format(new Date(created), 'MM/DD/YYYY HH:mm') : false
          }
        />
      </Card>
    );
  }
}

export default Issue;
