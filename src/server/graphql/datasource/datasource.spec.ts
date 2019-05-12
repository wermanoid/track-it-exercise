import { Issue, IssueState } from '#shared/types';
import { DataStorage } from './datasource';

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

function* GeneratorStub(x: Issue[]) {
  for (const issue of x) {
    yield issue;
  }
}

describe('DataStorage', () => {
  it('query should return all data in storage', () => {
    const store = new DataStorage(GeneratorStub(dataStub));

    expect(store.query()).toEqual(dataStub);
  });

  it('should create new item in storage', () => {
    const store = new DataStorage(GeneratorStub([]));

    const result = store.create({ title: 'test-title' });

    expect(result.id).toBeDefined();
    expect(result.status).toBe(IssueState.OPEN.toUpperCase());
    expect(store.query()).toEqual([result]);
  });

  it('should update new item in storage', () => {
    const item = dataStub[0];
    const store = new DataStorage(GeneratorStub([item]));

    const result = store.update(item.id, {
      title: 'updated-title',
      status: 'CLOSED' as IssueState,
    });

    const expected = {
      ...item,
      title: 'updated-title',
      status: 'CLOSED',
    };

    expect(result).toEqual(expected);
    expect(store.query()).toEqual([expected]);
  });

  it('should throw when update with wrong id', () => {
    const item = dataStub[0];
    const store = new DataStorage(GeneratorStub([item]));

    expect(() => {
      store.update('Wrong', {
        title: 'updated-title',
        status: 'CLOSED' as IssueState,
      });
    }).toThrowError('Issue [ID:Wrong] does not exists');
  });
});
