## Introduction

ng-capsule9 is angular 4 ui component based on [Bulma](https://github.com/jgthms/bulma).

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
