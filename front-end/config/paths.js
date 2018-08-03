"use strict";

const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const entryJs = (name, entry) => ({
  name: "js/" + name,
  path: resolveApp(entry ? "src/" + name + "/" + entry : "src/index.ts")
});
const entryCss = (name, styles) => ({
  name: "css/" + name,
  styles
});

// we're in ./config/
module.exports = {
  dotenv: resolveApp(".env"),

  appBuild: resolveApp("../priv/static"),

  appPublic: resolveApp("public"),

  appHtml: resolveApp("public/index.html"),

  appEntries: {
    commons: entryJs("commons"),

    indexRouteJs: entryJs("routes/index", "index.ts"),

    commonsStyles: entryCss("commons", [
      resolveApp("semantic-theme/semantic.less"),
      resolveApp("src/index.scss")
    ])
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
