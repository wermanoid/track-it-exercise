import { ApolloSource } from '#shared/stores/data-source';
import { Issue, IssueState } from '#shared/types';

import { map } from 'lodash/fp';
import { IssuesStore } from './issues';

const createIssue = (id: number) => ({
  id: `#${id}`,
  title: `test${id}`,
  description: `description-${id}`,
  status: (IssueState.OPEN.toUpperCase() as unknown) as IssueState,
  created: new Date().toISOString(),
});

const dataStub: Issue[] = [
  createIssue(1),
  createIssue(2),
  createIssue(3),
  createIssue(4),
  createIssue(5),
];

const expectedStub = map(
  (issue: Issue) =>
    (({
      ...issue,
      status: IssueState[issue.status as any],
    } as unknown) as Issue),
  dataStub
);

describe('IssuesStore', () => {
  let sourceMock: ApolloSource;

  beforeEach(() => {
    sourceMock = ({
      addIssue: jest.fn(i =>
        Promise.resolve({
          data: {
            addIssue: { ...i, id: 'generated', status: IssueState.OPEN },
          },
        })
      ),
      updateIssue: jest.fn().mockResolvedValue({}),
      getIssues: jest.fn().mockResolvedValue({ data: { issues: dataStub } }),
    } as unknown) as ApolloSource;
  });

  it('should contain list of issues after initialised', async () => {
    const store = new IssuesStore(sourceMock);

    await store.init();

    expect(store.issues).toEqual(expectedStub);
  });

  it('should update issue is store and source', async () => {
    const store = new IssuesStore(sourceMock);

    await store.init();
    const updated = {
      ...expectedStub[0],
      status: IssueState.CLOSED,
    };
    const result = await store.updateIssue(updated);

    expect(result).toEqual(updated);
    expect(store.issues[0]).toEqual(updated);
    expect(sourceMock.updateIssue).toHaveBeenCalledWith({
      ...updated,
      status: updated.status.toUpperCase(),
    });
  });

  it('should create new issue', async () => {
    const store = new IssuesStore(sourceMock);

    await store.init();

    const newIssue = { title: 'new-one' };

    const result = await store.addNewIssue(newIssue);

    expect(result).toBeDefined();
    if (result) {
      expect(result.id).toBe('generated');
      expect(result.status).toBe(IssueState.OPEN);
      expect(result.title).toBe('new-one');
    }
  });
});
