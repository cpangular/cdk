import { IResolvable } from '@cpangular/cdk/value-resolver';

export type ConstrainedApplicationAlignment = 'left' | 'center' | 'right' | 'start' | 'end';
export interface ILayoutConfiguration {
  rightToLeft?: IResolvable<boolean>;
  constrainApplication?: IResolvable<string>;
  constrainedApplicationAlign?: IResolvable<ConstrainedApplicationAlignment>;
}
