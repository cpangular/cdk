import { compile } from 'sass';
import { writeFileSync, mkdirSync } from 'fs';
const loadPaths = ['../../node_modules'];

const baseDist = '../../dist/material-dynamic-theming/themes';
mkdirSync(baseDist, { recursive: true });


function buildCss(themeFile:String){
    const result = compile(`src/theme/${themeFile}.scss`, { loadPaths });
    writeFileSync(`${baseDist}/${themeFile}.css`, result.css);
}

buildCss('theme-core');
buildCss('theme-light');
buildCss('theme-light-full');
buildCss('theme-dark');
buildCss('theme-dark-full');