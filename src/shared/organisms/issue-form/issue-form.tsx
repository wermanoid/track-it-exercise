import { CreateIssueArgs } from '#shared/types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import React from 'react';

const Transition = (props: TransitionProps) => (
  <Slide direction="up" {...props} />
);

export interface IssueFormProps {
  onAddIssue: (issue: CreateIssueArgs) => void;
  onCancel: () => void;
}

class IssueForm extends React.Component<IssueFormProps, CreateIssueArgs> {
  public render() {
    return (
      <Dialog
        fullWidth
        maxWidth="md"
        TransitionComponent={Transition}
        open
        scroll="body"
        onClose={this.props.onCancel}
        aria-labelledby="issue-info-title"
      >
        <DialogTitle id="issue-info-dialog">Create new issue</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide issue title and description
          </DialogContentText>
          <TextField
            id="issue-info-title"
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            onChange={this.handleChange('title')}
          />
          <TextField
            id="issue-info-description"
            label="Description"
            multiline
            rows="4"
            fullWidth
            placeholder="Provide description"
            margin="dense"
            variant="outlined"
            onChange={this.handleChange('description')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCreate} color="primary">
            Create
          </Button>
          <Button onClick={this.props.onCancel} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  private handleCreate = () => {
    this.props.onAddIssue(this.state);
  };

  private handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState(({
      [name]: event.target.value,
    } as unknown) as CreateIssueArgs);
  };
}

export default IssueForm;
