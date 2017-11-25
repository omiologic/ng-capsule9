"use strict";

const shell = require('shelljs');
const chalk = require('chalk');
const fs = require('fs-extra');
const rootPkg = require('../package.json');

const VERSION = rootPkg.version;
const SCOPE = `@capsule9`;
const PACKAGES = [
  'ajax',
  'auth',
  'design'
];
// const NPM_DIR = `dist`;

// const ESM2015_DIR = `${NPM_DIR}/esm2015`;
// const ESM5_DIR = `${NPM_DIR}/esm5`;
// const BUNDLES_DIR = `${NPM_DIR}/bundles`;
// const OUT_DIR_ESM5 = `${NPM_DIR}/package/esm5`;

shell.echo(`Start building...`);

// shell.rm(`-Rf`, `${NPM_DIR}/*`);
// shell.mkdir(`-p`, `./${ESM2015_DIR}`);
// shell.mkdir(`-p`, `./${ESM5_DIR}`);
// shell.mkdir(`-p`, `./${BUNDLES_DIR}`);

/* TSLint with Codelyzer */
// https://github.com/palantir/tslint/blob/master/src/configs/recommended.ts
// https://github.com/mgechev/codelyzer
shell.echo(`Start TSLint`);
shell.exec(`npm run lint`);
shell.echo(chalk.green(`TSLint completed`));

/* AoT compilation */
// shell.echo(`Start AoT compilation`);
//
// PACKAGES.forEach((pkg) => {
//   shell.echo(chalk.green(`AoT compilation for ${pkg}`));
//   if (shell.exec(`tsc -p ./lib/${pkg}/tsconfig-build.json`).code !== 0) {
//     shell.echo(chalk.red(`Error: AoT compilation failed`));
//     shell.exit(1);
//   }
// });
// shell.echo(chalk.green(`AoT compilation completed`));

// /* BUNDLING PACKAGE */

// const  isIgnoredDirectory(name) {
//   if [[ -f "${1}" || "${name}" == "src" || "${name}" == "test" || "${name}" == "integrationtest" || "${name}" == "locales" ]]; then
//   return 0
// else
//   return 1
//   fi
// }
/* AoT compilation */
const compilePackage = (srcDir, outputDir, packageName) => {
  return new Promise((resolve, reject) => {
    shell.echo(chalk.green(`[${packageName}]: Compilig: tsc -p ${srcDir}/tsconfig-build.json`));
    if (shell.exec(`tsc -p ${srcDir}/tsconfig-build.json`).code !== 0) {
      shell.echo(chalk.red(`Error: AoT compilation failed`));
      reject(new Error(`[${packageName}]: Compile Error`));
      shell.exit(1);
    }
    resolve();
  })
};

const compilePackageES5 = (srcDir, outputDir, packageName) => {
  return new Promise((resolve, reject) => {
    shell.echo(chalk.green(`[${packageName}]: Compilig: tsc -p ${srcDir}/tsconfig-build.json --target es5 -d false --outDir ${outputDir} --importHelpers true --sourceMap`));
    if (shell.exec(
      `tsc -p ${srcDir}/tsconfig-build.json --target es5 -d false ` +
      `--outDir ${outputDir} --importHelpers true --sourceMap`).code !== 0
    ) {
      shell.echo(chalk.red(`Error: AoT compilation failed`));
      reject(new Error(`[${packageName}]: Compile Error`));
      shell.exit(1);
    }
    resolve();
  })
};

const rollupIndex = (inputDir, outputDir, packageName) => {
  return new Promise((resolve, reject) => {
    // shell.echo(`Rollup package ${packageName}`);
    if (shell.exec(
        `rollup ` +
        `-i ${inputDir}/${packageName}.js ` +
        `-o ${outputDir}/${packageName}.js ` +
        `--sourcemap -f es`
      ).code !== 0) {
      reject(new Error(`Error: Rollup package failed`));
    }
    resolve();
  })
};

const runRollup = (inputDir) => {
  return new Promise((resolve, reject) => {
    shell.cd(inputDir);
    shell.echo(chalk.green(`Rollup package : rollup -c rollup.config.js --sourcemap in ${process.cwd()}`));
    if (shell.exec(`rollup -c rollup.config.js --sourcemap`).code !== 0) {
      reject(new Error(`Error: Rollup package failed ${inputDir}`));
    }
    resolve();
  })
};

