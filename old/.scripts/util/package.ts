import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { PackageJson } from 'type-fest';

export function loadPackageJson(project?: string): PackageJson {
  let pkgPath = 'package.json';
  if (project) {
    pkgPath = join('packages', project, pkgPath);
  }
  return JSON.parse(readFileSync(pkgPath, { encoding: 'utf8' }));
}

export function savePackageJson(pkg: PackageJson, project?: string) {
  let pkgPath = 'package.json';
  if (project) {
    pkgPath = join('packages', project, pkgPath);
  }
  writeFileSync(pkgPath, JSON.stringify(pkg, undefined, 2), { encoding: 'utf8' });
}
