import { NoInfer, PartialDeep } from "./types";

export const fromPartial = <T>(mock: PartialDeep<NoInfer<T>>): T => {
  return mock as T;
};

export const fromAny = <T, U>(mock: U | NoInfer<T>): T => {
  return mock as T;
};

export const fromExact = <T>(mock: T): T => {
  return mock;
};
