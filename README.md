[npm-url]: https://npmjs.org/package/ionic-selectable
[npm-image]: https://img.shields.io/npm/v/ionic-select-searchable.svg
[dm-image]: https://img.shields.io/npm/dm/ionic-select-searchable.svg
[dt-image]: https://img.shields.io/npm/dt/ionic-select-searchable.svg

# Ionic Selectable
[![npm][npm-image]][npm-url]
[![npm][dt-image]][npm-url]
[![npm][dm-image]][npm-url]

An Ionic component similar to [Ionic Select](https://ionicframework.com/docs/api/components/select/Select/), that allows to search items, including async search, infinite scrolling and more.

![iOS Demo](images/demo.gif)

# Contents
* [Demo](https://stackblitz.com/edit/ionic-selectable-basic?file=pages/home/home.html)
* [Getting started](#getting-started)
* [FAQ](../../wiki/FAQ)
* [Documentation](../../wiki/Documentation)
* [Theming](../../wiki/Theming)
* [Version comparison](#version-comparison)

## Getting started

1. Decide on the version you want to use [Free](https://www.npmjs.com/package/ionic-selectable) or [Pro](https://market.ionicframework.com/plugins/ionic-selectable-pro). See [Version comparison](#version-comparison) to help you choose.

2. Install it.  

`Ionic Selectable Free`  
```
npm install ionic-selectable --save
```

`Ionic Selectable Pro`  

Purchase it from [Ionic Market](https://market.ionicframework.com/plugins/ionic-selectable-pro).  
Copy `ionic-selectable-<version>.tgz` archive to the root of your project. Then `cd` to the project root and install the package.

```
npm install ionic-selectable-<version>.tgz
```

3. Import it.
```
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
    imports: [
        IonicSelectableModule
    ]
})
export class AppModule { }

```

4. Add it to template.
```
<ion-item>
    <ion-label>Port</ion-label>
    <ionic-selectable
        item-content
        [(ngModel)]="port"
        [items]="ports"
        itemValueField="id"
        itemTextField="name"
        [canSearch]="true"
        (onChange)="portChange($event)">
    </ionic-selectable>
</ion-item>
```

5. Configure it.
```
import { IonicSelectableComponent } from 'ionic-selectable';

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

    portChange(event: {
        component: IonicSelectableComponent,
        value: any 
    }) {
        console.log('port:', event.value);
    }
}
```

6. Enjoy it 😉
7. Check out live demos for [Ionic Selectable Free](https://stackblitz.com/@eakoriakin) and [Ionic Selectable Pro](https://ionic-selectable.herokuapp.com) to see what it is capable of.  
Also, explore the [docs](../../wiki/Documentation) and [FAQ](../../wiki/FAQ) to learn more about its features.

## Version comparison

| Ionic Selectable Free  | Ionic Selectable Pro |
| - | - |
| [Single item selection](https://stackblitz.com/edit/ionic-selectable-basic?file=pages/home/home.html) | [Single item selection](https://stackblitz.com/edit/ionic-selectable-basic?file=pages/home/home.html) |
| [Multiple item selection](../../wiki/Documentation#ismultiple) | [Multiple item selection](../../wiki/Documentation#ismultiple) |
| [Search items](https://stackblitz.com/edit/ionic-selectable-basic?file=pages/home/home.html) | [Search items](https://stackblitz.com/edit/ionic-selectable-basic?file=pages/home/home.html) |
| [Search items asynchronously](https://stackblitz.com/edit/ionic-selectable-on-search?file=pages/home/home.html) | [Search items asynchronously](https://stackblitz.com/edit/ionic-selectable-on-search?file=pages/home/home.html) |
| [Angular Forms integration](https://stackblitz.com/edit/ionic-selectable-form-control?file=pages/home/home.html) | [Angular Forms integration](https://stackblitz.com/edit/ionic-selectable-form-control?file=pages/home/home.html) |
| [Validation](../../wiki/Documentation#validation) | [Validation](../../wiki/Documentation#validation) |
| [Ionic InfiniteScroll](https://stackblitz.com/edit/ionic-selectable-infinite-scroll?file=pages/home/home.html) | [Ionic InfiniteScroll](https://stackblitz.com/edit/ionic-selectable-infinite-scroll?file=pages/home/home.html) |
| [Ionic VirtualScroll](https://stackblitz.com/edit/ionic-selectable-virtual-scroll?file=pages/home/home.html) | [Ionic VirtualScroll](https://stackblitz.com/edit/ionic-selectable-virtual-scroll?file=pages/home/home.html) |
|  | [Templates](../../wiki/Documentation#templates) |
|  | [Grouping items](../..//wiki/Documentation#grouping) |
|  | [Editing, adding and deleting items](../../wiki/Documentation#editing) |
|  | [Disabling items](../../wiki/Documentation#disableditems) |

## Share it
If you find this component useful, please star the [repo](https://github.com/eakoriakin/ionic-selectable) to let others know that it's reliable. Also, share it with friends and colleagues who might find it useful as well. Thank you 😄
