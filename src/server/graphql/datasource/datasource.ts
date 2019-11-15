import faker from 'faker';
import { find, forEach, keys, uniqueId } from 'lodash/fp';

import { Issue, IssueState } from '#shared/types';

function* fakeStore(): IterableIterator<Issue> {
  for (let i = 0; i < 10; i++) {
    yield {
      id: uniqueId('ISS-'),
      title: faker.lorem.sentence(5),
      description: faker.lorem.sentences(3),
      status: (faker.random
        .arrayElement([IssueState.OPEN, IssueState.PENDING, IssueState.CLOSED])
        .toUpperCase() as unknown) as IssueState,
      created: faker.date.past().toISOString(),
    };
  }
}

const aggregateTo = <T>(gen: IterableIterator<T>, acc: T[]): T[] => {
  const { value, done } = gen.next();
  if (!done) return aggregateTo(gen, [...acc, value]);
  return acc;
};

export class DataStorage {
  private issues: Issue[] = [];

  constructor(generator: IterableIterator<Issue> = fakeStore()) {
    this.issues = aggregateTo(generator, []);
  }

  public query() {
    return this.issues;
  }

  public update(
    id: string,
    data: Partial<Pick<Issue, 'title' | 'description' | 'status'>>
  ) {
    const item = find({ id }, this.issues);
    if (!item) {
      throw new Error(`Issue [ID:${id}] does not exists`);
    }

    const updates = keys(data);
    forEach(key => {
      (item as any)[key] = (data as any)[key];
    }, updates);

    return item;
  }

  public create({
    title,
    description,
  }: Partial<Pick<Issue, 'title' | 'description'>>) {
    if (!title) {
      throw new Error('Title is required field');
    }

    const item: Issue = {
      id: uniqueId('ISS-'),
      title,
      description: description || null,
      status: (IssueState.OPEN.toUpperCase() as unknown) as IssueState,
      created: new Date().toISOString(),
    };

    this.issues.push(item);

    return item;
  }
}
