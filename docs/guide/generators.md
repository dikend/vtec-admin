# Generators

Vtec Admin offers powerful generators commands that can considerably accelerate admin development. That is particularly useful as VA uses a highly customizable Vue templating development approach rather than configuration oriented development (i.e. develop UI on a full JSON or YAML file as [EasyAdmin](https://github.com/EasyCorp/EasyAdminBundle) do) which tends to be harder to extend.

Thanks to all resource-aware VA components, the DSL approach helps to reduce many boilerplate code but it's still not as efficient than writing you UI on YAML file. That's here the generators comes in. You write Admin UI on YAML format, by following a [JSON schema validator](https://vtec.okami101.io/schemas/generator.json), and then you generate all API code and Vue templates from it. So it embraces the **initial high productivity** of YAML development and **maintaining full template customization** at hand, while encouraging **reusability** for quick starting next projects.

::: danger FIRST STEP ONLY
Consequently, this YAML file will mainly be used for your first resource code generation. After each each generation, all customizations made inside related resource templates will be lost.
:::

## API

See specific section of each supported API package :

* [Laravel](laravel.md#generators)

## Admin UI

::: warning Vue CLI Plugin
Next commands are only available if you install Vtec Admin by his Vue CLI plugin, so install it first by [following this guide](getting-started.md).
:::

Vue CLI plugin will provide to you a new npm command `yarn crud:make [options]`, which helps for initial resources CRUD pages generation :

* Generate all necessary basic crud views with additional form component inside dedicated resource folder under `src/resources/`. This views will be auto loaded as Vue components via Webpack. You can even generate all basic fields and inputs by passing full object into `fields` options.
* Register new resource to `src/resources/index.js` file.
* Add resource locales to `src/locales/{locale}.js` file. Locale will be `en` by default unless you pass `locale` as command option.
* Add new sidebar entry to `src/_nav.js` file.

::: tip HELP COMMAND
Use `yarn vue-cli-service help crud:make` for all options documentation.
:::

::: tip TUTORIAL
You can find a full tutorial which made use of this command [here](laravel.md#generate-crud-ui).
:::

## YAML

Vue CLI plugin provides an additional advanced `crud:yaml` command which is a superset of previous command and allows you to generate all initial admin interface code from a YAML file. You can see it as a developer-friendly admin panel code generator.

This is how it works :

![generators](/diagrams/generators.svg)

### JSON Schema

This file must to validate against a [particular JSON schema](/schemas/generator.json) in order to ensure compatibility.

Each YAML file can contain a list of resources identified by a slug name on `snake_case` format. Each resource can contain many properties that will help for code generation on both API and UI sides.

:::: tabs

::: tab RESOURCE
|> schema generator resource
:::

::: tab FIELD
You can even generate all fields as needed thanks to `fields` properties. Here is the expected structure :

|> schema generator field

The `type` must correspond to a valid UI field widget you will find [here](components/fields.md). At this time it can be `text`, `number`, `rating`, `date`, `boolean`, `rich-text`, `chip`, `select`, `email`, `url`, `file`, `image`, `reference`, `array`.

For primitive type on API side, use the `db` option.
:::

::: tab DB
For database API, each field can contain a specific `db` property which will precise DB related attributes :

|> schema generator db
:::

::: tab ATTRIBUTES
The `attributes` property define all valid attributes for UI field widget :

|> schema generator field.properties.attributes
:::

::: tab FORM
The `form` property allows you advanced control on UI input widget :

|> schema generator field.properties.form
:::

::: tab FILTER
Same for advanced `filter` property :

|> schema generator field.properties.filter
:::

::::

::: tip YAML DEVELOPMENT
For better YAML development experience you should use this [VSCode extension](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml). Next set `https://vtec.okami101.io/schemas/generator.json` value on your workspace settings for each generator YAML file inside `yaml.schemas` settings. Now you have automatic validation, as well as autocompletion with above documentation !
:::

::: tip TUTORIAL
You can find a full tutorial which made use of this command [here](laravel.md#yaml).
:::
