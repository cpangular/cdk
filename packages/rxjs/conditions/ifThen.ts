import { IfCheck, IfThen, IfThenEntry } from "./IfThenEntry";

export function ifThen<TValue, TCondition>(
  check: IfCheck<TCondition>,
  value: TValue
): IfThenEntry<TValue, TCondition>;
export function ifThen<TValue, TCondition>(
  check: IfCheck<TCondition>,
  valueFn: (condition: TCondition) => TValue
): IfThenEntry<TValue, TCondition>;
export function ifThen<TValue, TCondition>(
  check: IfCheck<TCondition>,
  value: TValue | IfThen<TValue, TCondition>
): IfThenEntry<TValue, TCondition> {
  return {
    check,
    then:
      typeof value === "function"
        ? (value as IfThen<TValue, TCondition>)
        : () => value,
  };
}
