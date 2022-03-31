import { getProjectsSortedByDependencies } from './util/dependency-graph';
import { loadPackageJson, savePackageJson } from './util/package';

const projects = getProjectsSortedByDependencies();

const pkg = loadPackageJson();
const version = pkg.version;

const depVersions: { [dep: string]: string } = {
  ...pkg.dependencies,
  ...pkg.devDependencies,
  ...pkg.optionalDependencies,
  ...pkg.peerDependencies,
};

projects.forEach((p) => (depVersions[p.name] = version));

for (const p of projects) {
  const prjPkg = loadPackageJson(p.project);
  prjPkg.version = version;

  let deps = prjPkg.dependencies ?? {};
  for (const dep in deps) {
    if (Object.prototype.hasOwnProperty.call(deps, dep)) {
      deps[dep] = depVersions[dep];
    }
  }

  deps = prjPkg.devDependencies ?? {};
  for (const dep in deps) {
    if (Object.prototype.hasOwnProperty.call(deps, dep)) {
      deps[dep] = depVersions[dep];
    }
  }
  deps = prjPkg.peerDependencies ?? {};
  for (const dep in deps) {
    if (Object.prototype.hasOwnProperty.call(deps, dep)) {
      deps[dep] = depVersions[dep];
    }
  }
  deps = prjPkg.optionalDependencies ?? {};
  for (const dep in deps) {
    if (Object.prototype.hasOwnProperty.call(deps, dep)) {
      deps[dep] = depVersions[dep];
    }
  }

  savePackageJson(prjPkg, p.project);
}
