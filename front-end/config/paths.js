"use strict";

const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// we're in ./config/
module.exports = {
  dotenv: resolveApp(".env"),

  appBuild: resolveApp("../priv/static/js"),

  appPublic: resolveApp("public"),

  appHtml: resolveApp("public/index.html"),

  appEntries: {
    app: resolveApp("src/index.ts"),

    shift: resolveApp("src/shift/index.ts"),

    styles: [
      resolveApp("semantic-theme/semantic.less"),
      resolveApp("src/index.scss")
    ]
  },

  appPackageJson: resolveApp("package.json"),

  appSrc: resolveApp("src"),

  yarnLockFile: resolveApp("yarn.lock"),
  // testsSetup: resolveApp("src/setupTests.ts"),
  appNodeModules: resolveApp("node_modules"),

  appTsConfig: resolveApp("tsconfig.json"),
  // appTsProdConfig: resolveApp("tsconfig.prod.json"),
  appTsLint: resolveApp("tslint.json"),

  semanticThemeConfig: resolveApp("semantic-theme/theme.config")
};
