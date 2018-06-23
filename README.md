[npm-image]: https://img.shields.io/npm/v/ionic-select-searchable.svg
[npm-url]: https://npmjs.org/package/ionic-select-searchable
[dm-image]: https://img.shields.io/npm/dm/ionic-select-searchable.svg
[dt-image]: https://img.shields.io/npm/dt/ionic-select-searchable.svg

# Ionic Select with Searchbar
[![npm][npm-image]][npm-url]
[![npm][dt-image]][npm-url]
[![npm][dm-image]][npm-url]

An Ionic component similar to `ion-select`, that allows to search items, including async search and infinite scrolling.  

![iOS Demo](demo/ios.gif)

# Contents
* [Demo (Live)](https://stackblitz.com/edit/ionic-select-searchable-basic?file=pages%2Fhome%2Fhome.html)
* [Demo (GitHub)](https://github.com/eakoriakin/ionic-select-searchable-demo)
* [Getting started](#getting-started)
* [FAQ](#faq)
* [Documentation](../../wiki/Documentation)

## Getting started

1. Install it.

```
npm install ionic-select-searchable --save
```

2. Import it.
```
import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
    imports: [
        SelectSearchableModule
    ]
})
export class AppModule { }

```
3. Add it to template.
```
<ion-item>
    <ion-label>Port</ion-label>
    <select-searchable
        item-content
        [(ngModel)]="port"
        [items]="ports"
        itemValueField="id"
        itemTextField="name"
        [canSearch]="true"
        (onChange)="portChange($event)">
    </select-searchable>
</ion-item>
```
4. Configure it.
```
import { SelectSearchableComponent } from 'ionic-select-searchable';

class Port {
    public id: number;
    public name: string;
}

@Component({ ... })
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
Loading time and responsiveness of the component might get rather slow, when dealing with a lot of items, e.g. a 1000 or more.
There are two ways to tackle it.

**Async search**
 
In this case no items are loaded and displayed initially. Items will be added while user is typing to search.  
See [demo](https://stackblitz.com/edit/ionic-select-searchable-on-search).
 
**Infinite scroll**

This approach relies on Ionic [InfiniteScroll](https://ionicframework.com/docs/api/components/infinite-scroll/InfiniteScroll/).  
Initially only the first bunch of items is loaded and displayed, for example we can show only the first 20 items.  
Then more items is loaded bunch by bunch while user is scrolling down.  
See [demo](https://stackblitz.com/edit/ionic-select-searchable-infinite-scroll).
 
**Virtual scroll**

This approach relies on Ionic [VirtualScroll](https://ionicframework.com/docs/api/components/virtual-scroll/VirtualScroll/).  
See [demo](https://stackblitz.com/edit/ionic-select-searchable-virtual-scroll).

## Support this project
If you find this component useful, please star the repo to let others know that it's reliable. Also, share it with friends and colleagues who might find it useful as well. Thank you 😄
