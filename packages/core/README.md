[npm-url]: https://npmjs.org/package/@ionic-selectable/core
[npm-image]: https://img.shields.io/npm/v/@ionic-selectable/core.svg
[dm-image]: https://img.shields.io/npm/dm/@ionic-selectable/core.svg
[dt-image]: https://img.shields.io/npm/dt/@ionic-selectable/core.svg

# Ionic Selectable

[![npm][npm-image]][npm-url]
[![npm][dt-image]][npm-url]
[![npm][dm-image]][npm-url]

[Demo](https://stackblitz.com/edit/ionic-selectable-basic?file=pages/home/home.html) | [Features](#features) | [Getting started](#getting-started) | [FAQ](../../wiki#faq) | [Docs](../../wiki)

An Ionic component similar to [Ionic Select](https://ionicframework.com/docs/api/components/select/Select/), that allows to search items, including async search, infinite scrolling and more.

![iOS Demo](images/demo.gif)

# Contents

- [Demo](https://stackblitz.com/edit/ionic-selectable-basic?file=pages/home/home.html)
- [Features](#features)
- [Getting started](#getting-started)
- [Supported Ionic versions](#supported-ionic-versions)
- [FAQ](../../wiki#faq)
- [Docs](../../wiki)
- [Theming](../../wiki#theming)

## Supported Ionic versions

- Ionic 5 (>=5.0.0) alpha

## Supported previus Ionic versions

- Ionic 3 (3.6.0 - 3.9.2) [ionic-selectable](https://www.npmjs.com/package/ionic-selectable)
- Ionic 4 (>=4.0.0) [ionic-selectable](https://www.npmjs.com/package/ionic-selectable)

## Features

- [Single selection](https://stackblitz.com/edit/ionic-selectable-basic?file=pages/home/home.html)
- [Multiple selection](../../wiki#ismultiple)
- [Search items](https://stackblitz.com/edit/ionic-selectable-basic?file=pages/home/home.html)
- [Search items asynchronously](https://stackblitz.com/edit/ionic-selectable-on-search?file=pages/home/home.html)
- [Search by several item fields](https://stackblitz.com/edit/ionic-selectable-on-search?file=pages/home/home.html)
- [Forms](https://stackblitz.com/edit/ionic-selectable-form-control?file=pages/home/home.html)
- [InfiniteScroll](https://stackblitz.com/edit/ionic-selectable-infinite-scroll?file=pages/home/home.html)
- [VirtualScroll](https://stackblitz.com/edit/ionic-selectable-virtual-scroll?file=pages/home/home.html)
- [Templates](../../wiki#templates)
- [Grouping items](../..//wiki#grouping)
- [Editing, adding and deleting items](../../wiki#editing)
- [Disabling items](../../wiki#disableditems)

## Getting started

1. Add add the following inside the `<head>`.

```html
<!-- Ionic -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js"></script>
<script nomodule src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css" />
<!-- Ionic Selectable -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@ionic-selectable/core/dist/ionic-selectable/ionic-selectable.esm.js"></script>
<script nomodule src="https://cdn.jsdelivr.net/npm/@ionic-selectable/core/dist/ionic-selectable/ionic-selectable.js"></script>
```

2. Add it to template.

```html
<ion-item>
  <ion-label>Ports</ion-label>
  <ionic-selectable
    id="port"
    should-store-item-value="false"
    is-multiple="false"
    item-value-field="id"
    item-text-field="name"
    placeholder="Select One"
    group-text-field="country.name"
  ></ionic-selectable>
</ion-item>
```

4. Configure it.

```js
var portElement = document.getElementById("port");
portElement.items = [
  { id: 1, name: "Salina Cruz", country: { name: "Mexico" } },
  { id: 3, name: "Veracruz", country: { name: "Mexico" } },
  { id: 2, name: "Alicante", country: { name: "Spain" } },
  { id: 4, name: "Santa Eugenia De Riveira", country: { name: "Spain" } },
  { id: 5, name: "Mantes", country: { name: "France" } },
];
portElement.value = { id: 1, name: 'Salina Cruz', country: { name: "Mexico"} };
portElement.hasConfirmButton = true;
portElement.addEventListener("changed", (event) => {
  console.log(event);
});
portElement.addEventListener("closed", (event) => {
  console.log(event);
});
```

3. Enjoy it 😉
4. Check out [live demos](https://stackblitz.com/@eakoriakin) to see what it is capable of.  
   Also, explore the [docs](../../wiki) and [FAQ](../../wiki#faq) to learn more about its features.

## Development

For contribution and delevopment please refer to [Contribution](../../wiki/Contribution).

## Share it

If you find this component useful, please star the [repo](https://github.com/eakoriakin/ionic-selectable) to let others know that it's reliable. Also, share it with friends and colleagues who might find it useful as well. Thank you 😄
