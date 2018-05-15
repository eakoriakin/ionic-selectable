[npm-image]: https://img.shields.io/npm/v/ionic-select-searchable.svg
[npm-url]: https://npmjs.org/package/ionic-select-searchable
[dm-image]: https://img.shields.io/npm/dm/ionic-select-searchable.svg
[dt-image]: https://img.shields.io/npm/dt/ionic-select-searchable.svg

# Ionic Select with Searchbar
[![npm][npm-image]][npm-url]
[![npm][dt-image]][npm-url]
[![npm][dm-image]][npm-url]

An Ionic component similar to `ion-select`, that allows to search items, including async search and infinite scrolling.

# Contents
* [Demo](#demo)
* [Download](#download)
* [Getting started](#getting-started)
* [FAQ](#faq)
* [API documentation](../../wiki/API-Documentation)
* [Development](#development)

## Demo
* [GitHub demo app](https://github.com/eakoriakin/ionic-select-searchable-demo)
* [Plunker](http://plnkr.co/edit/YzCBKS?p=preview)

### iOS
![iOS Demo 1](demo/ios-1.png)
![iOS Demo 2](demo/ios-2.png)

### Android
![Android Demo 1](demo/android-1.png)
![Android Demo 2](demo/android-2.png)

## Download
Download it using npm:

`npm install ionic-select-searchable --save`

## Getting started

1. Import `SelectSearchable` to your main app module.
```
import { NgModule } from '@angular/core';
import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
    ...
    imports: [
        ...
        SelectSearchableModule
    ],
    ...
})
export class AppModule { }

```
2. Add `SelectSearchable` to your component template.
```
<ion-item>
    <select-searchable
        [(ngModel)]="port"
        [items]="ports"
        itemValueField="id"
        itemTextField="name"
        [canSearch]="true"
        (onChange)="portChange($event)">
        <ng-template selectSearchableLabelTemplate>
            Port
        </ng-template>
    </select-searchable>
</ion-item>
```
3. Prepare your component file.
```
import { Component } from '@angular/core';
import { SelectSearchableComponent } from 'ionic-select-searchable';

class Port {
    public id: number;
    public name: string;
}

@Component({
    ...
})
export class HomePage {
    ports: Port[];
    port: Port;

    constructor() {
        this.ports = [
            { id: 1, name: 'Tokai' },
            { id: 2, name: 'Vladivostok' },
            { id: 3, name: 'Navlakhi' }
        ];
    }

    portChange(event: { component: SelectSearchableComponent, value: any }) {
        console.log('port:', event.value);
    }
}
```

## FAQ

### 1. Why do I get error `Can't bind to 'items' since it isn't a known property of 'select-searchable'`?

The error occurs when `SelectSearchableModule` isn't imported to your app module. In case of using lazy loading you need to import `SelectSearchableModule` to every page module.

```
import { LazyPage } from './lazy';
import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
	declarations: [
		LazyPage
	],
	imports: [
		IonicPageModule.forChild(LazyPage),
		SelectSearchableModule
	]
})
export class LazyPageModule { }
```

### 2. What's the best way to handle a large amount of items? 
Loading and responsiveness might get rather slow, when dealing with many items, e.g. a 1000 or more.
There are two ways to tackle it.

**Async search**
 
In this case no items are loaded and displayed initially. Items will be added while user is typing to search.  
See **Search (Async)** passage in [demo](http://plnkr.co/edit/YzCBKS?p=preview).
 
**Infinite scroll**
 
Initially only the first bunch of items is loaded and displayed, for example we can show only the first 20 items.  
Then more items is loaded bunch by bunch while user is scrolling down.  
See **Infinite scroll** passage in [demo](http://plnkr.co/edit/YzCBKS?p=preview).

## Support this project
If you find this project useful, please star the repo to let people know that it's reliable. Also, share it with friends and colleagues that might find this useful as well. Thank you 😄
