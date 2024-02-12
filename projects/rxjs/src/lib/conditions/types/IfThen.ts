import { Resolvable } from '../../resolve';

export type IfThen<TValue, TCondition = unknown> = (
  condition: TCondition,
) => Resolvable<TValue>;
