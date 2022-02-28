import { compile } from "sass";
import { writeFileSync, mkdirSync } from "fs";
const loadPaths = ["../../node_modules"];

const baseDist = "../../dist/material-dynamic-theming/themes";
mkdirSync(baseDist, { recursive: true });

function buildCss(themeFile: String) {
  const result = compile(`src/theme/${themeFile}.scss`, {
    loadPaths,
    sourceMap: true,
  });

  const sm = JSON.stringify(result.sourceMap);
  const smBase64 = (Buffer.from(sm, "utf8") || "").toString("base64");
  const smComment =
    "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," +
    smBase64 +
    " */";
  const css = result.css.toString() + "\n".repeat(2) + smComment;
  writeFileSync(`${baseDist}/${themeFile}.css`, css);
}

/*
buildCss("theme-core");
buildCss("theme-light");
buildCss("theme-light-full");
buildCss("theme-dark");
buildCss("theme-dark-full");
buildCss("theme");
buildCss("theme-full");
*/