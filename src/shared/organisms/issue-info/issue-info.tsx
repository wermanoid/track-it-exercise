import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { toJS } from 'mobx';
import React from 'react';

import Stepper from '#shared/molecules/stepper';
import { TransitionProps } from '@material-ui/core/transitions/transition';

const Transition = (props: TransitionProps) => (
  <Slide direction="up" {...props} />
);

class IssueInfo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      issue: toJS(props.issue),
      changed: false,
    };
  }

  public handleStateChange = (newIssueState: any) => {
    this.setState({
      issue: {
        ...this.state.issue,
        status: newIssueState,
      },
      changed: true,
    });
  };

  public handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({
      issue: {
        ...this.state.issue,
        [name]: event.target.value,
      },
      changed: true,
    });
  };

  public handleSave = () => {
    const { issue } = this.state;
    this.props.updateIssue(issue);
    this.props.onCancel();
  };

  public render() {
    const { issue, changed } = this.state;
    const { onCancel } = this.props;

    return issue ? (
      <Dialog
        fullWidth
        maxWidth="md"
        onClose={onCancel}
        TransitionComponent={Transition}
        open
        scroll="body"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Issue: {issue.id}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            defaultValue={issue.title}
            fullWidth
            onChange={this.handleChange('title')}
          />
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows="4"
            fullWidth
            placeholder="Provide description"
            margin="dense"
            variant="outlined"
            defaultValue={issue.description}
            onChange={this.handleChange('description')}
          />
          <Stepper status={issue.status} onNextStep={this.handleStateChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleSave} color="primary" disabled={!changed}>
            Save
          </Button>
          <Button onClick={onCancel} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    ) : null;
  }
}

export default IssueInfo;
