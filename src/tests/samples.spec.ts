import {
  Right,
  Maybe,
  IO,
  filter,
  map,
  Just,
  id,
  Functor,
  Monads,
  chain,
} from './samples';

describe('monads samples?', () => {
  it('should', () => {
    // let x!: Right<number>;
    // let x1!: Maybe<string>;
    // const trs = x
    //   .map(x => x + 1)
    //   .map(x => ({ final: `Result ${x * 2}` }))
    //   .chain(({ final }) => {
    //     let y!: Maybe<string>;
    //     return y;
    //   })
    //   .chain(res => {
    //     let y!: IO<(x: string) => symbol>;
    //     return y;
    //   })
    //   .ap(x1);
    // const init = Either.of(250)
    //   .map(x => x * 2)
    //   .chain(isMoreThan200)
    //   .map(x => x + 12);
    // // const x = Either.of(250).ap(Either.of(5));
    // const r = Either.of((a: number) => (b: number): number => a + b)
    //   .ap(Either.of(5))
    //   .ap(Either.of(123));
    // const xx = Either.of((x: number) => `Kind a text ${x}`).ap(Either.of(123));
    // console.log(r);
    // const init = IOC.of(x => y => x + y + 123);
    // const i2 = init.ap(MaybeC.of(2));
    // const i3 = i2.ap(MaybeC.of(4));
    // console.log(1, init);
    // // console.log(2, init.unsafePerformIO(2));
    // console.log(2, i2.unsafePerformIO());
    // console.log(3, i2.unsafePerformIO().$value(3));
    // console.log(4, i3);
    // console.log(5, i3.unsafePerformIO());
    const global = { store: [1, 2, 3, 4, 5, 6] };
    const io1 = IO.of(global.store);
    const io2 = io1.map(filter(x => x % 2 === 0)).map(map(x => x * 2));

    const csvIO = IO.of((arr: number[]) => arr.join(','));

    const t = map((x: number) => x + 2);
    const t2 = chain((x: number) => x + 2);
    const r = t([1, 2, 3, 4]);
    const r2 = t2(Just.of(2345));

    const temp = io2.map(r => r.concat([6, 7, 8, 9])).map(Just.of);
    const split = (c: string) => (line: string) => line.split(c);
    console.log({ r, r2 });
    console.log(1, temp);
    console.log(2, temp.unsafePerformIO());

    const result = csvIO
      .ap(io2.map(r => r.concat([6, 7, 8, 9])))
      .map(x => Just.of('CSV: ' + x))
      .map(map(r => 'Not bad: ' + r))
      .map(map(split(' ')))
      .map(chain(id));

    console.log(3, result);
    console.log(4, result.unsafePerformIO());

    const jF = Just.of((x: number) => (y: string) => `${y} is ${x * 2}`)
      .ap(Just.of(15))
      .ap(Just.of('OMG, Horror'));

    const rr = jF.map(Just.of).join();
    const rNever = jF.join();

    const jMap = Just.of('Example').map(r => r.length > 4);

    console.log(jF);

    // let x!: Just<number>;
    // //
    // const tr = map((r: number) => r + 123, x);

    // console.log(1, io1);
    // console.log(2, io1.unsafePerformIO());
    // console.log(3, io2);
    // console.log(4, io2.unsafePerformIO());
  });
});