const versioningPackage = (srcDir, outDir, packageName) => {
  return fs.readJson(`${srcDir}/package.json`).then((pkgObj) => {
    shell.echo(`Generate package.json for ${packageName}`);
    const newPkg = Object.assign({}, pkgObj);
    newPkg.version = VERSION;

    if (newPkg.dependencies) {
      shell.echo(chalk.green(`Updating dependencies version according to root package.json`));
      Object.keys(newPkg.dependencies).forEach(key => {

        if (key.includes(`${SCOPE}/`)) {
          newPkg.dependencies[key] = VERSION;
        } else {
          newPkg.dependencies[key] = rootPkg.dependencies[key]
            ? rootPkg.dependencies[key]
            : rootPkg.devDependencies[key]
              ? rootPkg.devDependencies[key]
              : false
        }

        if (newPkg.dependencies[key]) {
          shell.echo(chalk.green(
            `Updated ${key} version to ${newPkg.dependencies[key]}`
          ));
        } else {
          shell.echo(chalk.red(
            `Error: Can't update package version of ${key},\n` +
            `if it doesn't exist on root package.json dependencies or devDependencies.`
          ));
          shell.exit(1);
        }
      });
    }

    if (newPkg.devDependencies) {
      shell.echo(chalk.green(`Updating devDependencies version according to root package.json`));
      Object.keys(newPkg.dependencies).forEach(key => {

        if (key.includes(`${SCOPE}/`)) {
          newPkg.devDependencies[key] = VERSION;
        } else {
          newPkg.devDependencies[key] = rootPkg.dependencies[key]
            ? rootPkg.dependencies[key]
            : rootPkg.devDependencies[key]
              ? rootPkg.devDependencies[key]
              : false
        }

        if (newPkg.devDependencies[key]) {
          shell.echo(chalk.green(
            `Updated ${key} version to ${newPkg.devDependencies[key]}`
          ));
        } else {
          shell.echo(chalk.red(
            `Error: Can't update package version of ${key},\n` +
            `if it doesn't exist on root package.json dependencies or devDependencies.`
          ));
          shell.exit(1);
        }
      });
    }

    if (newPkg.peerDependencies) {
      shell.echo(chalk.green(`Updating peerDependencies version according to root package.json`));
      Object.keys(newPkg.peerDependencies).forEach(key => {

        if (key.includes(`${SCOPE}/`)) {
          newPkg.peerDependencies[key] = VERSION;
        } else {
          newPkg.peerDependencies[key] = rootPkg.dependencies[key]
            ? rootPkg.dependencies[key]
            : rootPkg.devDependencies[key]
              ? rootPkg.devDependencies[key]
              : false
        }

        if (newPkg.peerDependencies[key]) {
          shell.echo(chalk.green(
            `Updated ${key} version to ${newPkg.peerDependencies[key]}`
          ));
        } else {
          shell.echo(chalk.red(
            `Error: Can't update package version of ${key},\n` +
            `if it doesn't exist on root package.json dependencies or devDependencies.`
          ));
          shell.exit(1);
        }
      });
    }
    return newPkg;
  }).then((newPkgObj) => {
    return fs.writeJson(`${outDir}/package.json`, newPkgObj, { spaces: '\t' })
  })
};


shell.echo(`Start bundling`);
const buildLib = Promise.all(PACKAGES.map((PACKAGE) => {

  const PWD = process.cwd();
  const ROOT_DIR = `${PWD}/lib`;
  const TEMP_DIR = `${PWD}/.tmp`;
  const SRC_DIR = `${ROOT_DIR}/${PACKAGE}`;
  const ROOT_OUT_DIR = `${PWD}/dist/packages`;
  const OUT_DIR = `${ROOT_OUT_DIR}/${PACKAGE}`;
  const OUT_DIR_ESM5 = `${ROOT_OUT_DIR}/${PACKAGE}/esm5`;
  const NPM_DIR = `${PWD}/dist/packages-dist/${PACKAGE}`;
  const ESM2015_DIR = `${NPM_DIR}/esm2015`;
  const ESM5_DIR = `${NPM_DIR}/esm5`;
  const BUNDLES_DIR = `${NPM_DIR}/bundles`;

  // rollupIndex ${OUT_DIR} ${ESM2015_DIR} ${PACKAGE}

  // compilePackage ${SRC_DIR} ${OUT_DIR} ${PACKAGE}
  shell.mkdir('dist');
  shell.mkdir('dist/packages');

  return Promise.resolve(shell.cp('-r', SRC_DIR, ROOT_OUT_DIR)).then(() =>
    compilePackage(SRC_DIR, OUT_DIR, PACKAGE)).then(() => {
    shell.mkdir('-p', NPM_DIR);
    shell.echo(`Copy ${PACKAGE} typings`);
    return shell.exec(`rsync -a --exclude=*.js --exclude=*.js.map ${OUT_DIR}/ ${NPM_DIR}`);
  }).then(() => {
    shell.cd(SRC_DIR);
    shell.echo(`Rollup ${PACKAGE} | ${process.cwd()}`);
    // console.log(shell.ls(), process.cwd());
    return rollupIndex(`${OUT_DIR}/src`, ESM2015_DIR, PACKAGE).then(() => {
      shell.echo(`Produce ESM5 version of ${PACKAGE}`);
      return compilePackageES5(SRC_DIR, OUT_DIR_ESM5, PACKAGE).then(() => (
        rollupIndex(`${OUT_DIR_ESM5}/src`, ESM5_DIR, PACKAGE)
      )).then(() => {
        shell.cd(SRC_DIR);
        shell.echo(`Run rollup conversions on ${PACKAGE} : ${SRC_DIR} | ${process.cwd()}`);
        // console.log(shell.ls(), process.cwd());
        return runRollup(SRC_DIR);
      });
    })
  }).then(() => {
    shell.echo(`Copy ${PACKAGE} package.json and .externs.js files`);
    shell.exec(`rsync -am --include="package.json" --include="*/" --exclude=* ${SRC_DIR}/ ${NPM_DIR}/`);
    shell.exec(`rsync -am --include="*.externs.js" --include="*/" --exclude=* ${SRC_DIR}/ ${NPM_DIR}/`);
    return Promise.resolve();
  }).then(() => {
    return versioningPackage(SRC_DIR, NPM_DIR, PACKAGE);
  }).then(() => {
    shell.cp(`${SRC_DIR}/README.md`, `${NPM_DIR}/README.md`);
    shell.cp(`${PWD}/LICENSE`, `${NPM_DIR}/LICENSE`);
    return;
  }).then(() => {
    return shell.exec(`uglifyjs ${BUNDLES_DIR}/${PACKAGE}.umd.js -c --comments -o ${BUNDLES_DIR}/${PACKAGE}.umd.min.js --source-map "filename='${BUNDLES_DIR}/${PACKAGE}.umd.min.js.map', includeSources"`);
  }).catch(console.error);
}));


buildLib.then(console.log).catch(console.error);
