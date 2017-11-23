"use strict";

const shell = require('shelljs');
const chalk = require('chalk');
const fs = require('fs-extra');
const rootPkg = require('../package.json');

const VERSION = rootPkg.version;
const PACKAGE = `@capsule`;
const PACKAGES = [
  'ajax',
  'auth'
];
const NPM_DIR = `dist`;

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
shell.echo(`Start AoT compilation`);

PACKAGES.forEach((pkg) => {
  shell.echo(chalk.green(`AoT compilation for ${pkg}`));
  if (shell.exec(`tsc -p ./lib/${pkg}/tsconfig-build.json`).code !== 0) {
    shell.echo(chalk.red(`Error: AoT compilation failed`));
    shell.exit(1);
  }
});
shell.echo(chalk.green(`AoT compilation completed`));

// /* BUNDLING PACKAGE */
shell.echo(`Start bundling`);

Promise.all(PACKAGES.map((pkg) => {

  const RollUp = () => {
    return new Promise((resolve, reject) => {
      shell.echo(`Rollup package ${pkg}`);
      if (shell.exec(`rollup -c ./rollup.es.config.js ` +
          `-i ${NPM_DIR}/packages/${pkg}/${pkg}.js ` +
          `-o ${NPM_DIR}/packages/${pkg}/esm5/${pkg}.js`
        ).code !== 0) {
        reject(new Error(`Error: Rollup package failed`));
      }

      shell.echo(`Produce ESM5 version`);
      shell.exec(`ngc -p ./lib/${pkg}/tsconfig-build.json --target es5 -d false ` +
        `--outDir ${NPM_DIR}/packages/${pkg}/esm5/${pkg}.js --importHelpers true --sourceMap`);

      shell.echo(`Run Rollup conversion on package`);
      if (shell.exec(`rollup -c ./lib/${pkg}/rollup.config.js ` +
          `-i ${NPM_DIR}/packages/${pkg}/esm5/${pkg}.js ` +
          `-o ${NPM_DIR}/packages/${pkg}/bundle/${pkg}.umd.js`
        ).code !== 0) {
        reject(new Error(`Error: Rollup conversion failed`));
        // shell.echo(chalk.red(`Error: Rollup conversion failed`));
        // shell.exit(1);
      }
      resolve();
    });
  };

  return RollUp().then(() => fs.readJson(`./lib/${pkg}/package.json`)).then((pkgObj) => {
    shell.echo(`Generate package.json for ${pkg}`);
    const newPkg = Object.assign({}, pkgObj);
    newPkg.version = VERSION;

    if (newPkg.dependencies) {
      shell.echo(chalk.green(`Updating dependencies version according to root package.json`));
      Object.keys(newPkg.dependencies).forEach(key => {

        if (key.includes('@capsule9/')) {
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

        if (key.includes('@capsule9/')) {
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

        if (key.includes('@capsule9/')) {
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
    return fs.writeJson(`./${NPM_DIR}/packages/${pkg}/package.json`, newPkgObj, { spaces: '\t' })
  }).catch(console.error)
}));
