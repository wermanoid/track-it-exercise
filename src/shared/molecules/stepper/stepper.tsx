import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { default as MaterialStepper } from '@material-ui/core/Stepper';
import Check from '@material-ui/icons/Check';
import React from 'react';

import { IssueStatuses } from '#shared/constants';
import { IssueState } from '#shared/types';
import { findIndex } from 'lodash/fp';

const steps = [IssueStatuses.Open, IssueStatuses.Pending, IssueStatuses.Closed];

const stateToHighlightColor: Record<IssueState, string> = {
  [IssueState.OPEN]: 'red',
  [IssueState.PENDING]: 'darkorange',
  [IssueState.CLOSED]: 'green',
};

export interface StatusStepperProps {
  status: IssueState;
  onNextStep?: (nextStatus: IssueState) => void;
}

interface StatusStepperState {
  completed: { [id: number]: boolean };
  activeStep: number;
}

class Stepper extends React.Component<StatusStepperProps, StatusStepperState> {
  constructor(props: StatusStepperProps) {
    super(props);

    const activeStep = findIndex({ status: this.props.status }, steps);
    this.state = this.getNextState(activeStep);
  }

  public getNextState = (activeStep: number) => {
    const completed: StatusStepperState['completed'] = {};
    for (let i = 0; i < activeStep; i++) {
      completed[i] = true;
    }

    return {
      activeStep,
      completed,
    };
  };

  public UNSAFE_componentWillReceiveProps(next: StatusStepperProps) {
    const activeStep = findIndex({ status: next.status }, steps);
    this.setState(this.getNextState(activeStep));
  }

  public handleNext = () => {
    const { onNextStep } = this.props;
    this.setState(
      (state: StatusStepperState) => this.getNextState(state.activeStep + 1),
      () => {
        if (onNextStep) {
          const { activeStep } = this.state;
          onNextStep(steps[activeStep].status);
        }
      }
    );
  };

  public render() {
    const { activeStep } = this.state;
    const isLastStep = activeStep === steps.length - 1;

    return (
      <div>
        <MaterialStepper activeStep={activeStep}>
          {steps.map(({ label, status, icon: Icon }, index) => (
            <Step key={status}>
              <StepLabel
                icon={
                  this.state.completed[index] ? (
                    <Check />
                  ) : (
                    <Icon css={{ color: stateToHighlightColor[status] }} />
                  )
                }
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </MaterialStepper>
        <div>
          {isLastStep ? null : (
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleNext}
            >
              Complete step
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default Stepper;
