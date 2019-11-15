import React from 'react';
import { shallow } from 'enzyme';

import { IssueState } from '#shared/types';
import Stepper from './stepper';

describe('stepper:', () => {
  describe('getNextState:', () => {
    it('should return Open state', () => {
      const wrap = shallow(<Stepper status={IssueState.OPEN} />);

      const inst = wrap.instance() as Stepper;
      const result = inst.getNextState(0);

      expect(result).toEqual({
        activeStep: 0,
        completed: {},
      });
    });

    it('should return Pending state', () => {
      const wrap = shallow(<Stepper status={IssueState.OPEN} />);

      const inst = wrap.instance() as Stepper;
      const result = inst.getNextState(1);

      expect(result).toEqual({
        activeStep: 1,
        completed: { 0: true },
      });
    });

    it('should return Closed state', () => {
      const wrap = shallow(<Stepper status={IssueState.OPEN} />);

      const inst = wrap.instance() as Stepper;
      const result = inst.getNextState(2);

      expect(result).toEqual({
        activeStep: 2,
        completed: { 0: true, 1: true },
      });
    });
  });

  describe('should mount', () => {
    it('when status is Open', () => {
      const wrap = shallow(<Stepper status={IssueState.OPEN} />);

      const state = wrap.state();

      expect(state).toEqual({
        activeStep: 0,
        completed: {},
      });
    });

    it('when status is Pending', () => {
      const wrap = shallow(<Stepper status={IssueState.PENDING} />);

      const state = wrap.state();

      expect(state).toEqual({
        activeStep: 1,
        completed: { 0: true },
      });
    });

    it('when status is Closed', () => {
      const wrap = shallow(<Stepper status={IssueState.CLOSED} />);

      const state = wrap.state();

      expect(state).toEqual({
        activeStep: 2,
        completed: { 0: true, 1: true },
      });
    });
  });

  it('should setup Pending state', () => {
    const onNextStateMock = jest.fn();
    const wrap = shallow(
      <Stepper status={IssueState.OPEN} onNextStep={onNextStateMock} />
    );

    const inst = wrap.instance() as Stepper;
    inst.handleNext();

    expect(onNextStateMock).toHaveBeenCalledWith(IssueState.PENDING);
  });

  it('should setup Closed state', () => {
    const onNextStateMock = jest.fn();
    const wrap = shallow(
      <Stepper status={IssueState.OPEN} onNextStep={onNextStateMock} />
    );

    const inst = wrap.instance() as Stepper;
    inst.handleNext();
    inst.handleNext();

    expect(onNextStateMock.mock.calls[0][0]).toBe(IssueState.PENDING);
    expect(onNextStateMock.mock.calls[1][0]).toBe(IssueState.CLOSED);
  });
});
