# Authentication

Vtec Admin is first of all an admin app, so it offers few batteries helpers in order to integrate well with all different kind of authentication system, aka basic HTTP auth, JWT, OAUTH, full state cookies, etc. Similar as [data providers](data-providers.md), an adapter approach pattern is also used, which allows VA to communicate with you own API server authentication by writing your own auth provider.

## Included auth providers

VA provides 3 configurable auth providers :

* `basicAuthProvider` : Basic HTTP authentication.
* `jwtAuthProvider` : JWT for stateless authentication.
* `sanctumAuthProvider` : Full state cookie authentication which is the recommended way if you use Laravel.

::: tip GUEST MODE
Note that the auth provider is of course totally optional !  
If your API don't need auth at all, simply don't set the `authProvider` option in `VtecAdmin` constructor and VA will directly use a `guest` mode auth that will let you manage your resources as if we were connected.
:::

All of this providers need an instance of axios in order to work. The easiest way is to create an admin axios instance and passthrough it into both auth and data providers :

**`src/plugins/admin.js`**

```js
import VtecAdmin from "vtec-admin";

import {
  laravelDataProvider,
  sanctumAuthProvider,
} from "vtec-admin/src/providers";

import axios from "axios";

/**
 * Axios instance
 */
const baseURL = process.env.VUE_APP_API_URL || "http://localhost:8000";

const http = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

export default new VtecAdmin({
  //...
  authProvider: sanctumAuthProvider(http),
  dataProvider: laravelDataProvider(http),
  axios: http,
  //...
});
```

All included providers can be used the same way, if you want to use JWT provider instead, just replace `sanctumAuthProvider` by `jwtAuthProvider`.

