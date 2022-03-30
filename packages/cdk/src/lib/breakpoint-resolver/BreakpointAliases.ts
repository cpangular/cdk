import { BreakpointValues } from './BreakpointValues';

export const BreakpointAliases: {
  [key: string]: keyof typeof BreakpointValues;
} = {
  SmallAndSmaller: '<=Small',
  SmallOrSmaller: '<=Small',
  SmallAndLess: '<=Small',
  SmallOrLess: '<=Small',
  SmallAndLarger: '>=Small',
  SmallOrLarger: '>=Small',
  SmallAndGreater: '>=Small',
  SmallOrGreater: '>=Small',

  MediumAndSmaller: '<=Medium',
  MediumOrSmaller: '<=Medium',
  MediumAndLess: '<=Medium',
  MediumOrLess: '<=Medium',
  MediumAndLarger: '>=Medium',
  MediumOrLarger: '>=Medium',
  MediumAndGreater: '>=Medium',
  MediumOrGreater: '>=Medium',

  LargeAndSmaller: '<=Large',
  LargeOrSmaller: '<=Large',
  LargeAndLess: '<=Large',
  LargeOrLess: '<=Large',
  LargeAndLarger: '>=Large',
  LargeOrLarger: '>=Large',
  LargeAndGreater: '>=Large',
  LargeOrGreater: '>=Large',
};
