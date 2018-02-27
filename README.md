```
ng new ngauth --routing
cd ngauth
code .


ng g component home
ng g component login
ng g component profile
```

app.componenent.html

```html
<ul>
  <li>
    <a [routerLink]="['/']">Home</a>
  </li>
  <li>
    <a [routerLink]="['/login']">Login</a>
  </li>
  <li>
    <a [routerLink]="['/profile']">Profile</a>
  </li>
</ul>

<div class="container">
  <router-outlet></router-outlet>
</div>
```

app-routing.module.ts

```ts
const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "profile", component: ProfileComponent }
];
```
