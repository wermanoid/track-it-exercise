// start of types
type Aggregated<T> = {
  Right: Right<T>;
  Left: Left<T>;
  Either: Either<T>;
  Maybe: Maybe<T>;
  Just: Just<T>;
  Nothing: Nothing;
  MonadIO: MonadIO<T>;
  Task: Task<T>;
};

export type Monads = keyof Aggregated<unknown>;
export type MonadOf<$ extends Monads, T> = Aggregated<T>[$];

export type FIn<T> = T extends (x: infer X) => any ? X : never;
export type FOut<T> = T extends (x: any) => infer Y ? Y : never;

export interface MonadContainer<T> {
  readonly tag: Monads;
}

export interface Applicative<T, Mtype extends Monads> {
  ap: <M extends MonadOf<Mtype, FIn<T>>>(
    m: M extends MonadOf<Mtype, FIn<T>> ? M : never
  ) => MonadOf<Mtype, FOut<T>>;
}
export interface Functor<T, MType extends Monads> {
  map: <R>(transform: (x: T) => R) => MonadOf<MType, R>;
}
export interface Monad<T> {
  chain: <R>(transform: (x: T) => R) => R | Monad<R>;
}

// let y!: MonadJust<number>;
// let x!: Applicative<(x: string) => (x: string) => string>;

// const r = x.ap(y);
// const r2 = r.ap(y);

export interface Either<T>
  extends MonadContainer<T>,
    Functor<T, 'Either'>,
    Monad<T>,
    Applicative<T, 'Either'> {
  readonly $value: T;
  readonly tag: 'Either';
}
export interface Right<T>
  extends MonadContainer<T>,
    Functor<T, 'Right'>,
    Monad<T>,
    Applicative<T, 'Right'> {
  readonly $value: T;
  readonly tag: 'Right';
}
export interface Left<T>
  extends MonadContainer<T>,
    Functor<T, 'Left'>,
    Monad<T>,
    Applicative<T, 'Left'> {
  readonly $value: T;
  readonly tag: 'Left';
}

export interface MonadMaybe<T>
  extends MonadContainer<T>,
    Functor<T, 'Maybe'>,
    Monad<T>,
    Applicative<T, 'Maybe'> {
  readonly $value: T;
  readonly tag: 'Maybe';
}
export interface MonadJust<T>
  extends MonadContainer<T>,
    Functor<T, 'Just'>,
    Monad<T>,
    Applicative<T, 'Just'> {
  readonly $value: T;
  readonly tag: 'Just';
  chain: <R>(transform: (x: T) => R) => R;
  join: () => T;
  // ap: <M extends Just<FIn<T>>>(m: M) => Just<FOut<T>>;
}
export interface MonadNothing
  extends Functor<unknown, 'Nothing'>,
    Monad<unknown>,
    Applicative<unknown, Monads> {
  readonly $value: null;
  readonly tag: 'Nothing';
}

export interface MonadIO<T>
  extends MonadContainer<T>,
    Functor<T, 'MonadIO'>,
    Monad<T>,
    Applicative<T, 'MonadIO'> {
  readonly tag: 'MonadIO';
  unsafePerformIO: () => T;
  chain: <R>(transform: (x: T) => R) => MonadIO<R>;
  // ap: <M extends MonadContainer<FIn<T>> & Functor<FIn<T>, Monads>>(
  //   m: M extends MonadContainer<FIn<T>> ? M : never
  // ) => MonadIO<FOut<T>>;
}
export interface Task<T>
  extends MonadContainer<T>,
    Functor<T, 'Task'>,
    Monad<T>,
    Applicative<T, 'Task'> {
  readonly $value: T;
  readonly tag: 'Task';
}

export interface Filter {
  <T>(filter: (v: T) => boolean): (funktor: T[]) => T[];
  <T>(filter: (v: T) => boolean, funktor: T[]): T[];
}

type SwapMonadType<T, R> = T extends { tag: Monads }
  ? MonadOf<T['tag'], R>
  : T extends unknown[]
  ? R[]
  : never;

export interface Map {
  <T, R>(transform: (x: T) => R): <U extends Functor<T, Monads> | T[]>(
    funktor: U
  ) => SwapMonadType<U, R>;
  <T, R>(
    transform: (x: T) => R,
    funktor: Functor<T, Monads> | T[]
  ): SwapMonadType<T, R>;
}

export interface Chain {
  <T, R>(transform: (x: T) => R): <U extends Functor<T, Monads> | T[]>(
    funktor: U
  ) => R;
  <T, R>(transform: (x: T) => R, funktor: Functor<T, Monads> | T[]): R;
}

// end of types

// utility fp function wrappers
export function curryF(fn) {
  const arity = fn.length;

  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
}

export const compose = (...fns) => (...args) =>
  fns.reduceRight((res, fn) => [fn(...res)], args)[0];

export const id = <T>(x: T): T => x;

export const filter: Filter = curryF((fn, funktor) => funktor.filter(fn));

export const map: Map = curryF((fn, funktor) => funktor.map(fn));

export const chain: Chain = curryF((fn, funktor) => funktor.chain(fn));
// utility fp function wrappers

export class Container<T> implements MonadContainer<T> {
  get tag(): MonadContainer<T>['tag'] {
    throw Error("Can't get tag on Container");
  }
  constructor(public $value: T) {}
}

export class IO<T> implements MonadIO<T> {
  static of = <X>(value: X) => new IO<X>(() => value);

  readonly tag = 'MonadIO' as const;

  constructor(public unsafePerformIO: () => T) {}

  map = <R>(f: (x: T) => R) => new IO<R>(compose(f, this.unsafePerformIO));

  chain = <R>(f: (x: T) => R): MonadIO<R> => this.map(f).join();

  ap: MonadIO<T>['ap'] = m =>
    this.chain(f => m.map<FOut<T>>(f as any) as FOut<T>);

  // join = (): T extends MonadIO<unknown> ? IO<T> : never =>
  // IO.of(this.unsafePerformIO()) as any;
  join = <X>() =>
    new IO<X>(() =>
      ((this.unsafePerformIO() as unknown) as IO<X>).unsafePerformIO()
    );
}

export class Just<T> extends Container<T> implements MonadJust<T> {
  static of = <U>(value: U): Just<U> => new Just<U>(value);
  readonly tag = 'Just' as const;

  map = <R>(f: (x: T) => R) => Just.of(f(this.$value));
  chain = <R>(f: (x: T) => R): R => this.map(f).join();
  ap: MonadJust<T>['ap'] = m => this.chain(val => m.map(val as any));
  // <M extends Just<FIn<T>>>(m: M) =>
  //   this.chain(val => m.map((val as unknown) as (x: FIn<T>) => FOut<T>));
  join = (): T => this.$value;
}

export class Nothing extends Container<null> implements MonadNothing {
  static of = <T>(_: T) => new Nothing(null);
  readonly tag = 'Nothing' as const;
  $value = null;
  map = _ => this;
  chain = _ => this;
  ap = _ => this;
  join = _ => this;
}

export class Maybe<T> extends Container<T> implements MonadMaybe<T> {
  static of = <T>(x: T) =>
    x === null || x === undefined ? Nothing.of(null) : Just.of(x);
  readonly tag = 'Maybe' as const;
}
