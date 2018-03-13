Based on the article:
[Angular Authentication Revisted](https://medium.com/@blacksonic86/angular-2-authentication-revisited-611bf7373bf9)

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

user.service.ts

```

```

login.component.ts

```

```

logged-in.guard.ts

```

```

Add guard to routes
app-routing.module.ts

```
{ path: "profile", component: ProfileComponent, canActivate: [LoggedInGuard] }
```

Provide the route guard:
app.module.ts

```
@NgModule({
 ...
  providers: [LoggedInGuard],
  ...
})
export class AppModule { }
```
