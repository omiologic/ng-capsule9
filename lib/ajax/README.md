# Capsule9 - Ajax

## Getting Started

### 1. Installation

Run the following command on your terminal to add dependencies in
 `package.json`.

```bash
npm install --save @capsule9/ajax
```

### 2. Import module

In order to use Capsule9 Ajax on your Angular4 project, you must import the module in `app.module.ts`.

**src/app.module.ts**

``` javascript
import ...
import { AjaxModule } from '@capsule9/ajax';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AjaxModule.forRoot({
      item: {
        urls: {
          'INFO': '/api/info'
        }
      },
      list: {
        urls: {
          'USERS': '/api/users'
        }
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
