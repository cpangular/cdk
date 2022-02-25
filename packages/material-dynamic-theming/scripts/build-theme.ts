import { compile } from "sass";
import { writeFileSync, mkdirSync } from "fs";
const loadPaths = ["../../node_modules"];

const themLightResult = compile("src/theme/light-theme.scss", { loadPaths });

const baseDist = "../../dist/material-dynamic-theming/themes";

mkdirSync(baseDist, { recursive: true });

const themLightPath = `${baseDist}/light-theme.css`;
writeFileSync(themLightPath, themLightResult.css);

