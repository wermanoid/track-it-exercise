// start of types
type Aggregated<T> = {
  Right: Right<T>;
  Left: Left<T>;
  Either: Either<T>;
  Maybe: Maybe<T>;
  MonadJust: MonadJust<T>;
  Nothing: Nothing;
  MonadIO: MonadIO<T>;
  Task: Task<T>;
};

export interface MonadContainer<T> {
  readonly tag: keyof Aggregated<unknown>;
}

export type Monads = keyof Aggregated<unknown>;
export type MonadOf<$ extends Monads, T> = Aggregated<T>[$];

export type FIn<T> = T extends (x: infer X) => any ? X : never;
export type FOut<T> = T extends (x: any) => infer Y ? Y : never;

export interface Applicative<T> {
  ap: <M extends MonadContainer<FIn<T>>>(
    m: M extends MonadContainer<FIn<T>> ? M : never
  ) => MonadOf<M['tag'], FOut<T>>;
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
    Applicative<T> {
  readonly $value: T;
  readonly tag: 'Either';
}
export interface Right<T>
  extends MonadContainer<T>,
    Functor<T, 'Right'>,
    Monad<T>,
    Applicative<T> {
  readonly $value: T;
  readonly tag: 'Right';
}
export interface Left<T>
  extends MonadContainer<T>,
    Functor<T, 'Left'>,
    Monad<T>,
    Applicative<T> {
  readonly $value: T;
  readonly tag: 'Left';
}

export interface Maybe<T>
  extends MonadContainer<T>,
    Functor<T, 'Maybe'>,
    Monad<T>,
    Applicative<T> {
  readonly $value: T;
  readonly tag: 'Maybe';
}
export interface MonadJust<T>
  extends MonadContainer<T>,
    Functor<T, 'MonadJust'>,
    Monad<T>,
    Applicative<T> {
  readonly $value: T;
  readonly tag: 'MonadJust';
  chain: <R>(transform: (x: T) => R) => R;
}
export interface Nothing
  extends Functor<unknown, 'Nothing'>,
    Monad<unknown>,
    Applicative<unknown> {
  readonly $value: never;
  readonly tag: 'Nothing';
}

export interface MonadIO<T>
  extends MonadContainer<T>,
    Functor<T, 'MonadIO'>,
    Monad<T> {
  readonly tag: 'MonadIO';
  unsafePerformIO: () => T;
  chain: <R>(transform: (x: T) => R) => MonadIO<R>;
  ap: <M extends MonadContainer<FIn<T>> & Functor<FIn<T>, Monads>>(
    m: M extends MonadContainer<FIn<T>> ? M : never
  ) => MonadIO<FOut<T>>;
}
export interface Task<T>
  extends MonadContainer<T>,
    Functor<T, 'Task'>,
    Monad<T>,
    Applicative<T> {
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

type MappedToTransformation<T, R> = T extends {
  map: (f: (x: infer X) => any) => any;
}
  ? (x: X) => R
  : never;

export interface Map {
  <T, R>(transform: (x: T) => R): <U extends Functor<T, Monads> | T[]>(
    funktor: U
  ) => SwapMonadType<U, R>;
  // <T, R>(transform: MappedToTransformation<T, R>): (
  //   funktor: T
  // ) => SwapMonadType<T, R>;
  <T, R>(transform: MappedToTransformation<T, R>, funktor: T): SwapMonadType<
    T,
    R
  >;
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
  static of = <U>(value: U): MonadJust<U> => new Just<U>(value);
  readonly tag = 'MonadJust' as const;

  map = f => Just.of(f(this.$value));
  chain = f => (this.map(f) as Just<T>).join();
  ap = m => this.chain(val => m.map(val)); //m.map(this.$value);
  join = () => this.$value;
}