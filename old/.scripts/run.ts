import { getParallelProjectsSortedByDependencies, getProjectsSortedByDependencies, IProject } from './util/dependency-graph';
import { runCmd } from './util/runCmd';

import arg from 'arg';

const args = arg({
  '--parallel': Boolean,
  '--full-parallel': Boolean,
  '-p': '--parallel',
  '-P': '--full-parallel',
});

(async () => {
  let phases: Array<IProject | IProject[]>;
  if (args['--full-parallel']) {
    phases = [getProjectsSortedByDependencies()];
  } else if (args['--parallel']) {
    phases = getParallelProjectsSortedByDependencies();
  } else {
    phases = getProjectsSortedByDependencies();
  }
  await runCmd(phases, args._[0]);
})();
