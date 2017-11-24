# Capsule9 - Design

## Getting Started

### 1. Installation

Run the following command on your terminal to add dependencies in
 `package.json`.

```bash
npm install --save @capsule9/design
```

### 2. Import module

In order to use Capsule9 Design on your Angular4 project, you must import the module in `app.module.ts`.

**src/app.module.ts**

``` javascript
import ...
import { DesignModule } from '@capsule9/design';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    DesignModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
