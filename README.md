# Capsule9

this is source repository of `@capsule9/*` packages

## Introduction

Inspired by Angular, this framework is built to provide all kinds of goodies for building web applications.
It is powered with [Bulma](https://github.com/jgthms/bulma) css framework to provide rich styles with flex box.

## Developing Libraries


| Command | Description | Status |
| --- | --- | --- |
| `@capsule9/ajax` | Provide easy ajax handling with redux | in-progress |
| `@capsule9/auth` | Provide jwt strategy authentication with forms | in-progress |
| `@capsule9/design` | Provide UI component | in-progress |
| `@capsule9/cli` | Generator to spin up new @capsule project | future release |


## Getting Started

### 1. Installation

Run the following command on your terminal to add dependencies in
 `package.json`.

```bash
npm install --save git+https://github.com/omiologic/ng-capsule9.git
```

### 2. Import module

In order to use NG Capsule9 on your Angular4 project, you must import the module in `app.module.ts`.

**src/app.module.ts**

``` javascript
import ...
import { NgCapsule9Module } from 'ng-capsule9';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NgCapsule9Module.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```


## For Developers

## Prerequisites

The following set of tools and configurations are required in order to build and run the application as a developer.

### 1. Install Node Version Manager (nvm)

`nvm` allows you to install multiple versions of `Node.JS` and switch between them easily. This is very important if you are maintaining multiple applications or multiple versions of the same application.

  * See installation instructions on the [GitHub nvm page](https://github.com/creationix/nvm)
  * Execute install script `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash`
  * Verify that nvm is installed correctly `nvm ls`
  * You should not see any errors
  * Check the version `nvm --version` it should be 0.33.0

#### 2. Install Node.JS
  * See latest version [here](https://nodejs.org/en/download)
  * Install version 7.10.0 `nvm install 7.10.0`
  * Set 7.10.0 to be the default version `nvm alias default 7.10.0`
  * Make sure everything is set correctly: `nvm ls`

#### 3. Install global npm package npm-check-updates
npm-check-updates provides a utility program "ncu" that automatically detects whether all packages in `packages.json` are up to date, and if not, what are the latest versions.  You can optionally tell `ncu` to update the settings in `package.json` to update everything to the latest versions in one go.  `npm install` is still needed to actually install the new packages.   

Before the first production release, we try to keep all packages up-to-date. After releasing to production, updates must be carefully planned to avoid application instability.

`npm install -g npm-check-updates`


## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Build and start demo-app on `localhost:4200` |
| `npm run build` | Build demo-app to `/dist` |
| `npm run lint` | Run tslint |
| `npm test` | Run single run karma testing |
| `npm run test-browser` | Run karma testing on Chrome browser |
| `npm run coverage` | Run karma testing istanbul coverage |
| `npm run coverage-open` | Open karma coverage test report |
