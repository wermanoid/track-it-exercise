import { IssueState } from '#shared/types';
import { gql } from 'apollo-server-express';

import { DataStorage } from './datasource';

const storage = new DataStorage();

export interface CreateIssueArgs {
  title?: string;
  description?: string;
}

export interface UpdateIssueArgs extends CreateIssueArgs {
  id: string;
  status?: IssueState;
}

const issuesResolver = (root: unknown, args: unknown, ctx: unknown) =>
  storage.query();

const createIsuueMutation = (root: unknown, args: { issue: CreateIssueArgs }) =>
  storage.create(args.issue);

const createUpdateMutation = (
  root: unknown,
  { issue: { id, ...data } }: { issue: UpdateIssueArgs }
) => storage.update(id, data);

export const typeDefs = gql`
  enum IssueStatus {
    OPEN
    PENDING
    CLOSED
  }

  type Issue {
    id: String!
    title: String!
    description: String
    status: IssueStatus!
    created: String
  }

  input CreateIssueInput {
    title: String
    description: String
  }

  input UpdateIssueInput {
    id: String!
    title: String
    description: String
    status: IssueStatus
  }

  type Query {
    issues: [Issue]
  }

  type Mutation {
    addIssue(issue: CreateIssueInput): Issue
    updateIssue(issue: UpdateIssueInput): Issue
  }
`;

export const resolvers = {
  Query: {
    issues: issuesResolver,
  },
  Mutation: {
    addIssue: createIsuueMutation,
    updateIssue: createUpdateMutation,
  },
};
