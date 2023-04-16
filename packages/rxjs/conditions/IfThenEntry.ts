export type IfCheck<TCondition = unknown> = (condition: TCondition) => boolean;
export type IfThen<TValue, TCondition = unknown> = (condition: TCondition) => TValue;

export interface IfThenEntry<TValue, TCondition = unknown> {
  check: IfCheck<TCondition>;
  then: IfThen<TValue, TCondition>;
}
