export interface Either<L, R> {
  map<R2>(transform: (x: R) => R2): Either<L, R2>;
  chain<R2>(transform: (x: R) => Either<L, R2>): Either<L, R2>;
  chain<R2, L2>(transform: (x: R) => Either<L2, R2>): Either<L2, R2>;
}

export class ContainerBase<T> {
  public $value: T;
  constructor(value: T) {
    this.$value = value;
  }
  map: any = _ => this;
  chain: any = f => this.map(f).flatten();
  flatten = () => this.$value;
}

export class Right<R, L = never> extends ContainerBase<R>
  implements Either<L, R> {
  map = f => new Right(f(this.$value));
}

export class Left<L, R = never> extends ContainerBase<L>
  implements Either<L, R> {
  chain = f => this;
}

export const Either = {
  of: <R, L = never>(value: R): Either<L, R> => new Right<R>(value),
};

export const left = <L, R = never>(value: L): Either<L, R> => new Left(value);
export const right = <R, L = never>(value: R): Either<L, R> => new Right(value);
