* [FAQ](#faq)
  * [Why do I get error `Can't bind to 'items' since it isn't a known property of 'ionic-selectable'`?](#why-do-i-get-error-cant-bind-to-items-since-it-isnt-a-known-property-of-ionic-selectable)
  * [What is the best way to handle a large amount of items?](#what-is-the-best-way-to-handle-a-large-amount-of-items)
  * [Why the component does not appear and only label is visible?](#why-the-component-does-not-appear-and-only-label-is-visible)
* Use cases
  * [Basic](https://stackblitz.com/edit/ionic-selectable-basic?file=pages/home/home.html)
  * [Cascading](https://stackblitz.com/edit/ionic-selectable-cascading?file=pages/home/home.html)
  * [Disabling items](#disableditems)
  * [Inside Modal](https://stackblitz.com/edit/ionic-selectable-inside-modal?file=pages/home/home.html)
  * [Initial value](https://stackblitz.com/edit/ionic-selectable-initial-value?file=pages/home/home.html)
  * [InfiniteScroll](https://stackblitz.com/edit/ionic-selectable-infinite-scroll?file=pages/home/home.html)
  * [Ionic Labels](https://stackblitz.com/edit/ionic-selectable-labels?file=pages/home/home.html)
  * [Primitive types](https://stackblitz.com/edit/ionic-selectable-primitive-types?file=pages/home/home.html)
  * [Search items asynchronously](https://stackblitz.com/edit/ionic-selectable-on-search?file=pages/home/home.html)
  * [Search by several item fields](https://stackblitz.com/edit/ionic-selectable-on-search?file=pages/home/home.html)
  * [VirtualScroll](https://stackblitz.com/edit/ionic-selectable-virtual-scroll?file=pages/home/home.html)
* [Grouping](#grouping)
  * [Grouping items](#grouping-items)
  * [Grouping items with VirtualScroll](#grouping-items-with-virtualscroll)
* [Editing](#editing)
  * [Adding, editing and deleting items](#adding-editing-and-deleting-items)
  * [Adding, editing and deleting items asynchronously](#adding-editing-and-deleting-items-asynchronously)
  * [Adding item when search fails](#adding-item-when-search-fails)
  * [Adding item asynchronously when search fails](#adding-item-asynchronously-when-search-fails)
* [Templates](#templates)
  * [Add item template](#add-item-template)
  * [Close button template](#close-button-template)
  * [Group template](#group-template)
  * [Group right template](#group-right-template)
  * [Item template](#item-template)
  * [Item right template](#item-right-template)
  * [Message template](#message-template)
  * [Multiple values template](#multiple-values-template)
  * [Multiple values with ellipsis template](#multiple-values-with-ellipsis-template)
  * [Placeholder template](#placeholder-template)
  * [Search fail template](#search-fail-template)
  * [Title template](#title-template)
  * [Value template](#value-template)
* [Forms](#forms)
  * [FormArray](https://stackblitz.com/edit/ionic-selectable-form-array?file=app/pages/home/home.ts)
  * [FormControl](#formcontrol)
  * [Min/max selection](#minmax-selection)
* [Fields](#fields)
  * [addButtonText](#addbuttontext)
  * [canAddItem](#canadditem)
  * [canClear](#canclear)
  * [canDeleteItem](#candeleteitem)
  * [canSaveItem](#cansaveitem)
  * [canSearch](#cansearch)
  * [clearButtonText](#clearbuttontext)
  * [closeButtonText](#closebuttontext)
  * [disabledItems](#disableditems)
  * [shouldFocusSearchbar](#shouldfocussearchbar)
  * [groupColor](#groupcolor)
  * [groupValueField](#groupvaluefield)
  * [groupTextField](#grouptextfield)
  * [hasInfiniteScroll](#hasinfinitescroll)
  * [hasConfirmButton](#hasconfirmbutton)
  * [hasSearchText](#hassearchtext)
  * [hasVirtualScroll](#hasvirtualscroll)
  * [headerColor](#headercolor)
  * [items](#items)
  * [itemsToConfirm](#itemstoconfirm)
  * [isBackdropCloseEnabled](#isbackdropcloseenabled)
  * [isEnabled](#isenabled)
  * [isMultiple](#ismultiple)
  * [isConfirmButtonEnabled](#isconfirmbuttonenabled)
  * [isOnSearchEnabled](#isonsearchenabled)
  * [isOpened](#isopened)
  * [isSearching](#issearching)
  * [itemValueField](#itemvaluefield)
  * [itemTextField](#itemtextfield)
  * [confirmButtonText](#confirmbuttontext)
  * [placeholder](#placeholder)
  * [searchDebounce](#searchdebounce)
  * [searchFailText](#searchfailtext)
  * [searchPlaceholder](#searchplaceholder)
  * [searchText](#searchtext)
  * [shouldStoreItemValue](#shouldstoreitemvalue)
  * [virtualScrollApproxItemHeight](#virtualscrollapproxitemheight)
  * [virtualScrollHeaderFn](#virtualscrollheaderfn)
* [Methods](#methods)
  * [addItem()](#additem)
  * [clear()](#clear)
  * [close()](#close)
  * [deleteItem()](#deleteitem)
  * [disableInfiniteScroll()](#disableinfinitescroll)
  * [enableInfiniteScroll()](#enableinfinitescroll)
  * [endInfiniteScroll()](#endinfinitescroll)
  * [endSearch()](#endsearch)
  * [hasValue()](#hasvalue)
  * [hideAddItemTemplate()](#hideadditemtemplate)
  * [hideLoading()](#hideloading)
  * [open()](#open)
  * [search()](#search)
  * [scrollToBottom()](#scrolltobottom)
  * [scrollToTop()](#scrolltotop)
  * [showAddItemTemplate()](#showadditemtemplate)
  * [showLoading()](#showloading)
  * [startSearch()](#startsearch)
* [Events](#events)
  * [onAddItem](#onadditem)
  * [onDeleteItem](#ondeleteitem)
  * [onChange](#onchange)
  * [onClear](#onclear)
  * [onClose](#onclose)
  * [onInfiniteScroll](#oninfinitescroll)
  * [onOpen](#onopen)
  * [onSaveItem](#onsaveitem)
  * [onSearch](#onsearch)
  * [onSearchFail](#onsearchfail)
  * [onSearchSuccess](#onsearchsuccess)
  * [onSelect](#onselect)
* [Theming](#theming)
* [Errors](#errors)
  * [IonicSelectable is disabled or already closed](#ionicselectable-is-disabled-or-already-closed)
  * [IonicSelectable is disabled or already opened](#ionicselectable-is-disabled-or-already-opened)
  * [IonicSelectable content cannot be scrolled](#ionicselectable-content-cannot-be-scrolled)

# FAQ

## Why do I get error `Can't bind to 'items' since it isn't a known property of 'ionic-selectable'`?

The error occurs when `IonicSelectableModule` isn't imported to your app or page module.

First, check that `IonicSelectableModule` is imported to your `app.module.ts` that is normally located in `src\app\app.module.ts`.

```
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    IonicSelectableModule
  ]
})
export class AppModule { }
```

Then if you use Ionic 3+ you might be as well using lazy loaded pages. Check if your pages have a module file, for example, `home.module.ts`, and if they do then import `IonicSelectableModule` to each page module too.

```
import { IonicSelectableModule } from 'ionic-selectable';
import { HomePage } from './home';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    IonicSelectableModule
  ]
})
export class HomePageModule { }
```

## What is the best way to handle a large amount of items?
Loading time and responsiveness of the component might get rather slow, when dealing with a lot of items, e.g. a 1000 or more.
There are two ways to tackle it.

**Async search**
 
In this case no items are loaded and displayed initially. Items will be added while user is typing to search.  
See [demo](https://stackblitz.com/edit/ionic-selectable-on-search).
 
**Infinite scroll**

This approach relies on Ionic [InfiniteScroll](https://ionicframework.com/docs/api/components/infinite-scroll/InfiniteScroll/).  
Initially only the first bunch of items is loaded and displayed, for example we can show only the first 20 items.  
Then more items is loaded bunch by bunch while user is scrolling down.  
See [demo](https://stackblitz.com/edit/ionic-selectable-infinite-scroll).
 
**Virtual scroll**

This approach relies on Ionic [VirtualScroll](https://ionicframework.com/docs/api/components/virtual-scroll/VirtualScroll/).  
See [demo](https://stackblitz.com/edit/ionic-selectable-virtual-scroll).

## Why the component does not appear and only label is visible?
Versions from [2.7.0](../releases/tag/2.7.0) to `3.*.*` require Ionic `item-content` attribute.
Version `4.*.*` doesn't need it.
```
<ionic-selectable item-content>
</ionic-selectable>
```

# Grouping

## Grouping items
### Demo
  * [Grouping items](https://ionic-selectable.herokuapp.com/#/grouping)

### Example

View:

    <ion-item>
      <ion-label>Port</ion-label>
      <ionic-selectable
        item-content // Required for Ionic 3 only.
        [(ngModel)]="port"
        itemValueField="id"
        itemTextField="name"
        groupValueField="country.id"
        groupTextField="country.name"
        [items]="ports"
        [canSearch]="true">
        <ng-template ionicSelectableGroupTemplate let-group="group">
          {{group.text}}
        </ng-template>
      </ionic-selectable>
    </ion-item>

TypeScript:

    ports: Port[];
    port: Port;

    constructor(
      private portService: PortService
    ) {
      this.ports = this.portService.getPorts();
    }

## Grouping items with VirtualScroll
### Demo
  * [Grouping items with VirtualScroll](https://ionic-selectable.herokuapp.com/#/grouping-virtual-scroll)

### Example

View:

    <ion-item>
      <ion-label>Port</ion-label>
      <ionic-selectable
        item-content // Required for Ionic 3 only.
        [(ngModel)]="port"
        itemValueField="id"
        itemTextField="name"
        [items]="ports"
        [hasVirtualScroll]="true"
        [virtualScrollHeaderFn]="getGroupText"
        [canSearch]="true">
      </ionic-selectable>
    </ion-item>

TypeScript:

    ports: Port[];
    port: Port;

    constructor(
      private portService: PortService
    ) {
      this.ports = this.portService.getPorts();
    }

    getGroupText(port: Port, portIndex: number, ports: Port[]) {
      if (portIndex === 0 || port.country.id !== ports[portIndex - 1].country.id) {
        return port.country.name;
      }

      return null;
    }

# Editing

## Adding, editing and deleting items
### Demo
  * [Adding, editing and deleting items](https://stackblitz.com/edit/ionic-selectable-editing?file=app/pages/home/home.html)

### Example

View:

    <ion-item>
      <ion-label>Port</ion-label>
      <!--
        Use two-way data binding syntax on [(items)] field for
        a port to be deleted from original array as well.
      -->
      <ionic-selectable
        #portComponent
        item-content // Required for Ionic 3 only.
        [(ngModel)]="port"
        itemValueField="id"
        itemTextField="name"
        [(items)]="ports"
        [canSearch]="true"
        [canClear]="true"
        [canAddItem]="true"
        [canSaveItem]="true"
        [canDeleteItem]="true"
        (onAddItem)="onAddPort($event)"
        (onSaveItem)="onSavePort($event)"
        (onDeleteItem)="onDeletePort($event)">
        <ng-template ionicSelectableItemTemplate let-port="item">
          {{port.name}} ({{port.country.name}})
        </ng-template>
        <ng-template ionicSelectableAddItemTemplate let-port="item"
          let-isAdd="isAdd">
          <form [formGroup]="portForm" novalidate>
            <ion-list>
              <ion-item-divider>
                {{isAdd ? 'Add' : 'Edit'}} Port
              </ion-item-divider>
              <ion-item>
                <ion-label>Name</ion-label>
                <ion-input
                  type="text"
                  formControlName="portName"
                  autocorrect="off"
                  autocapitalize="none">
                </ion-input>
              </ion-item>
              <ion-item>
                <ion-label>Country</ion-label>
                <ionic-selectable
                  item-content // Required for Ionic 3 only.
                  formControlName="portCountry"
                  itemValueField="id"
                  itemTextField="name"
                  [items]="countries">
                </ionic-selectable>
              </ion-item>
            </ion-list>
          </form>
          <ion-footer>
            <ion-toolbar>
              <ion-row>
                <ion-col col-6>
                  <button ion-button full no-margin
                    (click)="portComponent.hideAddItemTemplate()">
                    Cancel
                  </button>
                </ion-col>
                <ion-col col-6>
                  <button ion-button full no-margin
                    (click)="isAdd ? addPort() : savePort(port)"
                    [disabled]="!portForm.valid">
                    {{isAdd ? 'Add' : 'Save'}}
                  </button>
                </ion-col>
              </ion-row>
            </ion-toolbar>
          </ion-footer>
        </ng-template>
      </ionic-selectable>
    </ion-item>

TypeScript:

    ports: Port[];
    countries: Country[];
    port: Port;
    portForm: FormGroup;
    portNameControl: FormControl;
    portCountryControl: FormControl;
    @ViewChild('portComponent') portComponent: IonicSelectableComponent;

    constructor(
      private portService: PortService,
      private formBuilder: FormBuilder
    ) {
      this.ports = this.portService.getPorts();
      this.countries = this.portService.getCountries();

      // Create port form that will be used to add or save port.
      this.portNameControl = this.formBuilder.control(null, Validators.required);
      this.portCountryControl = this.formBuilder.control(null, Validators.required);
      this.portForm = this.formBuilder.group({
        portName: this.portNameControl,
        portCountry: this.portCountryControl
      });
    }

    onAddPort(event: {
      component: IonicSelectableComponent
    }) {
      // Clean form.
      this.portNameControl.reset();
      this.portCountryControl.reset();

      // Copy search text to port name field, so
      // user doesn't have to type again.
      this.portNameControl.setValue(event.component.searchText);

      // Show form.
      event.component.showAddItemTemplate();
    }

    onSavePort(event: {
      component: IonicSelectableComponent,
      item: Port
    }) {
      // Fill form.
      this.portNameControl.setValue(event.item.name);
      this.portCountryControl.setValue(event.item.country);

      // Show form.
      event.component.showAddItemTemplate();
    }

    onDeletePort(event: {
      component: IonicSelectableComponent,
      item: Port
    }) {
      // Delete port from storage.
      this.portService.deletePort(event.item);

      // Delete port from list.
      event.component.deleteItem(event.item);
    }

    addPort() {
      // Create port.
      let port = new Port({
        id: this.portService.getNewPortId(),
        name: this.portNameControl.value,
        country: this.portCountryControl.value
      });

      // Add port to storage.
      this.portService.addPort(port);

      // Add port to the top of list.
      this.portComponent.addItem(port).then(() => {
        this.portComponent.search(port.name);
      });

      // Clean form.
      this.portNameControl.reset();
      this.portCountryControl.reset();

      // Show list.
      this.portComponent.hideAddItemTemplate();
    }

    savePort(port: Port) {
      // Change port.
      port.name = this.portNameControl.value;
      port.country = this.portCountryControl.value;

      // Show list.
      this.portComponent.hideAddItemTemplate();
    }

## Adding, editing and deleting items asynchronously
### Demo
  * [Adding, editing and deleting items asynchronously](https://stackblitz.com/edit/ionic-selectable-editing-async?file=app/pages/home/home.html)

### Example

View:

    <ion-item>
      <ion-label>Port</ion-label>
      <!--
        Use two-way data binding syntax on [(items)] field for
        a port to be deleted from original array as well.
      -->
      <ionic-selectable
        #portComponent
        item-content // Required for Ionic 3 only.
        [(ngModel)]="port"
        itemValueField="id"
        itemTextField="name"
        [(items)]="ports"
        [canSearch]="true"
        [canClear]="true"
        [canAddItem]="true"
        [canSaveItem]="true"
        [canDeleteItem]="true"
        (onSearch)="searchPorts($event)"
        (onAddItem)="onAddPort($event)"
        (onSaveItem)="onSavePort($event)"
        (onDeleteItem)="onDeletePort($event)">
        <ng-template ionicSelectableItemTemplate let-port="item">
          {{port.name}} ({{port.country.name}})
        </ng-template>
        <ng-template ionicSelectableAddItemTemplate let-port="item"
          let-isAdd="isAdd">
          <form [formGroup]="portForm" novalidate>
            <ion-list>
              <ion-item-divider>
                {{isAdd ? 'Add' : 'Edit'}} Port
              </ion-item-divider>
              <ion-item>
                <ion-label>Name</ion-label>
                <ion-input
                  type="text"
                  formControlName="portName"
                  autocorrect="off"
                  autocapitalize="none">
                </ion-input>
              </ion-item>
              <ion-item>
                <ion-label>Country</ion-label>
                <ionic-selectable
                  item-content // Required for Ionic 3 only.
                  formControlName="portCountry"
                  itemValueField="id"
                  itemTextField="name"
                  [items]="countries">
                </ionic-selectable>
              </ion-item>
            </ion-list>
          </form>
          <ion-footer>
            <ion-toolbar>
              <ion-row>
                <ion-col col-6>
                  <button ion-button full no-margin
                    (click)="portComponent.hideAddItemTemplate()">
                    Cancel
                  </button>
                </ion-col>
                <ion-col col-6>
                  <button ion-button full no-margin
                    (click)="isAdd ? addPort() : savePort(port)"
                    [disabled]="!portForm.valid">
                    {{isAdd ? 'Add' : 'Save'}}
                  </button>
                </ion-col>
              </ion-row>
            </ion-toolbar>
          </ion-footer>
        </ng-template>
      </ionic-selectable>
    </ion-item>

TypeScript:

    ports: Port[];
    countries: Country[];
    port: Port;
    portForm: FormGroup;
    portNameControl: FormControl;
    portCountryControl: FormControl;
    portsSubscription: Subscription;
    @ViewChild('portComponent') portComponent: IonicSelectableComponent;

    constructor(
      private portService: PortService,
      private formBuilder: FormBuilder
    ) {
      this.countries = this.portService.getCountries();

      // Create port form that will be used to add or save port.
      this.portNameControl = this.formBuilder.control(null, Validators.required);
      this.portCountryControl = this.formBuilder.control(null, Validators.required);
      this.portForm = this.formBuilder.group({
        portName: this.portNameControl,
        portCountry: this.portCountryControl
      });
    }

    searchPorts(event: {
      component: IonicSelectableComponent,
      text: string
    }) {
      let text = event.text.trim().toLowerCase();
      event.component.startSearch();

      // Close any running subscription.
      if (this.portsSubscription) {
        this.portsSubscription.unsubscribe();
      }

      if (!text) {
        // Close any running subscription.
        if (this.portsSubscription) {
          this.portsSubscription.unsubscribe();
        }

        event.component.items = [];
        event.component.endSearch();
        return;
      }

      this.portsSubscription = this.portService.getPortsAsync().subscribe(ports => {
        // Subscription will be closed when unsubscribed manually.
        if (this.portsSubscription.closed) {
          return;
        }

        event.component.items = this.portService.filterPorts(ports, text);
        event.component.endSearch();
      });
    }

    onAddPort(event: {
      component: IonicSelectableComponent
    }) {
      // Clean form.
      this.portNameControl.reset();
      this.portCountryControl.reset();

      // Copy search text to port name field, so
      // user doesn't have to type again.
      this.portNameControl.setValue(event.component.searchText);

      // Show form.
      event.component.showAddItemTemplate();
    }

    onSavePort(event: {
      component: IonicSelectableComponent,
      item: Port
    }) {
      // Fill form.
      this.portNameControl.setValue(event.item.name);
      this.portCountryControl.setValue(event.item.country);

      // Show form.
      event.component.showAddItemTemplate();
    }

    onDeletePort(event: {
      component: IonicSelectableComponent,
      item: Port
    }) {
      // Show loading while port is being added to storage.
      event.component.showLoading();

      // Delete port from storage.
      this.portService.deletePortAsync(event.item).subscribe(() => {
        // Delete port from list.
        event.component.deleteItem(event.item).then(() => {
          // Hide loading.
          event.component.hideLoading();
        });
      });
    }

    addPort() {
      // Create port.
      let port = new Port({
        id: this.portService.getNewPortId(),
        name: this.portNameControl.value,
        country: this.portCountryControl.value
      });

      // Show loading while port is being added to storage.
      this.portComponent.showLoading();

      // Add port to storage.
      this.portService.addPortAsync(port).subscribe(() => {
        // Search for added port.
        this.portComponent.search(port.name);

        // Wait for search to complete before showing list.
        this.portsSubscription.add(() => {
          // Show list.
          this.portComponent.hideAddItemTemplate();

          // Clean form.
          this.portNameControl.reset();
          this.portCountryControl.reset();
        });
      });
    }

    savePort(port: Port) {
      // Show loading while port is being saved to storage.
      this.portComponent.showLoading();

      // Simulate async request.
      setTimeout(() => {
        // Change port.
        port.name = this.portNameControl.value;
        port.country = this.portCountryControl.value;

        // Show list.
        this.portComponent.hideAddItemTemplate();

        // Hide loading.
        this.portComponent.hideLoading();
      }, 1000);
    }

## Adding item when search fails
### Demo
  * [Adding item when search fails](https://stackblitz.com/edit/ionic-selectable-adding-on-search-fail?file=app/pages/home/home.html)

### Example

View:

    <ion-item>
      <ion-label>Port</ion-label>
      <ionic-selectable
        #portComponent
        item-content // Required for Ionic 3 only.
        [(ngModel)]="port"
        itemValueField="id"
        itemTextField="name"
        [items]="ports"
        [canSearch]="true"
        [canClear]="true"
        (onSearchFail)="onSearchFail($event)"
        (onSearchSuccess)="onSearchSuccess($event)">
        <ng-template ionicSelectableItemTemplate let-port="item">
          {{port.name}} ({{port.country.name}})
        </ng-template>
        <ng-template ionicSelectableAddItemTemplate let-port="item">
          <form [formGroup]="portForm" novalidate>
            <ion-list>
              <ion-item-divider>
                Add Port
              </ion-item-divider>
              <ion-item>
                No ports found. Would you like to add one?
              </ion-item>
              <ion-item>
                <ion-label>Name</ion-label>
                <ion-input
                  type="text"
                  formControlName="portName"
                  autocorrect="off"
                  autocapitalize="none">
                </ion-input>
              </ion-item>
              <ion-item>
                <ion-label>Country</ion-label>
                <ionic-selectable
                  item-content // Required for Ionic 3 only.
                  formControlName="portCountry"
                  itemValueField="id"
                  itemTextField="name"
                  [items]="countries">
                </ionic-selectable>
              </ion-item>
            </ion-list>
          </form>
          <ion-footer>
            <ion-toolbar>
              <ion-row>
                <ion-col col-6>
                  <button ion-button full no-margin
                    (click)="portComponent.hideAddItemTemplate()">
                    Cancel
                  </button>
                </ion-col>
                <ion-col col-6>
                  <button ion-button full no-margin
                    (click)="addPort()"
                    [disabled]="!portForm.valid">
                    Add
                  </button>
                </ion-col>
              </ion-row>
            </ion-toolbar>
          </ion-footer>
        </ng-template>
      </ionic-selectable>
    </ion-item>

TypeScript:

    ports: Port[];
    countries: Country[];
    port: Port;
    portForm: FormGroup;
    portNameControl: FormControl;
    portCountryControl: FormControl;
    @ViewChild('portComponent') portComponent: IonicSelectableComponent;

    constructor(
      private portService: PortService,
      private formBuilder: FormBuilder
    ) {
      this.ports = this.portService.getPorts();
      this.countries = this.portService.getCountries();

      // Create port form that will be used to add or save port.
      this.portNameControl = this.formBuilder.control(null, Validators.required);
      this.portCountryControl = this.formBuilder.control(null, Validators.required);
      this.portForm = this.formBuilder.group({
        portName: this.portNameControl,
        portCountry: this.portCountryControl
      });
    }

    onSearchFail(event: {
      component: IonicSelectableComponent,
      text: string
    }) {
      // Clean form.
      this.portNameControl.reset();
      this.portCountryControl.reset();

      // Copy search text to port name field, so
      // user doesn't have to type again.
      this.portNameControl.setValue(event.component.searchText);

      // Show form.
      event.component.showAddItemTemplate();
    }

    onSearchSuccess(event: {
      component: IonicSelectableComponent,
      text: string
    }) {
      // Hide form.
      event.component.hideAddItemTemplate();
    }

    addPort() {
      // Create port.
      let port = new Port({
        id: this.portService.getNewPortId(),
        name: this.portNameControl.value,
        country: this.portCountryControl.value
      });

      // Add port to storage.
      this.portService.addPort(port);

      // Add port to the top of list.
      this.portComponent.addItem(port).then(() => {
        this.portComponent.search(port.name);
      });

      // Clean form.
      this.portNameControl.reset();
      this.portCountryControl.reset();

      // Show list.
      this.portComponent.hideAddItemTemplate();
    }

## Adding item asynchronously when search fails
### Demo
  * [Adding item asynchronously when search fails](https://stackblitz.com/edit/ionic-selectable-adding-on-search-fail-async?file=app/pages/home/home.html)

### Example

View:

    <ion-item>
      <ion-label>Port</ion-label>
      <ionic-selectable
        #portComponent
        item-content // Required for Ionic 3 only.
        [(ngModel)]="port"
        itemValueField="id"
        itemTextField="name"
        [items]="ports"
        [canSearch]="true"
        [canClear]="true"
        (onSearch)="searchPorts($event)"
        (onSearchFail)="onSearchFail($event)"
        (onSearchSuccess)="onSearchSuccess($event)">
        <ng-template ionicSelectableItemTemplate let-port="item">
          {{port.name}} ({{port.country.name}})
        </ng-template>
        <ng-template ionicSelectableAddItemTemplate let-port="item">
          <form [formGroup]="portForm" novalidate>
            <ion-list>
              <ion-item-divider>
                Add Port
              </ion-item-divider>
              <ion-item>
                No ports found. Would you like to add one?
              </ion-item>
              <ion-item>
                <ion-label>Name</ion-label>
                <ion-input
                  type="text"
                  formControlName="portName"
                  autocorrect="off"
                  autocapitalize="none">
                </ion-input>
              </ion-item>
              <ion-item>
                <ion-label>Country</ion-label>
                <ionic-selectable
                  item-content // Required for Ionic 3 only.
                  formControlName="portCountry"
                  itemValueField="id"
                  itemTextField="name"
                  [items]="countries">
                </ionic-selectable>
              </ion-item>
            </ion-list>
          </form>
          <ion-footer>
            <ion-toolbar>
              <ion-row>
                <ion-col col-6>
                  <button ion-button full no-margin
                    (click)="portComponent.hideAddItemTemplate()">
                    Cancel
                  </button>
                </ion-col>
                <ion-col col-6>
                  <button ion-button full no-margin
                    (click)="addPort()"
                    [disabled]="!portForm.valid">
                    Add
                  </button>
                </ion-col>
              </ion-row>
            </ion-toolbar>
          </ion-footer>
        </ng-template>
      </ionic-selectable>
    </ion-item>

TypeScript:

    ports: Port[];
    countries: Country[];
    port: Port;
    portForm: FormGroup;
    portNameControl: FormControl;
    portCountryControl: FormControl;
    portsSubscription: Subscription;
    @ViewChild('portComponent') portComponent: IonicSelectableComponent;

    constructor(
      private portService: PortService,
      private formBuilder: FormBuilder
    ) {
      this.ports = this.portService.getPorts();
      this.countries = this.portService.getCountries();

      // Create port form that will be used to add or save port.
      this.portNameControl = this.formBuilder.control(null, Validators.required);
      this.portCountryControl = this.formBuilder.control(null, Validators.required);
      this.portForm = this.formBuilder.group({
        portName: this.portNameControl,
        portCountry: this.portCountryControl
      });
    }

    searchPorts(event: {
      component: IonicSelectableComponent,
      text: string
    }) {
      let text = event.text.trim().toLowerCase();
      event.component.startSearch();

      // Close any running subscription.
      if (this.portsSubscription) {
        this.portsSubscription.unsubscribe();
      }

      if (!text) {
        // Close any running subscription.
        if (this.portsSubscription) {
          this.portsSubscription.unsubscribe();
        }

        event.component.items = [];
        event.component.endSearch();
        return;
      }

      this.portsSubscription = this.portService.getPortsAsync().subscribe(ports => {
        // Subscription will be closed when unsubscribed manually.
        if (this.portsSubscription.closed) {
          return;
        }

        event.component.items = this.portService.filterPorts(ports, text);
        event.component.endSearch();
      });
    }

    onSearchFail(event: {
      component: IonicSelectableComponent,
      text: string
    }) {
      if (event.component.hasSearchText) {
        // Clean form.
        this.portNameControl.reset();
        this.portCountryControl.reset();

        // Copy search text to port name field, so
        // user doesn't have to type again.
        this.portNameControl.setValue(event.component.searchText);

        // Show form.
        event.component.showAddItemTemplate();
      }
    }

    onSearchSuccess(event: {
      component: IonicSelectableComponent,
      text: string
    }) {
      // Hide form.
      event.component.hideAddItemTemplate();
    }

    addPort() {
      // Create port.
      let port = new Port({
        id: this.portService.getNewPortId(),
        name: this.portNameControl.value,
        country: this.portCountryControl.value
      });

      // Show loading while port is being added to storage.
      this.portComponent.showLoading();

      // Add port to storage.
      this.portService.addPortAsync(port).subscribe(() => {
        // Search for added port.
        this.portComponent.search(port.name);

        // Wait for search to complete before showing list.
        this.portsSubscription.add(() => {
          // Show list.
          this.portComponent.hideAddItemTemplate();

          // Clean form.
          this.portNameControl.reset();
          this.portCountryControl.reset();
        });
      });
    }

# Templates

## Add item template
A template to add item.

### Demo and example
  * See [Adding, editing and deleting items](#adding-editing-and-deleting-items)

## Close button template
A template to render Close button.

### Demo
  * [Close button template](https://ionic-selectable.herokuapp.com/#/close-button-template)

### Example

View:

    <ionic-selectable>
      <ng-template ionicSelectableCloseButtonTemplate>
        <ion-icon name="close-circle" style="font-size: 24px;"></ion-icon>
      </ng-template>
    </ionic-selectable>

## Group template
A template to render groups.

### Parameters
**group**
```
{
  value: any,
  text?: any,
  items: any[]
}
```
A group, where `value` is defined by `groupValueField` and `text` is defined by `groupTextField`.

### Demo
  * [Group template](https://ionic-selectable.herokuapp.com/#/group-template)

### Example

View:

    <ionic-selectable>
      <ng-template ionicSelectableGroupTemplate let-group="group">
        {{group.text}} ({{group.items[0].country.flag}})
      </ng-template>
    </ionic-selectable>

## Group right template
A template to render the right part of groups.

### Parameters
**group**
```
{
  value: any,
  text?: any,
  items: any[]
}
```
A group, where `value` is defined by `groupValueField` and `text` is defined by `groupTextField`.

### Demo
  * [Group right template](https://ionic-selectable.herokuapp.com/#/group-right-template)

### Example

View:

    <ionic-selectable>
      <ng-template ionicSelectableGroupRightTemplate let-group="group">
        <img class="country-flag" [src]="group.items[0].country.flagUrl" />
      </ng-template>
    </ionic-selectable>


CSS:

    .country-flag {
      display: inline-block;
      width: 20px;
    }

## Item template
A template to render items.

### Demo
  * [Item template](https://ionic-selectable.herokuapp.com/#/item-template)

### Example

View:

    <ionic-selectable>
      <ng-template ionicSelectableItemTemplate let-port="item">
        {{port.name}} ({{port.country.name}})
      </ng-template>
    </ionic-selectable>

## Item right template
A template to render the right part of items.

### Demo
  * [Item right template](https://ionic-selectable.herokuapp.com/#/item-right-template)

### Example

View:

    <ionic-selectable>
      <ng-template ionicSelectableItemRightTemplate let-port="item">
        <img class="country-flag" [src]="port.country.flagUrl" />
      </ng-template>
    </ionic-selectable>

CSS:

    .country-flag {
      display: inline-block;
      width: 20px;
    }

## Message template
A template to render message.

### Demo
  * [Message template](https://ionic-selectable.herokuapp.com/#/message-template)

### Example

View:

    <ionic-selectable>
      <ng-template ionicSelectableMessageTemplate>
        Select port.
      </ng-template>
    </ionic-selectable>

## Multiple values template
A template to render multiple values.

### Demo
  * [Multiple values template](https://ionic-selectable.herokuapp.com/#/multiple-values-template)

### Example

View:

    <ionic-selectable [isMultiple]="true">
      <ng-template ionicSelectableValueTemplate let-ports="value">
        <div class="ionic-selectable-value-item" *ngFor="let port of ports">
          <img class="value-country-flag" [src]="port.country.flagUrl" />
          {{port.name}} ({{port.country.name}})
        </div>
      </ng-template>
    </ionic-selectable>

CSS:

    .value-country-flag {
      display: inline-block;
      width: 20px;
      max-width: 100%;
      height: auto;
    }

## Multiple values with ellipsis template
### Demo
  * [Multiple values with ellipsis template](https://ionic-selectable.herokuapp.com/#/values-ellipsis-template)

### Example

View:

    <ionic-selectable [isMultiple]="true">
      <ng-template ionicSelectableValueTemplate let-ports="value">
        <div class="ionic-selectable-value-item">
          {{formatPorts(ports)}}
        </div>
      </ng-template>
    </ionic-selectable>

TypeScript:

    formatPorts(ports: Port[]) {
      return ports.map(port => port.name).join(', ');
    }

## Placeholder template
A template to render placeholder.

### Demo
  * [Placeholder template](https://ionic-selectable.herokuapp.com/#/placeholder-template)

### Example

View:

    <ionic-selectable>
      <ng-template ionicSelectablePlaceholderTemplate>
        Port <span style="color: black;">(Dry)</span>
      </ng-template>
    </ionic-selectable>

## Search fail template
A template to render text when no items have been found.

### Demo
  * [Search fail template](https://ionic-selectable.herokuapp.com/#/search-fail-template)

### Example

View:

    <ionic-selectable>
      <ng-template ionicSelectableSearchFailTemplate>
        <div padding>
          No ports found.
        </div>
      </ng-template>
    </ionic-selectable>

## Title template
A template to render title.  
**Note**: If title template is not set, title will be taken from `ion-label`.

### Demo
  * [Title template](https://ionic-selectable.herokuapp.com/#/title-template)

### Example

View:

    <ionic-selectable>
      <ng-template ionicSelectableTitleTemplate>
        Port <span style="color: gray;">(Dry)</span>
      </ng-template>
    </ionic-selectable>

## Value template
A template to render value.

### Demo
  * [Value template](https://ionic-selectable.herokuapp.com/#/value-template)

### Example

View:

    <ionic-selectable>
      <ng-template ionicSelectableValueTemplate let-port="value">
        {{port.name}} ({{port.country.name}})
      </ng-template>
    </ionic-selectable>

# Forms

## FormControl

### Demo and example
  * [FormControl](https://stackblitz.com/edit/ionic-selectable-form-control?file=pages/home/home.html)


## Min/max selection

### Demo
  * [Min/max selection](https://stackblitz.com/edit/ionic-selectable-min-max-validation?file=pages/home/home.html)

### Example

View:

    <form [formGroup]="form" margin-bottom>
      <ion-item>
        <ion-label>Port</ion-label>
        <ionic-selectable
          #portComponent
          item-content // Required for Ionic 3 only.
          formControlName="ports"
          itemValueField="id"
          itemTextField="name"
          [items]="ports"
          [canClear]="true"
          [isMultiple]="true"
          [isConfirmButtonEnabled]="portComponent.itemsToConfirm.length >= 1 && portComponent.itemsToConfirm.length <= 3">
          <ng-template ionicSelectableMessageTemplate>
            Select between 1 to 3 items.
          </ng-template>
        </ionic-selectable>
      </ion-item>
      <ion-item>
        <ion-badge color="danger" *ngIf="!form.valid">Invalid</ion-badge>
        <ion-badge color="secondary" *ngIf="form.valid">Valid</ion-badge>
        <button ion-button item-right (click)="reset()" [disabled]="!form.valid">
          Reset
        </button>
      </ion-item>
    </form>

TypeScript:

    ports: Port[];
    port: Port;

    constructor(
      private portService: PortService
    ) {
      this.ports = this.portService.getPorts();
    }

# Fields

## addButtonText
Add button text.

### Type and default value
`string` | `'Add'`

### Example

View:

    <ionic-selectable
      addButtonText="Create">
    </ionic-selectable>

## canAddItem
Determines whether to allow adding items.

### Type and default value
`boolean` | `false`

### Demo and example
  * See [Adding, editing and deleting items](#adding-editing-and-deleting-items)

## canClear
Determines whether to show Clear button.

### Type and default value
`boolean` | `false`

### Demo
  * [canClear](https://stackblitz.com/edit/ionic-selectable-can-clear?file=pages/home/home.html)

### Example

View:

    <ionic-selectable
      [canClear]="true">
    </ionic-selectable>

## canDeleteItem
Determines whether to allow deleting items.

### Type and default value
`boolean` | `false`

### Demo and example
  * See [Adding, editing and deleting items](#adding-editing-and-deleting-items)

## canSaveItem
Determines whether to allow editing items.

### Type and default value
`boolean` | `false`

### Demo and example
  * See [Adding, editing and deleting items](#adding-editing-and-deleting-items)

## canSearch
Determines whether to show Searchbar.

### Type and default value
`boolean` | `false`

### Example

View:

    <ionic-selectable
      [canSearch]="true">
    </ionic-selectable>

## clearButtonText
Clear button text.

### Type and default value
`string` | `'Clear'`

### Example

View:

    <ionic-selectable
      clearButtonText="Clear">
    </ionic-selectable>

## closeButtonText
Close button text.

### Type and default value
`string` | `'Cancel'`

### Demo
  * [closeButtonText](https://stackblitz.com/edit/ionic-selectable-close-button-text?file=pages/home/home.html)

### Example

View:

    <ionic-selectable
      closeButtonText="Close">
    </ionic-selectable>

## disabledItems
A list of items to disable.  

### Type and default value
`Array` | `[]`

### Demo
  * [Disabling items](https://stackblitz.com/edit/ionic-selectable-disabled-items?file=pages/home/home.html)

### Example

View:

    <ion-item>
      <ion-label>Loading Ports</ion-label>
      <ionic-selectable
        item-content // Required for Ionic 3 only.
        [(ngModel)]="loadingPorts"
        itemValueField="id"
        itemTextField="name"
        [items]="ports"
        [canClear]="true"
        [isMultiple]="true"
        (onChange)="loadingPortChange($event)"
        [disabledItems]="disabledLoadingPorts">
      </ionic-selectable>
    </ion-item>
    <ion-item>
      <ion-label>Discharging Ports</ion-label>
      <ionic-selectable
        item-content // Required for Ionic 3 only.
        [(ngModel)]="dischargingPorts"
        itemValueField="id"
        itemTextField="name"
        [items]="ports"
        [canClear]="true"
        [isMultiple]="true"
        (onChange)="dischargingPortChange($event)"
        [disabledItems]="disabledDischargingPorts">
      </ionic-selectable>
    </ion-item>

TypeScript:

    ports: Port[];
    loadingPorts: Port[] = [];
    dischargingPorts: Port[] = [];
    disabledLoadingPorts: Port[] = [];
    disabledDischargingPorts: Port[] = [];

    constructor(
      private portService: PortService
    ) {
      this.ports = this.portService.getPorts();
    }

    loadingPortChange(event: {
      component: IonicSelectableComponent,
      value: any
    }) {
      this.disabledDischargingPorts = this.loadingPorts;
    }

    dischargingPortChange(event: {
      component: IonicSelectableComponent,
      value: any
    }) {
      this.disabledLoadingPorts = this.dischargingPorts;
    }

## shouldFocusSearchbar
Determines whether Searchbar should receive focus when Select page is opened.

### Type and default value
`boolean` | `false`

### Example

View:

    <ionic-selectable
      [shouldFocusSearchbar]="true">
    </ionic-selectable>

## groupColor
Group color. [Ionic colors](https://ionicframework.com/docs/theming/theming-your-app/) are supported.

### Type and default value
`string` | `null`

### Example

View:

    <ionic-selectable
      groupColor="primary">
    </ionic-selectable>

## groupValueField
Group property to use as a unique identifier to group items, e.g. `'country.id'`.  
**Note**: `items` should be an object array.

### Type and default value
`string` | `null`

### Demo
  * See [Grouping items](#grouping-items)

### Example

View:

    <ionic-selectable
      groupValueField="country.id">
    </ionic-selectable>

## groupTextField
Group property to display, e.g. `'country.name'`.  
**Note**: `items` should be an object array.

### Type and default value
`string` | `null`

### Demo
  * See [Grouping items](#grouping-items)

### Example

View:

    <ionic-selectable
      groupTextField="country.name">
    </ionic-selectable>

## hasInfiniteScroll
Determines whether Ionic [InfiniteScroll](https://ionicframework.com/docs/api/components/infinite-scroll/InfiniteScroll/) is enabled.  
**Note**: Infinite scroll cannot be used together with virtual scroll.

### Type and default value
`boolean` | `false`

### Demo
  * [hasInfiniteScroll](https://stackblitz.com/edit/ionic-selectable-infinite-scroll?file=pages/home/home.html)

### Example
See [onInfiniteScroll](#oninfinitescroll) event.

## hasConfirmButton
Determines whether Confirm button is visible for single selection.  
By default Confirm button is visible only for multiple selection.  
**Note**: It is always true for multiple selection and cannot be changed.

### Type and default value
`boolean` | `false`

### Example

View:

    <ionic-selectable
      [hasConfirmButton]="true">
    </ionic-selectable>

## hasSearchText
Determines whether user has typed anything in Searchbar.

### Type and default value
`boolean` | `false`

### Example

View:

    <ionic-selectable
      #portComponent>
    </ionic-selectable>

TypeScript:

    @ViewChild('portComponent') portComponent: IonicSelectableComponent;

    let hasSearchText = this.portComponent.hasSearchText;

## hasVirtualScroll
Determines whether Ionic [VirtualScroll](https://ionicframework.com/docs/api/components/virtual-scroll/VirtualScroll/) is enabled.  
**Note**: Virtual scroll cannot be used together with infinite scroll.

### Type and default value
`boolean` | `false`

### Demo
  * [hasVirtualScroll](https://stackblitz.com/edit/ionic-selectable-virtual-scroll?file=pages/home/home.html)

### Example

View:

    <ionic-selectable
      [hasVirtualScroll]="true">
    </ionic-selectable>

## headerColor
Header color. [Ionic colors](https://ionicframework.com/docs/theming/theming-your-app/) are supported.

### Type and default value
`string` | `null`

### Example

View:

    <ionic-selectable
      headerColor="primary">
    </ionic-selectable>

## items
A list of items.

### Type and default value
`Array` | `[]`

### Example

View:

    <ionic-selectable
      [items]="ports">
    </ionic-selectable>

TypeScript:

    ports: Port[] = [];

    constructor() {
      this.ports = [
        { id: 1, name: 'Tokai', country: 'Japan' },
        { id: 2, name: 'Vladivostok', country: 'Russia' }
      ];
    }

## itemsToConfirm
A list of items that are selected and awaiting confirmation by user, when he has clicked Confirm button.  
After the user has clicked Confirm button items to confirm are cleared.  
**Note**: `isMultiple` has to be enabled.

### Type and default value
`Array` | `[]`

### Example

View:

    <ionic-selectable
      #portComponent
      [isMultiple]="true"
      [items]="ports">
    </ionic-selectable>
    <div>
      Items to confirm: {{portComponent.itemsToConfirm.length}}
    </div>

## isBackdropCloseEnabled
`Version added: 3.2.0, 4.2.0`
  
Determines whether Select page should be closed when backdrop is clicked.

### Type and default value
`boolean` | `true`

### Example

View:

    <ionic-selectable
      [isBackdropCloseEnabled]="false">
    </ionic-selectable>

## isEnabled
Determines whether the component is enabled.

### Type and default value
`boolean` | `true`

### Demo
  * [isEnabled](https://stackblitz.com/edit/ionic-selectable-is-enabled?file=pages/home/home.html)

### Example

View:

    <ionic-selectable
      [isEnabled]="false">
    </ionic-selectable>

## isMultiple
Determines whether multiple items can be selected.

### Type and default value
`boolean` | `false`

### Demo
  * [isMultiple](https://stackblitz.com/edit/ionic-selectable-is-multiple?file=pages/home/home.html)

### Example

View:

    <ionic-selectable
      [isMultiple]="true">
    </ionic-selectable>

## isConfirmButtonEnabled
Determines whether Confirm button is enabled.

### Type and default value
`boolean` | `true`

### Example

View:

    <ionic-selectable
      [isConfirmButtonEnabled]="false">
    </ionic-selectable>

## isOnSearchEnabled
Determines whether `onSearch` event is enabled.  

### Type and default value
`boolean` | `true`

### Example

View:

    <ionic-selectable
      [isOnSearchEnabled]="false">
    </ionic-selectable>

## isOpened
Determines whether Select page is opened.

### Type and default value
`boolean` | `false`

### Example

TypeScript:

    @ViewChild('portComponent') portComponent: IonicSelectableComponent;

    let isOpened = this.portComponent.isOpened;

## isSearching
Determines whether search is running.

### Type and default value
`boolean` | `false`

### Example

TypeScript:

    @ViewChild('portComponent') portComponent: IonicSelectableComponent;

    let isSearching = this.portComponent.isSearching;

## itemValueField
Item property to use as a unique identifier, e.g, `'id'`.  
**Note**: `items` should be an object array.

### Type and default value
`string` | `null`

### Example

View:

    <ionic-selectable
      itemValueField="id">
    </ionic-selectable>

## itemTextField
Item property to display, e.g, `'name'`.  
**Note**: `items` should be an object array.

### Type and default value
`string` | `null`

### Example

View:

    <ionic-selectable
      itemTextField="name">
    </ionic-selectable>

## confirmButtonText
Confirm button text.

### Type and default value
`string` | `'OK'`

### Example

View:

    <ionic-selectable
      confirmButtonText="Select">
    </ionic-selectable>

## placeholder
A placeholder.

### Type and default value
`string` | `null`

### Demo
  * [placeholder](https://stackblitz.com/edit/ionic-selectable-placeholder?file=pages/home/home.html)

### Example

View:

    <ionic-selectable
      placeholder="Port">
    </ionic-selectable>

## searchDebounce
How long, in milliseconds, to wait to filter items or to trigger `onSearch` event after each keystroke.

### Type and default value
`number` | `250`

### Example

View:

    <ionic-selectable
      [searchDebounce]="1000">
    </ionic-selectable>

## searchFailText
Text to display when no items have been found during search.

### Type and default value
`string` | `'No items found.'`

### Example

View:

    <ionic-selectable
      [searchFailText]="'No ports found.'">
    </ionic-selectable>

## searchPlaceholder
A placeholder for Searchbar.

### Type and default value
`string` | `'Search'`

### Example

View:

    <ionic-selectable
      searchPlaceholder="Enter port name">
    </ionic-selectable>

## searchText
`Version added: get: 3.0.1, 4.0.0, set: 3.2.0, 4.2.0`  

Text that the user has typed in Searchbar.

### Type and default value
`string` | `''`

### Example

View:

    <ionic-selectable
      #portComponent>
    </ionic-selectable>

TypeScript:

    @ViewChild('portComponent') portComponent: IonicSelectableComponent;

    let searchText = this.portComponent.searchText;

## shouldStoreItemValue
Determines whether item value only should be stored in `ngModel`, not the entire item.  
**Note**: Item value is defined by `itemValueField`.

### Type and default value
`boolean` | `false`

### Demo
  * [shouldStoreItemValue](https://stackblitz.com/edit/ionic-selectable-should-store-item-value?file=pages/home/home.html)

### Example

View:

    <ionic-selectable
      [shouldStoreItemValue]="true">
    </ionic-selectable>


## virtualScrollApproxItemHeight

See Ionic VirtualScroll [approxItemHeight](https://ionicframework.com/docs/api/components/virtual-scroll/VirtualScroll/).

### Type and default value
`string` | `'40px'`

### Example

View:

    <ionic-selectable
      virtualScrollApproxItemHeight="100px">
    </ionic-selectable>

## virtualScrollHeaderFn
See Ionic VirtualScroll [headerFn](https://ionicframework.com/docs/api/components/virtual-scroll/VirtualScroll/).

### Type
`Function`

### Demo and example
  * See [Grouping items with VirtualScroll](#grouping-items-with-ionic-virtualscroll)

# Methods

## addItem()
Adds item.  
**Note**: If you want an item to be added to the original array as well use two-way data binding syntax on `[(items)]` field.

### Parameters
**item**
`any`  
Item to add.

### Returns
`Promise<void>`  
Promise that resolves when item has been added.

### Demo and example
  * See [Adding, editing and deleting items](#adding-editing-and-deleting-items)

## clear()
Clears value.

### Example

View:

    <ionic-selectable
      #portComponent>
    </ionic-selectable>

TypeScript:

    @ViewChild('portComponent') portComponent: IonicSelectableComponent;

    clear() {
      this.portComponent.clear();
    }

## close()
Closes Select page.

### Returns
`Promise<void>`  
Promise that resolves when Select page has been closed.

### Example

View:

    <ionic-selectable
      #portComponent>
    </ionic-selectable>

TypeScript:

    @ViewChild('portComponent') portComponent: IonicSelectableComponent;

    close() {
      this.portComponent.close();
    }

## deleteItem()
Deletes item.  
**Note**: If you want an item to be deleted from the original array as well use two-way data binding syntax on `[(items)]` field.

### Parameters
**item**
`any`  
Item to delete.

### Returns
`Promise<void>`  
Promise that resolves when item has been deleted.

### Demo and example
  * See [Adding, editing and deleting items](#adding-editing-and-deleting-items)

## disableInfiniteScroll()
Disables infinite scroll.

### Demo
  * [disableInfiniteScroll()](https://stackblitz.com/edit/ionic-selectable-infinite-scroll?file=pages/home/home.html)

### Example

View:

    <ionic-selectable
      #portComponent>
    </ionic-selectable>

TypeScript:

    @ViewChild('portComponent') portComponent: IonicSelectableComponent;

    close() {
      this.portComponent.disableInfiniteScroll();
    }

## enableInfiniteScroll()
Enables infinite scroll.

### Demo
  * [enableInfiniteScroll()](https://stackblitz.com/edit/ionic-selectable-infinite-scroll?file=pages/home/home.html)

### Example

View:

    <ionic-selectable
      #portComponent>
    </ionic-selectable>

TypeScript:

    @ViewChild('portComponent') portComponent: IonicSelectableComponent;

    close() {
      this.portComponent.enableInfiniteScroll();
    }

## endInfiniteScroll()
Ends infinite scroll.

### Demo
  * [endInfiniteScroll()](https://stackblitz.com/edit/ionic-selectable-infinite-scroll?file=pages/home/home.html)

### Example

View:

    <ionic-selectable
      #portComponent>
    </ionic-selectable>

TypeScript:

    @ViewChild('portComponent') portComponent: IonicSelectableComponent;

    close() {
      this.portComponent.endInfiniteScroll();
    }

## endSearch()
Ends search process by hiding Loading spinner and refreshing items.  
Use it together with `onSearch` event to indicate search end.

### Demo
  * [endSearch()](https://stackblitz.com/edit/ionic-selectable-on-search?file=pages/home/home.html)

### Example

View:

    <ionic-selectable
      (onSearch)="searchPorts($event)">
    </ionic-selectable>

TypeScript:

    searchPorts(event: {
      component: IonicSelectableComponent,
      text: string
    }) {
      event.component.startSearch();

      // Get ports from a storage and stop searching.
      event.component.endSearch();
    }

## hasValue()
Determines whether any item has been selected.

### Returns
`boolean` A boolean determining whether any item has been selected.

### Example

View:

    <ionic-selectable
      #portComponent>
    </ionic-selectable>

TypeScript:

    @ViewChild('portComponent') portComponent: IonicSelectableComponent;

    hasValue() {
      this.portComponent.hasValue();
    }

## hideAddItemTemplate()
Hides `ionicSelectableAddItemTemplate`.

### Example

View:

    <ionic-selectable
      #portComponent>
    </ionic-selectable>

TypeScript:

    @ViewChild('portComponent') portComponent: IonicSelectableComponent;

    hideAddItemTemplate() {
      this.portComponent.hideAddItemTemplate();
    }

## hideLoading()
Hides Loading spinner.

### Example

View:

    <ionic-selectable
      #portComponent>
    </ionic-selectable>

TypeScript:

    @ViewChild('portComponent') portComponent: IonicSelectableComponent;

    hideLoading() {
      this.portComponent.hideLoading();
    }

## open()
Opens Select page.

### Returns
`Promise<void>`  
Promise that resolves when Select page has been opened.

### Example

View:

    <ionic-selectable
      #portComponent>
    </ionic-selectable>

TypeScript:

    @ViewChild('portComponent') portComponent: IonicSelectableComponent;

    open() {
      this.portComponent.open();
    }

## search()
Triggers search of items.  
**Note**: `canSearch` has to be enabled.

### Parameters
**text**
`string`  
Text to search items by.

### Example

View:

    <ionic-selectable
      #portComponent>
    </ionic-selectable>

TypeScript:

    @ViewChild('portComponent') portComponent: IonicSelectableComponent;

    search(text: string) {
      this.portComponent.search(text);
    }

## scrollToBottom()
Scrolls to the bottom of Select page content.

### Returns
`Promise<void>`  
Promise that resolves when scroll has been completed.

### Example

View:

    <ionic-selectable
      #portComponent>
    </ionic-selectable>

TypeScript:

    @ViewChild('portComponent') portComponent: IonicSelectableComponent;

    scrollToBottom() {
      this.portComponent.scrollToBottom();
    }

## scrollToTop()
Scrolls to the top of Select page content.

### Returns
`Promise<void>`  
Promise that resolves when scroll has been completed.

### Demo
  * [scrollToTop()](https://stackblitz.com/edit/ionic-selectable-scroll-to-top?file=pages/home/home.html)

### Example

View:

    <ionic-selectable
      #portComponent>
    </ionic-selectable>

TypeScript:

    @ViewChild('portComponent') portComponent: IonicSelectableComponent;

    scrollToTop() {
      this.portComponent.scrollToTop();
    }

## showAddItemTemplate()
Shows `ionicSelectableAddItemTemplate`.

### Example

View:

    <ionic-selectable
      #portComponent>
    </ionic-selectable>

TypeScript:

    @ViewChild('portComponent') portComponent: IonicSelectableComponent;

    showAddItemTemplate() {
      this.portComponent.showAddItemTemplate();
    }

## showLoading()
Shows Loading spinner.

### Example

View:

    <ionic-selectable
      #portComponent>
    </ionic-selectable>

TypeScript:

    @ViewChild('portComponent') portComponent: IonicSelectableComponent;

    showLoading() {
      this.portComponent.showLoading();
    }

## startSearch()
Starts search process by showing Loading spinner.  
Use it together with `onSearch` event to indicate search start.

### Demo
  * [startSearch()](https://stackblitz.com/edit/ionic-selectable-on-search?file=pages/home/home.html)

### Example

View:

    <ionic-selectable
      (onSearch)="searchPorts($event)">
    </ionic-selectable>

TypeScript:

    searchPorts(event: {
      component: IonicSelectableComponent,
      text: string
    }) {
      event.component.startSearch();

      // Get ports from a storage and stop searching.
      event.component.endSearch();
    }

# Events

## onAddItem
Fires when Add item button has been clicked.  
When the button has been clicked `ionicSelectableAddItemTemplate` will be shown. Use the template to create a form to add item.  
**Note**: `canAddItem` has to be enabled.

### Type
`EventEmitter<{ component: IonicSelectableComponent }>`

### Demo and example
  * See [Adding, editing and deleting items](#adding-editing-and-deleting-items)

## onDeleteItem
Fires when Delete item button has been clicked.  
**Note**: `canDeleteItem` has to be enabled.

### Type
`EventEmitter<{ component: IonicSelectableComponent, item: any }>`

### Demo and example
  * See [Adding, editing and deleting items](#adding-editing-and-deleting-items)

## onChange
Fires when item/s has been selected and Select page closed.

### Type
`EventEmitter<{ component: IonicSelectableComponent, value: any }>`

### Example

View:

    <ionic-selectable
      (onChange)="portChange($event)">
    </ionic-selectable>

TypeScript:

    portChange(event: {
      component: IonicSelectableComponent,
      value: any
    }) {
      let port = event.value;
    }

## onClear
`Version added: 3.2.0, 4.2.0`  

Fires when Clear button has been clicked.

### Type
`EventEmitter<{ component: IonicSelectableComponent, items: any[] }>`

### Example

View:

    <ionic-selectable
      (onClear)="onClear($event)">
    </ionic-selectable>

TypeScript:

    onClear(event: {
      component: IonicSelectableComponent,
      items: any[]
    }) {

    }

## onClose
Fires when Select page has been closed.

### Type
`EventEmitter<{ component: IonicSelectableComponent }>`

### Example

View:

    <ionic-selectable
      (onClose)="onClose($event)">
    </ionic-selectable>

TypeScript:

    onClose(event: { component: IonicSelectableComponent }) {

    }

## onInfiniteScroll
Fires when the user has scrolled to the end of the list.  
**Note**: `hasInfiniteScroll` has to be enabled.

### Type
`EventEmitter<{ component: IonicSelectableComponent, text: string }>`

### Demo
  * [onInfiniteScroll](https://stackblitz.com/edit/ionic-selectable-infinite-scroll?file=pages/home/home.html)

## onOpen
Fires when Select page has been opened.

### Type
`EventEmitter<{ component: IonicSelectableComponent }>`

### Example

View:

    <ionic-selectable
      (onOpen)="onOpen($event)">
    </ionic-selectable>

TypeScript:

    onOpen(event: { component: IonicSelectableComponent }) {

    }

## onSaveItem
Fires when Edit item button has been clicked.  
When the button has been clicked `ionicSelectableAddItemTemplate` will be shown. Use the template to create a form to edit item.  
**Note**: `canSaveItem` has to be enabled.

### Type
`EventEmitter<{ component: IonicSelectableComponent, item: any }>`

### Demo and example
  * See [Adding, editing and deleting items](#adding-editing-and-deleting-items)

## onSearch
Fires when the user is typing in Searchbar.  
**Note**: `canSearch` and `isOnSearchEnabled` has to be enabled.

### Type
`EventEmitter<{ component: IonicSelectableComponent, text: string }>`

### Demo
  * [onSearch](https://stackblitz.com/edit/ionic-selectable-on-search?file=pages/home/home.html)

### Example

View:

    <ionic-selectable
      (onSearch)="searchPorts($event)">
    </ionic-selectable>

TypeScript:

    searchPorts(event: {
      component: IonicSelectableComponent,
      text: string
    }) {
      let portName = event.text;
      event.component.startSearch();

      // Assume that we already have some PortService that return ports
      // filtered by name from our server.
      this.portService.getPorts(portName).subscribe(ports => {
        event.component.items = ports;
    
        // Get ports from a storage and stop searching.
        event.component.endSearch();
      });
    }

## onSearchFail
Fires when no items have been found.

### Type
`EventEmitter<{ component: IonicSelectableComponent, text: string }>`

### Example

View:

    <ionic-selectable
      (onSearchFail)="onSearchFail($event)">
    </ionic-selectable>

TypeScript:

    onSearchFail(event: {
      component: IonicSelectableComponent,
      text: string
    }) {

    }

## onSearchSuccess
Fires when some items have been found.

### Type
`EventEmitter<{ component: IonicSelectableComponent, text: string }>`

### Example

View:

    <ionic-selectable
      (onSearchSuccess)="onSearchSuccess($event)">
    </ionic-selectable>

TypeScript:

    onSearchSuccess(event: {
      component: IonicSelectableComponent,
      text: string
    }) {

    }

## onSelect
`Version added: 3.2.0, 4.2.0`  

Fires when an item has been selected or unselected.

### Type
`EventEmitter<{ component: IonicSelectableComponent, item: any, isSelected: boolean }>`

### Example

View:

    <ionic-selectable
      (onSelect)="onSelect($event)">
    </ionic-selectable>

TypeScript:

    onSelect(event: {
      component: IonicSelectableComponent,
      item: any,
      isSelected: boolean
    }) {

    }

# Theming

## Select CSS modifiers
* `ionic-selectable-ios`
* `ionic-selectable-md`
* `ionic-selectable-is-multiple`
* `ionic-selectable-can-clear`
* `ionic-selectable-is-enabled`
* `ionic-selectable-has-value`
* `ionic-selectable-has-placeholder`

## Page CSS modifiers
* `ionic-selectable-page-ios`
* `ionic-selectable-page-md`
* `ionic-selectable-page-is-multiple`
* `ionic-selectable-page-can-clear`
* `ionic-selectable-page-is-searching`
* `ionic-selectable-page-is-add-item-template-visible`

## Item CSS modifiers
* `ionic-selectable-item-is-selected`
* `ionic-selectable-item-is-disabled`

# Errors

## IonicSelectable is disabled or already closed
```
ERROR Error: Uncaught (in promise): IonicSelectable is disabled or already closed.
```

The error occurs when `close()` method is invoked while component is disabled or closed.  
**Note**: Ionic will only throw the error in development mode when running application with `ionic serve`.

### Solution
The error can be ignored as it will not happen in production mode. However, you can still prevent it by using `catch`
```
this.portComponent.close().catch(() => { });
```

or by checking `isEnabled` and `isOpened` fields.
```
if (this.portComponent.isEnabled && this.portComponent.isOpened) {
  this.portComponent.close();
}
```

## IonicSelectable is disabled or already opened
```
ERROR Error: Uncaught (in promise): IonicSelectable is disabled or already opened.
```

The error occurs when `open()` method is invoked while component is disabled or opened.  
**Note**: Ionic will only throw the error in development mode when running application with `ionic serve`.

### Solution
The error can be ignored as it will not happen in production mode. However, you can still prevent it by using`catch`
```
this.portComponent.open().catch(() => { });
```

or by checking `isEnabled` and `isOpened` fields.
```
if (this.portComponent.isEnabled && !this.portComponent.isOpened) {
  this.portComponent.open();
}
```

## IonicSelectable content cannot be scrolled
```
ERROR Error: Uncaught (in promise): IonicSelectable content cannot be scrolled.
```

The error occurs when `scrollToTop()` or `scrollToBottom()` method is invoked while component is not opened.  
**Note**: Ionic will only throw the error in development mode when running application with `ionic serve`.

### Solution
The error can be ignored as it will not happen in production mode. However, you can still prevent it by adding `catch`
```
this.portComponent.scrollToTop().catch(() => { });
```

or by checking `isOpened` field.
```
if (this.portComponent.isOpened) {
  this.portComponent.scrollToTop();
}
```
