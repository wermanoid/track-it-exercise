import React from 'react';

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export enum IssueState {
  OPEN = 'Open',
  PENDING = 'Pending',
  CLOSED = 'Closed',
}

export interface Issue {
  id: string;
  title: string;
  description: string | null;
  created: Date | string;
  status: IssueState;
}

export interface IssueStatus {
  status: IssueState;
  label: string;
  icon: React.ComponentType<{}>;
}

export type CreateIssueArgs = Pick<Issue, 'title'> &
  Partial<Pick<Issue, 'description'>>;

export type UpdateIssueArgs = Pick<Issue, 'id'> &
  Partial<Pick<Issue, 'description' | 'title' | 'status'>>;
