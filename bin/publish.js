"use strict";
const shell = require('shelljs');
const chalk = require('chalk');

const PACKAGES = [
  'ajax',
  'auth',
  'design'
];
const envFile = require('dotenv').config().parsed;

if (!envFile) {
  /*
   * For security reason, we want to keep our credentials to hidden file.
   * .env works perfect for this case, but in order for us to avoid making any commit
   * including any of those sensitive credentials and third party api key,
   * we will copy .env.sample file to create .env file for each developer's environment
   */
  throw new Error(
    'To publish npm package with scope you need to make login'
  );
}
Promise.all(PACKAGES.map((pkg) => {
  return Promise.resolve().then(() => {
    shell.cd('dist');
    shell.cd('packages-dist');
    shell.cd(pkg);
    shell.echo(chalk.green(`Publishing @capsule9/${pkg}`));
    const npmPublish = shell.exec('npm publish --access=public').code;
    shell.cd('..');
    shell.cd('..');
    shell.cd('..');
    return npmPublish;
  }).then((code) => {
    if (code !== 0) {
      shell.echo(chalk.red(`Error: ${code}`));
    }
    return;
  }).catch(console.error)
}));