::: tip GLOBAL ADMIN AXIOS
Pass axios instance into [VtecAdmin constructor](admin.md#instantiation) in order to access it everywhere on your custom Vue components by `$admin.axios`. Very useful for any non standard data provider call and allows reusing of current active authentication state (cookies or token).

Don't forget that only providers are aware of this axios instance, Vtec Admin doesn't know about it and exclusively use providers for API communication. There is just one exception for specific TinyMCE Wysiwyg for upload image handling but it's not even required for made it work, as it's just offer a better CSRF integration.
:::

In addition to axios, a second `params` optional argument can be used for various parameters as authentication routes, credentials format, etc.

| Option             | Description                                                                                           |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| **routes**         | Object containing all auth routes baseURL, aka login, logout, refresh (JWT), user infos               |
| **storageKey**     | JWT only, key name of local storage which will store the token, default to `jwt_token`                |
| **getToken**       | JWT only, function which return token from a successful login API response, default to `access_token` |
| **getCredentials** | Function mapper for credentials that return a compatible credentials format for your API              |
| **getName**        | Function which return name of a given user (taken from user infos API endpoint), default to `name`    |
| **getEmail**       | Function which return email of a given user, , default to `email`                                     |
| **getPermissions** | Function which return roles or permissions of a given user, default to `roles`                        |

### Full state cookies authentication

The [Laravel Sanctum Provider](https://github.com/okami101/vtec-admin/blob/master/packages/admin/src/providers/auth/sanctum.js) offers full integration with [Laravel Sanctum](https://github.com/laravel/sanctum), the ideal official package for full state SPA authentication support.  
This is actually the recommended provider for Laravel if your app is on the same main domain (which is 99% use cases), because it's more secure (insensitive to XSS attacks thanks to HttpOnly cookies) and it works seamlessly with impersonation feature as well as the elFinder File manager.

::: warning CSRF
As always with all based-cookies authentication system, you'll need a specific `csrf` route in order to get the XSRF token. Default is set to `/sanctum/csrf-cookie` so you have not to do anything if you use Laravel Sanctum with default config.  
By calling this URL, a local `XSRF-TOKEN` cookies will be stored with HttpOnly set to `false`. This allows axios to fetch it and set it as header request via `X-XSRF-TOKEN` for every next requests.  
Don't forget to set `withCredentials` axios config to `true` order to include session cookies on ever XHR request.
:::

In order to work on fresh Laravel project, simply run `composer require laravel/sanctum` and be sure to add the appropriate middleware for `api` routes :

**`app/Http/Kernel.php`**

```php {2}
'api' => [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    'throttle:300,1',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],
```

### JWT for stateless authentication

Use the [JWT Provider](https://github.com/okami101/vtec-admin/blob/master/packages/admin/src/providers/auth/jwt.js) for HTTP stateless authentication. It was fully tested on Laravel with [Laravel JWT](https://github.com/tymondesigns/jwt-auth) package. It should work with official [Laravel Passport](https://github.com/laravel/passport) as well.

With this provider, a simple bearer token will be injected on `Authorization` header for every next XHR requests. The JWT will be stored inside user localStorage under a configurable key. A specific `refresh` routes can be used if you want auto refresh token on every page change.

::: warning LESS FEATURES
If you use JWT authentication (same for next basic HTTP) mode instead of Sanctum, you'll lose elFinder integration as well as impersonation feature.
:::

### Basic HTTP authentication

The [Basic HTTP Provider](https://github.com/okami101/vtec-admin/blob/master/packages/admin/src/providers/auth/basic.js) can be used for basic cases. The full basic auth credentials will be simply sent to every XHR requests.

By default, basic auth will just return the username used for credentials. If you prefer use a specific API endpoint in order to give to VA more user information, which is recommended if you need functional profile editing, you must set the user route as follow :

**`src/plugins/admin.js`**

```js {9-11}
import {
  laravelDataProvider,
  basicAuthProvider,
} from "vtec-admin/src/providers";
//...
export default new VtecAdmin({
  //...
  authProvider: basicAuthProvider(http, {
    routes: {
      user: "/api/user",
    }
  }),
  //...
});
```

## Auth Pages

All unauthenticated pages as `Login`, `Register`, or any custom public pages should be registered as classic pages inside your base router file in `src/router/index.js`. It allows you to use any custom public layout.

Custom authenticated pages should use dedicated `src/router/admin.js`. This file is generated by Vue CLI Plugin, it's a simple admin route object which made use of all admin layout with app bar header and sidebar.

### Login page

![login](/assets/login.jpg)

::: tip VUE CLI PLUGIN
[Vue CLI VA Plugin](getting-started.md) will generate for you fully functional login page !  
If not using it, you can start with [login boilerplate page](https://github.com/okami101/vtec-admin/blob/master/packages/cli/generator/login/src/views/Login.vue) for your own.
:::

In order to work, login page must have a classic login form. Then all you have to do is to submit credentials into `login` VA auth module action which will pass them to the `login` auth provider method.

**`src/views/Login.vue`**

```js
import { mapActions } from "vuex";

export default {
  data() {
    return {
      username: null,
      password: null,
    };
  },
  methods: {
    ...mapActions({
      login: "auth/login",
    }),
    async validate() {
      await this.login({
        username: this.username,
        password: this.password,
      });
    },
  },
};
```

::: warning LOGIN REDIRECTION
For unauthenticated login redirection, in order to localize login URL path, Vtec Admin search for a route called `login`, so be sure to have this name set on your login route !
:::

::: tip REGISTRATION AND PASSWORD RESET
If you need to add this features, login page is the perfect place to do it. Simply add related forms, then call your API specific register or password reset endpoint by using global admin axios instance, as shown on next section for the profile page.
:::

### Profile page

![profile](/assets/profile.png)

::: tip VUE CLI PLUGIN
[Vue CLI VA Plugin](getting-started.md) will generate for you fully functional profile page !
If not using it, you can start with [profile boilerplate page](https://github.com/okami101/vtec-admin/blob/master/packages/cli/generator/profile/src/views/Profile.vue) for your own.
:::

As explained above, this authenticated page should be registered into `src/router/admin.js` for getting admin layout inheritance. The idea here is to get user information stored inside VA auth state and pre fill all account form from it.  
Because saving account information can be very different according to project context, there is no specific auth provider method available. So this the good showcase for using the global admin axios instance which owns all authorization context to made authenticated API requests.

Default api URLs are `/api/account/update` for account update and `/api/account/password` for password change. So don't forget to change their according to you suited API endpoints :

**`src/views/Profile.vue`**

```js {24,36}
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      accountForm: {
        name: null,
        email: null,
      },
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  methods: {
    ...mapActions({
      checkAuth: "auth/checkAuth",
    }),
    //...
    async updateAccount() {
      this.accountUpdating = true;
      if (await this.update("patch", "/api/account/update", this.accountForm)) {
        /**
         * Recheck auth
         */
        this.checkAuth();
        this.$admin.toast.success(this.$t("profile.account_updated"));
      }
      this.accountUpdating = false;
    },
    async changePassword() {
      this.passwordChanging = true;
      if (
        await this.update("patch", "/api/account/password", this.passwordForm)
      ) {
        //...
      }
      this.passwordChanging = false;
    },
  },
};
```

::: tip CHECK AUTH
After successful account update, you may refresh new user information into the Vuex store by simply recall `checkAuth` from your auth provider method. Anyway, even without that, this method will be called internally after each navigation change.  
Use `this.$admin.toast` in order to show quick information state of API response.
:::

## Writing your own auth provider

If none of this configurable auth provider doesn't suit you, you can always write your own by implementing following contract, similarly as [data providers](data-providers.md).

### API Contract

Auth providers must respect a given contract in order to allow communication with Vtec Admin. Next object represents the minimal contract that must be implemented :

```js
const authProvider = {
  login:          ({ username, password }) => Promise,
  logout:         () => Promise,
  checkAuth:      () => Promise,
  checkError:     (error) => Promise,
  getName:        (user) => String,
  getEmail:       (user) => String,
  getPermissions: (user) => Array,
}
```

All of this methods can be described as following :

| Operation          | Description                                                                                                                                                                                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **login**          | Send credentials information to your API. Should return a rejected promise if response status code is out of 2xx range. If success, `checkAuth` is called.                                                                                                          |
| **logout**         | Explicit logout from your API. If success, `checkAuth` is called.                                                                                                                                                                                                   |
| **checkAuth**      | Check current auth validity by retrieving user infos from a specific API endpoint. Called after each client-side route navigation. If success, refresh user infos on global auth store. If failed, cleanup auth store information and redirect to login page.       |
| **checkError**     | Called after each API error (4xx, 5xx), allows you to make custom actions depending on the API error status. Do automatic logout if reject promise is returned. The most common use case is to force automatic logout in case of API return 401 or 403 status code. |
| **getName**        | Return the full name of user from authenticated user object. Used for showing username inside user header dropdown.                                                                                                                                                 |
| **getEmail**       | Return the email of user from authenticated user object. Used for showing email inside user header dropdown.                                                                                                                                                        |
| **getPermissions** | Return the permissions or roles of user from authenticated user object. Used for [authorization system](authorization.md).                                                                                                                                          |
