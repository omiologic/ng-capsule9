"use strict";
const shell = require('shelljs');

const PACKAGES = [
  'ajax',
  'auth'
];

Promise.all(PACKAGES.map((pkg) => {
  return Promise.resolve().then(() => {
    shell.cd('dist');
    shell.cd('packages');
    shell.cd(pkg);
    console.log(shell.ls());
    return shell.exec('npm publish').code;
  }).then((code) => {
    shell.cd('..');
    shell.cd('..');
    shell.cd('..');
    return;
  }).catch(console.error)
}));
