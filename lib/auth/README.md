# Capsule9 - Auth

## Getting Started

### 1. Installation

Run the following command on your terminal to add dependencies in
 `package.json`.

```bash
npm install --save @capsule9/auth
```

### 2. Import module

In order to use Capsule9 Ajax on your Angular4 project, you must import the module in `app.module.ts`.

**src/app.module.ts**

``` javascript
import ...
import { AuthModule } from '@capsule9/auth';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
