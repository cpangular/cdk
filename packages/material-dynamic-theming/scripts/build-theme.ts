import { compile } from 'sass';
import { writeFileSync, mkdirSync, readdirSync } from 'fs';
import { parse as parsePath } from 'path';
const loadPaths = ['../../node_modules'];

const baseDist = '../../dist/material-dynamic-theming/prebuilt-themes';
mkdirSync(baseDist, { recursive: true });

function buildTheme(themeFile: String) {
  const result = compile(`src/prebuilt-themes/${themeFile}.scss`, {
    loadPaths,
    sourceMap: true,
  });

  const sm = JSON.stringify(result.sourceMap);
  const smBase64 = (Buffer.from(sm, 'utf8') || '').toString('base64');
  const smComment = '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,' + smBase64 + ' */';
  const css = result.css.toString() + '\n'.repeat(2) + smComment;
  writeFileSync(`${baseDist}/${themeFile}.css`, css);
}

function buildPrebuiltThemes() {
  const themes = readdirSync('src/prebuilt-themes');
  for (const themeScssFile of themes) {
    const p = parsePath(themeScssFile);
    buildTheme(p.name);
  }
}

buildPrebuiltThemes();
