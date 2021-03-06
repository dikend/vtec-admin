# Form

The create and edit pages will allow creation of new resource item or modification of existing method, by using respectively `create` and `update` data provider methods. In general this pages will share same form although it is not required. With Vtec Admin, development of form can be done with minimal code thanks to many available input components that have knowledge of current form context.

![form](/assets/form.png)

## Layouts

Both create and edit layouts share similar layout as [show page](show.md) with specific contextualized actions. There is nothing more to say about them as the `VaForm` will do the real work.

### Create layout

|> docgen create-layout

::: tip CLONE
Note that the create page support copy of values from other existing resource, i.e. cloning, as soon as a specific `source` query string with a valid existing id is present. This is automatically done via `VaCloneButton` present by default on `VaDataTable`. This is why a `item` prop is available on `Create` vue component that allows you to inject it into `VaForm`.

```vue {3,11}
<template>
  <va-create-layout>
    <va-form :item="item">
      <!-- VA inputs component -->
    </va-form>
  </va-create-layout>
</template>

<script>
export default {
  props: ["item"],
};
</script>
```

:::

### Edit layout

|> docgen edit-layout

::: tip USE ID
Compared to to create page, you gain a new `id` prop that correspond to the resource to edit and patch on the API side. Don't forget to put it on form via the same prop in order to use `update` data provider method under the hood.

```vue {3,11}
<template>
  <va-edit-layout>
    <va-form :id="id" :item="item">
      <!-- VA inputs component -->
    </va-form>
  </va-edit-layout>
</template>

<script>
export default {
  props: ["id", "item"],
};
</script>
```

:::

### Tabbed layout

As the same way for the show view, you have total freedom for page templating. Example with a tabbed style form :

![tabs-form](/assets/tabs-form.png)

Here a code sample :

```vue
<template>
  <va-edit-layout>
    <va-form :id="id" :item="item">
      <v-row justify="center">
        <v-col lg="8">
          <base-material-tabs-card
            :tabs="[
              { id: 'attributes', icon: 'mdi-eye' },
              { id: 'summary', icon: 'mdi-text' },
            ]"
          >
            <template v-slot:attributes>
              <!-- 1st tab content -->
            </template>
            <template v-slot:summary>
              <!-- 2st tab content -->
            </template>
          </base-material-tabs-card>
        </v-col>
      </v-row>
    </va-form>
  </va-edit-layout>
</template>

<script>
export default {
  props: ["title", "id", "item"],
};
</script>
```

## Injector

|> docgen form

Here a quick sample usage within the `VaForm` inside a `VaEditLayout` component :

```vue
<template>
  <va-form :id="id" :item="item">
    <v-row justify="center">
      <v-col lg="6">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2">
              {{ title }}
            </div>
          </template>
          <v-card-text>
            <va-autocomplete-input
              source="book"
              reference="books"
              model="book_id"
            ></va-autocomplete-input>
            <va-radio-group-input source="status" row></va-radio-group-input>
            <va-rating-input source="rating"></va-rating-input>
            <va-text-input source="body" multiline></va-text-input>
            <va-text-input source="author"></va-text-input>
            <va-date-input source="publication_date"></va-date-input>
          </v-card-text>
          <va-save-button></va-save-button>
        </base-material-card>
      </v-col>
    </v-row>
  </va-form>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
```

This form page will use special VA input components that are aware of current route context and are able to catch and edit the value of resource property indicated on the `source` prop.

Note that the main internal form model will be auto generated from all inputs that will be present on this form. If you inject an existing item into `VaForm`, the main form model will takes his actual values that will be reflected for each input.

