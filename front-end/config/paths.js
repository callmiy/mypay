// tslint:disable:object-literal-sort-keys
"use strict";

const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const entryJs = (name, entry) => ({
  name: `js/${name}`,
  path: resolveApp(entry ? `src/${name}/${entry}` : "src/app.ts")
});
const entryCss = (name, pathStr) => {
  if (pathStr.map === undefined) {
    // it's a string
    pathStr = resolveApp(`src/${name}/${pathStr}`);
  }

  return {
    name: "css/" + name,
    path: pathStr
  };
};

module.exports = {
  phoenixTemplatePath: path.resolve(appDirectory, "../lib/burda_web/templates"),

  dotenv: resolveApp(".env"),

  appBuild: resolveApp("../priv/static"),

  appPublic: resolveApp("public"),

  appHtml: resolveApp("public/index.html"),

  appEntries: {
    commons: entryJs("commons"),

    indexRouteJs: entryJs("routes/index", "index.ts"),

    indexRouteCss: entryCss("routes/index", "index.scss"),

    shiftRouteJs: entryJs("routes/shift", "shift.ts"),

    shiftRouteCss: entryCss("routes/shift", "shift.scss"),

    newMetaFormComponentCss: entryCss(
      "components/new-meta-form",
      "new-meta-form.scss"
    ),

    commonsStyles: entryCss("commons", [
      resolveApp("semantic-theme/semantic.less"),
      resolveApp("src/app.scss")
    ])

    // serviceWorkerJs: {
    //   name: "service-worker1",
    //   path: resolveApp("src/service-worker.ts")
    // }
  },

  appPackageJson: resolveApp("package.json"),

  appSrc: resolveApp("src"),

  yarnLockFile: resolveApp("yarn.lock"),
  // testsSetup: resolveApp("src/setupTests.ts"),
  appNodeModules: resolveApp("node_modules"),

  appTsConfig: resolveApp("tsconfig.json"),
  // appTsProdConfig: resolveApp("tsconfig.prod.json"),
  appTsLint: resolveApp("tslint.json"),

  semanticThemeConfig: resolveApp("semantic-theme/theme.config"),

  handleBarsHelperDir: resolveApp("src/templates/helpers")
};
