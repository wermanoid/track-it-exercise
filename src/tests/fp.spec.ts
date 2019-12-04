import { Either, left, right } from './fp';

describe('FP', () => {
  it('should', () => {
    const isGreaterThan5 = (x: number) =>
      x > 5 ? right(x) : left(`${x} is lesser than 5`);

    const toSquare = (x: number) => right(x * x);

    const errorWhenLesserThan50 = (x: number) =>
      x > 50 ? right(x) : left(new Error('Less then 50'));

    const r1 = Either.of(7)
      .chain(isGreaterThan5)
      .chain(toSquare)
      .chain(errorWhenLesserThan50)
      .map(res => `${res} is ok`);

    const r2 = Either.of(2)
      .chain(isGreaterThan5)
      .chain(toSquare)
      .map(res => `${res} is ok`);

    console.log(r1);
    console.log(r2);
  });
});