::: tip ALL INPUT COMPONENTS
Go to separated [inputs guide reference](../components/inputs.md) to get all supported components for edit data.
You can still create your [own input component](../components/inputs.md#custom-input-component) if none suit your needs.
:::

### Saving and redirect

Use the `VaSaveButton` as default submit button. It will automatically synchronize with parent form in order to active the spinner while saving to the API.

```vue {2,4}
<template>
  <va-form :id="id" :item="item" redirect="show">
    <!-- VA inputs component -->
    <va-save-button></va-save-button>
  </va-form>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
```

By default a successful saving will redirect to resource list page unless you set explicit `redirect` on `VaForm` prop as above. Note as this prop have only effect for a submit button. Moreover, you can set `redirect` on `VaSaveButton`. It will disable the default submit behavior and the user must click or key press on it for saving. Particularly useful when you need multiple redirect actions as shown next :

```vue {4-9}
<template>
  <va-form :id="id" :item="item">
    <!-- VA inputs component -->
    <va-save-button></va-save-button>
    <va-save-button
      text
      redirect="create"
      color="secondary"
    ></va-save-button>
  </va-form>
</template>

<script>
export default {
  props: ["id", "title", "item"],
};
</script>
```

It will render 2 different buttons, the default one that will submit on enter and redirect to list, and an additional save and add button :

![saving](/assets/saving.png)

::: tip NO DEFAULT REDIRECT
Use `disable-redirect` prop on `VaForm` in order to prevent default submit redirect. No effect on save buttons with redirect.
:::

### Form model

As you can see on above code sample, there is no need of any v-model in order to make it work. Indeed, all child inputs will receive the parent form state via [provide/inject](https://vuejs.org/v2/api/#provide-inject) Vue feature, which reduces considerably code form boilerplate. All inputs will update the internal parent model accordingly on first input initialization and on every input change.

But what if we need access to internal form model for specific case, as show/hide some fields based on current model state ? For that you just have to expose the internal form model via `v-model`.

Here is a full example with show/hide some fields based on `active` property model :

```vue {2,5,22-24}
<template>
  <va-form :id="id" :item="item" v-model="model">
    <va-text-input source="description" multiline></va-text-input>
    <va-boolean-input source="active"></va-boolean-input>
    <v-row v-if="model.active">
      <v-col sm="6">
        <va-text-input source="url"></va-text-input>
      </v-col>
      <v-col sm="6">
        <va-text-input source="email"></va-text-input>
      </v-col>
    </v-row>
    <va-save-button></va-save-button>
  </va-form>
</template>

<script>
export default {
  props: ["id", "title", "item"],
  data() {
    return {
      model: {
        active: true,
      },
    };
  },
};
</script>
```

::: tip DEFAULT VALUE
Note that you're not forced to put all properties inside exposed model. If not present, they will still auto created by all present VA inputs component.

If you explicitly set a property, the related input will take this value as default in case of no item is injected into `VaForm`. Ideal for pre filling a create item.

If you don't need a `v-model`, simply set the `value` prop to any compatible value. This value will be take as default on create form.
:::

You can even use the v-model on VA input instead of full form :

```vue {4,5,22}
<template>
  <va-form :id="id" :item="item">
    <va-text-input source="description" multiline></va-text-input>
    <va-boolean-input source="active" v-model="active"></va-boolean-input>
    <v-row v-if="active">
      <v-col sm="6">
        <va-text-input source="url"></va-text-input>
      </v-col>
      <v-col sm="6">
        <va-text-input source="email"></va-text-input>
      </v-col>
    </v-row>
    <va-save-button></va-save-button>
  </va-form>
</template>

<script>
export default {
  props: ["id", "title", "item"],
  data() {
    return {
      active: true,
    };
  },
};
</script>
```

### Client-side validation

`VaForm` use a vuetify `v-form` under the hood. Check the [official docs](https://vuetifyjs.com/en/components/forms/#creating-rules) for further detail. Use the `rules` property for each VA inputs for setting custom rules. For required, you can use the `required` shorthand prop.

### Server-side validation

::: tip ERRORS HANDLING
See [separated section](../data-providers.md#errors-handling) before continue.
:::

Server-side validation is supported as soon as your API provides all constraint violations inside response body, which usually wears a `422` status code. `VaForm` will search for a `errors` property on the error object returned by your data provider and will dispatch them to all input fields.

This `errors` property is a key-value object where each property have the list of associated errors. The name of each property must correspond to the `source` defined on each input in order to push errors on it via his `errorMessages` prop.

Here an example of compatible object error :

```json
{
    "message": "The given data was invalid.",
    "status": 422,
    "errors": {
        "book_id": ["The book id field is required."],
        "status": ["The status field is required."],
        "author": ["The author field is required."],
        "publication_date": ["The publication date field is required."]
    }
}
```

It will render as next :

![form-validation](/assets/form-validation.png)
