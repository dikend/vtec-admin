<p align="center">
<a href="https://vtec.okami101.io" target="_blank" rel="noopener"><img src="https://vtec.okami101.io/logo.svg" width="300"></a>
</p>

<p align="center">
<a href="https://www.npmjs.com/package/vtec-admin"><img src="https://img.shields.io/npm/v/vtec-admin.svg?style=flat-square" alt="Latest Version on NPM"></a>
<a href="https://www.npmjs.com/package/vtec-admin"><img src="https://img.shields.io/npm/l/vtec-admin.svg?style=flat-square" alt="License"></a>
</p>

# Vtec Admin

SPA Admin Framework for Vue.js running on top of REST APIs, built on Vuetify and comes with dedicated [Vue CLI plugin](https://www.npmjs.com/package/vue-cli-plugin-vtec-admin) for 🚀. Ready to use on Laravel API backend by using official [Vtec Laravel Crud](https://github.com/okami101/vtec-laravel-crud) composer package, but can be used on every backend of your choice with your own data and authentication providers.

> See [full documentation](https://vtec.okami101.io)  
> Check [online demo](https://vtec-bookstore-demo.okami101.io) -> go to admin and use pre-filled login (read only)  
> This project was heavily inspired by [React Admin](https://github.com/marmelab/react-admin/) made by awesome [Marmelab Team](https://marmelab.com/)

[![demo](https://vtec.okami101.io/assets/screenshot.png)](https://vtec-bookstore-demo.okami101.io)

## Features

* Powered by **Vuetify**.
* 🔌 Full standalone **responsive SPA Admin UI** that can be adapted to **any backend (REST, GraphQL, SOAP, etc.)** by writing your **own data and auth providers** by following specific contracts which ensure compatibility.
* ⚡ Bare **minimal Vue.js boilerplate code** needed to get your CRUD pages working via [DSL](https://en.wikipedia.org/wiki/Domain-specific_language) approach.
* 🚀 [Vue CLI plugin](packages/cli) provided for **immediate quick start** while including nice [material theme by Creative Tim](https://github.com/creativetimofficial/vuetify-material-dashboard). Can be used on any Vue.js based application as well.
* 💝 100% **Vue CLI friendly**. The Vtec Admin library is simply a plugin which integrates within all of your existing plugins, notably **Vue Router, Vuex, Vue I18n and Vuetify**. Keep total control of your Vue app by adding your own routes with **custom pages, custom store modules, and Vuetify theme** as you are used to on Vue CLI base project.
* Ready to use data providers for Laravel within [Spatie Laravel query builder](https://github.com/spatie/laravel-query-builder), hydra for [API Platform](https://api-platform.com/) and [JSON Server](https://github.com/typicode/json-server).
* 🔒 3 auth providers included : the recommended **cookie based authentication** for [Laravel Sanctum](https://github.com/laravel/sanctum), **stateless authentication with JWT** (tested with [Laravel JWT](https://github.com/tymondesigns/jwt-auth)), and simple **basic HTTP auth**.
* 🔒 Simple **guest authentication support** if no auth provider transmitted.
* ⛔ Advanced **user permissions helpers** for hide/show some UI components or menu links.
* 🚀 Official separate [Vtec Laravel Crud](https://github.com/okami101/vtec-laravel-crud) package provided for **insane quick start from top to bottom**. Provides many backend features as spa authentication, profile editing, users management, impersonation, [translatable fields](https://github.com/spatie/laravel-translatable), [media support](https://github.com/spatie/laravel-medialibrary), [file manager](https://github.com/Studio-42/elFinder) with Wysiwyg bridges, etc.
Allow immediate start development from backend to UI with already basic functional admin.
* Stay as little magic as possible by fully respecting each backend and frontend development environnement. If you know well Laravel and Vue CLI basics, so you're ready to go !
* 🚀 Automatic **guesser CRUD pages** which print full Vue.js template generated code as starter kit for your own templates.
* 🚀 **CRUD code generator commands** on both Laravel and Vue CLI for even quicker ready-to-go API and UI base code.
* ⚡ With usage of Vtec Admin, code generators as well as Vue.js power, feel the **better mix between productivity, nice development experience and limitless customization**.
* 👓 Bookstore demo application which made use of all Vtec Admin features.
* 🗄 [Complete documentation](https://vtec.okami101.io).
* 📝 Full intellisense support for all VA Components on **Vetur and Jetbrains products** !
* 🌍 **Internationalization support** via Vue I18n, include english and french translations. Can be easily configured by taking user browser language.
* 🌍 **Translatable resource fields** by contextual language selection on each crud page.
* 3 **providers component** for minimal boilerplate code : list, show and form.
* **Server-side form validation** support.
* Many fields and inputs components for various data types: **select, boolean, number, rich text**, etc.
* **Autocomplete** input with entity reference support.
* **TinyMCE 5** as default Wysiwyg with **elFinder bridge**, can be replaced by your own.
* Create your **own fields and inputs** simply by extending mixins.
* Full-featured DataTable, including **multi-sort, pagination, global search, advanced filters, basic CSV export, live query string context**. And of course with possibility of **cell templating**.
* Data iterator decoupled from data table which allows **total customization of list layout**.
* 🔍 Advanced **as-you-type filters** with many supported inputs: select, boolean, autocomplete for search by relations, with multiple, etc.
* Customizable by-row, bulk and global actions.
* Direct **aside create/edit** from list instead of separate crud page.
* 🍻 Support of resources **association and dissociation** for relationships.
* 🤑 To finish, for what it's worth, it's completely **free of charge**.

## Disclaimer

As this project was entirely made on my personal free time while I'm employed, and is totally free of charge, don't expect any support of anything. This project only aims to satisfy my own needs on personal projects for now.

This is a pre-alpha version, without any unit tests or CI, so probably plenty of 🐛. Expect regular breaking changes 💥. Don't waste your time of using this library for real projects, only for adventurers ! Maintenance is not guaranteed.

If you look for a free SPA admin library with good support and large community, I strongly encourage you to go with [React Admin](https://github.com/marmelab/react-admin/) which is far more mature, optimized and fully tested. On commercial side you should take a look to [Laravel Nova](https://nova.laravel.com/) for highest productivity with nice SPA UI. For more classical and free efficient admin builder take a look on [EasyAdmin](https://github.com/EasyCorp/EasyAdminBundle), besides the last V3 release sounds really promising.

## Why ⏩Vtec⏪

`vue-admin` was obviously already taken on NPM registry and `vuetify-admin` seemed too much UI related for me. But I wanted to keep VA acronym. I'm a big fan of 90' Japanese cars and I remembered VTEC acronym from Honda, a system designed for power optimization at low and high speed. So I found it very suited for this project, which tries to deliver high efficiency from top to bottom.

## Architecture

![Architecture](https://vtec.okami101.io/diagrams/architecture.svg)

> See how it works [here](https://vtec.okami101.io/guide/#how-it-works).

## Installation

Select your most suitable guide :

* For basic presentation and quick install via the Vue CLI Plugin, go to [getting started](https://vtec.okami101.io/guide/getting-started.html).
* For best initial starting showcase of Vtec Admin features, follow [this tutorial guide](https://vtec.okami101.io/guide/tutorial.html).
* If you choose Laravel as backend, follow [this optimized guide](https://vtec.okami101.io/guide/laravel.html).

## Note on this main repo

It's contains all necessary projects to develop Vtec Admin and run demo and tutorials :

* [Vtec Admin Library](packages/admin), the main admin library.
* [Vtec Admin Vue CLI Plugin](packages/cli), the associated Vue CLI plugin which contains all base code boilerplate for quick install and UI commands code generator.
* [Vtec Laravel Crud](https://github.com/okami101/vtec-laravel-crud), git submodule of composer package to use on fresh Laravel project which facilitates Vtec Admin integration and includes server-side API commands generator.
* [Bookstore Admin Demo](examples/demo), full-featured admin sample build on top of main Vtec Admin Library.
* [Bookstore Laravel Demo](examples/demo-laravel), suitable API backend for bookstore admin demo based on Laravel.
* [Admin Tutorial](examples/tutorial), finished tutorial after following [dedicated docs](https://vtec.okami101.io/guide/tutorial.html).
* [API Platform Tutorial](examples/api-platform), finished tutorial after following [dedicated docs](https://vtec.okami101.io/guide/api-platform.html).
* [Laravel Tutorial](examples/laravel), finished tutorial after following [dedicated docs](https://vtec.okami101.io/guide/laravel.html) which aims to made a good showcase of YAML driven development.
* [Vue CLI base](vue-cli-base), clean basic Vuetify CLI project starter for proper install testing of [VA Vue CLI plugin](packages/cli).
* [Vtec Docs](docs), VuePress docs.

> All of this projects are automatically linked together by symlinks thanks to yarn workspaces and composer for best library development experience. HMR from demo to admin library side-by-side is fully supported !

## Usage

### How to run demo locally

Be sure to have cloned this repo with git submodules. If not the case use `git submodule init && git submodule update`. [Vtec Laravel Crud](https://github.com/okami101/vtec-laravel-crud) should be cloned under **vtec-laravel-crud** sub folder.

Requirements :

* **Yarn**.
* **Docker** with **docker-compose**, required for quick-start run backend API. If you don't want it, follow [dedicated instructions](examples/demo-laravel#classic).
* **Make** for easy starting all necessary tools. For Windows users install it via [scoop](https://scoop.sh/) with `scoop install make`. Use `make help` for all detail commands.

In order to run demo :

```bash
yarn # install all yarn dependencies
make up-demo-laravel # run server api through docker (take a pastis if 1st time...)
make prepare-demo-laravel # initialize laravel app and inject dummy data (use it only at 1st launch)
make run-demo # compile all bookstore demo admin with HMR dev mode enabled
```

Admin panel should autostart at [http://localhost:8080](http://localhost:8080).

### Run and build docs

Docs are hosted by VuePress. Use `make run-docs` to launch it on [http://localhost:9000](http://localhost:9000). `make build-docs` will generate static files inside `docs` root folder.

> API documentation for all VA components are auto generated from source code thanks to [Vue Docgen API](https://vue-styleguidist.github.io/docs/Docgen.html).

## But why another admin panel again

See [guide introduction](https://vtec.okami101.io/guide/#purpose) for real purpose of this project.

### Place of this project within other admin frameworks

So many admin panel are generally tightly coupled with backend framework and prevent us to switch easily. Besides most of the time it stays classic server-side templating engine oriented associated to good old jQuery plugins, with no usage of a powerful UI framework as Vue.js. I think notably on [Backpack](https://backpackforlaravel.com/) for Laravel and [EasyAdmin](https://github.com/EasyCorp/EasyAdminBundle) for Symfony world.

As for [Laravel Nova](https://nova.laravel.com/), although it is a very productive Vue SPA admin, with high community, it isn't free, "closed" source, still Laravel-coupled and comes with his own caveats. You tend to follow the "Nova" way with unnatural mix of coupled PHP and Vue development.

[React Admin](https://github.com/marmelab/react-admin/) (RA) is by far the coolest and most customizable admin panel on the market. Besides it's totally free and totally independent of any backend. Although it isn't probably the more productive way to build basic admin app from top to bottom with backend included, this is in my opinion the funniest way to build admin apps, just as LEGO&copy; !

But I'm a Vue.js fan and I didn't find a close equivalent based on it. So why not to try a make one, mainly for "fun" and hard training ? I decided to take Vuetify as main UI library not only for material design aspect. The default layout is also well suited for admin app, full of input components, and comes with data iterator which allows full list customization.

### But I prefer Bootstrap

So this project isn't for you. All VA UI components are tightly coupled with Vuetify, and I have really no intention to decoupled them as React Admin does with separated controllers, it's simply too much work for 1 person.

Check [CoreUI](https://coreui.io/) project or try this [bootstrap UI layer](https://bootstrap-styled.github.io/react-admin/) for React Admin.

### Case of API backend

A [separate helper package](https://github.com/okami101/vtec-laravel-crud) is available for Laravel in order to have the quickest starting development experience as possible, combined to generators for high productivity, while highly respecting the pure traditional Laravel way to make CRUD resources. I included YAML based code generators, similar as [Blueprint](https://github.com/laravel-shift/blueprint), with far less features to confess.

## Documentation

Documentation for Vtec Admin can be found on the [Vtec website](https://vtec.okami101.io).

## License

This project is open-sourced software licensed under the [MIT license](https://adr1enbe4udou1n.mit-license.org).
