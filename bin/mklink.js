#!/usr/bin/env node

'use strict'

// 'bin/mklink.js' is a symlink pointing to this file, which makes a
// symlink in your project's main node_modules folder that points to
// the root of your project's directory.

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');
const appLink = path.resolve(__dirname, '..', 'node_modules', '@capsule9');

const symlinkError = error => (
  `*******************************************************************
${appLink} must point to '..'

This symlink lets you require('@capsule9/lib_path') rather than
../../../some/path

I tried to create it, but got this error:
${error.message}

You might try this:

  rm ${appLink}

Then run me again.

Alternatively, you may want to remove node_modules directory and rerun npm install

  ~ xoxo, @capsule9 module
********************************************************************`
);

function makeAppSymlink() {
  console.log(chalk.bold(chalk.green(`    LINKING '${appLink}' to '..'`)));
  try {
    // fs.unlinkSync docs: https://nodejs.org/api/fs.html#fs_fs_unlinksync_path
    try { fs.unlinkSync(appLink) } catch (swallowed) { }
    // fs.symlinkSync docs: https://nodejs.org/api/fs.html#fs_fs_symlinksync_target_path_type
    const linkType = process.platform === 'win32' ? 'junction' : 'dir'
    fs.symlinkSync('../lib/', appLink, linkType)
  } catch (error) {
    console.error(chalk.red(symlinkError(error)))
    // process.exit docs: https://nodejs.org/api/process.html#process_process_exit_code
    process.exit(1)
  }
  console.log(chalk.bold(chalk.green(`    CREATED '${appLink}' to '..'`)));
}

function ensureAppSymlink() {
  try {
    // readlinkSync docs: https://nodejs.org/api/fs.html#fs_fs_readlinksync_path_options
    const currently = fs.readlinkSync(appLink)
    if (currently !== '..') {
      throw new Error(`${appLink} is pointing to '${currently}' rather than '..'`)
    }
  } catch (error) {
    makeAppSymlink()
  }
}

if (module === require.main) {
  const dirPathArr = process.cwd().split('/');
  let rootDirName = dirPathArr.pop();

  let parentDir = dirPathArr.slice(1);
  if(parentDir[0] === 'node_modules') {
    dirPathArr.pop();
    rootDirName = dirPathArr.pop();
  }

  if(rootDirName === pkg.name){
    parentDir = dirPathArr.slice(1);
    if(parentDir[0] !== 'node_modules') {
      ensureAppSymlink();
    }
  }
}
