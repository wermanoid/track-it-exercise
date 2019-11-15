import {
  CreateIssueArgs,
  Issue,
  IssueState,
  UpdateIssueArgs,
} from '#shared/types';
import { find, forEach, keys, map } from 'lodash/fp';
import { action, observable } from 'mobx';
import { ApolloSource } from '../data-source';

const { error } = console;

export class IssuesStore {
  @observable public issues!: Issue[];

  constructor(private source: ApolloSource, initial?: Issue[]) {
    this.issues = initial || [];
  }

  public async init() {
    return this.source
      .getIssues()
      .then(data => {
        this.issues = map(
          (issue: any) =>
            (({
              ...issue,
              status: (IssueState as any)[issue.status],
            } as unknown) as Issue),
          data.data.issues
        );
      })
      .catch(err => error(err));
  }

  @action public updateIssue = (issue: UpdateIssueArgs) =>
    this.source
      .updateIssue(({
        ...issue,
        ...(issue.status && { status: issue.status!.toUpperCase() }),
      } as unknown) as UpdateIssueArgs)
      .then(() => {
        const toUpdate = find({ id: issue.id! }, this.issues)!;
        forEach((key: string) => {
          (toUpdate as any)[key] = (issue as any)[key];
        }, keys(toUpdate));
        return toUpdate;
      })
      .catch(err => error(err));

  @action public addNewIssue = (issue: CreateIssueArgs) =>
    this.source
      .addIssue(issue)
      .then(data => {
        const newIssue: Issue = data.data.addIssue;
        this.issues.push({
          ...newIssue,
          status: IssueState[newIssue.status as any] as IssueState,
        });
        return newIssue;
      })
      .catch(err => error(err));

  public toObject(): any {
    return {
      issues: this.issues,
    };
  }
}
