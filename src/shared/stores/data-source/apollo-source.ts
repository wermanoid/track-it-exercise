import { CreateIssueArgs, UpdateIssueArgs } from '#shared/types';
import ApolloClient, { gql } from 'apollo-boost';

export class ApolloSource {
  private client: ApolloClient<{}>;

  constructor(client: ApolloClient<{}>) {
    this.client = client;
  }

  public addIssue = async (issue: CreateIssueArgs) =>
    this.client.mutate({
      mutation: gql`
        mutation Update($issue: CreateIssueInput) {
          addIssue(issue: $issue) {
            id
            title
            status
            description
            created
          }
        }
      `,
      variables: {
        issue,
      },
    });

  public updateIssue = async (issue: UpdateIssueArgs) =>
    this.client.mutate({
      mutation: gql`
        mutation Update($issue: UpdateIssueInput) {
          updateIssue(issue: $issue) {
            id
            title
            status
            description
            created
          }
        }
      `,
      variables: {
        issue,
      },
    });

  public getIssues = async () =>
    this.client
      .query({
        query: gql`
          query {
            issues {
              id
              title
              status
              description
              created
            }
          }
        `,
      })
      .then(data => {
        // console.log({ here: this.client.extract() });
        return data;
      });
}
