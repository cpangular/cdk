/**
 * A function that transforms a value of type T into a value of type R or undefined if the transform should not apply.
 * @template T The value to transform.
 * @template R The result of the transform.
 *
 */
export type TransformFn<T, R> = (value: T) => R | undefined;
