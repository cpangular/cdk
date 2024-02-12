import { Observable } from 'rxjs';
import { Size } from '../../size';

/**
 * A rxjs operator that transforms an observable of type {@link Size} into a value of observable R.
 * @template TValue The type of the value to return.
 * @param { Observable<Size> } source - The source observable.
 * @returns An observable that emits the result of the transform.
 */

export type BreakpointOperation<TValue = unknown> = (
  source: Observable<Size>,
) => Observable<TValue | undefined>;
