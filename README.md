## Introduction

ng-trunks is angular 4 ui component based on [Bulma](https://github.com/jgthms/bulma).

## Getting Started

### 1. Installation

Run the following command on your terminal to add dependencies in
 `package.json`.

**for dev-dependency(recommended)**
```bash
npm install --save-dev git+https://github.com/milocosmopolitan/angular-uix.git
```

**for dependency**
```bash
npm install --save git+https://github.com/milocosmopolitan/angular-uix.git
```

### 2. Import module

In order to use DHS Common Module on your Angular4 project, you must import the module in `app.module.ts`.

**src/app.module.ts**

``` javascript
import ...
import { Ng4UIModule } from 'dhs-common-module/src/lib/module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    Ng4UIModule.forRoot()
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

## Modules

#### [Menu](https://github.com/milocosmopolitan/angular-uix/blob/master/src/lib/components/menu/menu.md)
