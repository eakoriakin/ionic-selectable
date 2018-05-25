import { AfterViewInit, Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { Content, InfiniteScroll, NavParams, Platform, Searchbar, ViewController } from 'ionic-angular';
import { SelectSearchableComponent } from './select-searchable.component';

@Component({
    selector: 'select-searchable-page',
    template: `
        <ion-header>
            <ion-navbar [color]="selectComponent.headerColor ? selectComponent.headerColor : null">
                <ion-title>
                    <div *ngIf="selectComponent.titleTemplate"
                        [ngTemplateOutlet]="selectComponent.titleTemplate">
                    </div>
                    <div *ngIf="!selectComponent.titleTemplate && selectComponent.labelTemplate"
                        [ngTemplateOutlet]="selectComponent.labelTemplate">
                    </div>
                </ion-title>
                <ion-buttons start>
                    <button ion-button (click)="close()">
                        <span ion-text showWhen="ios">
                            {{selectComponent.closeButtonText}}
                        </span>
                        <ion-icon name="md-close" hideWhen="ios"></ion-icon>
                    </button>
                </ion-buttons>
            </ion-navbar>
            <ion-toolbar *ngIf="selectComponent.canSearch || selectComponent.messageTemplate">
                <ion-searchbar
                    *ngIf="selectComponent.canSearch"
                    #searchbarComponent
                    [(ngModel)]="selectComponent._filterText"
                    (ionInput)="filterItems()"
                    [placeholder]="selectComponent.searchPlaceholder || 'Search'"
                    [debounce]="selectComponent.searchDebounce">
                </ion-searchbar>
                <div class="select-searchable-page-message" *ngIf="selectComponent.messageTemplate">
                    <div [ngTemplateOutlet]="selectComponent.messageTemplate">
                    </div>
                </div>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="select-searchable-spinner" *ngIf="selectComponent.isSearching">
                <div class="select-searchable-spinner-background"></div>
                <ion-spinner></ion-spinner>
            </div>
            <ion-list no-margin *ngIf="filteredItems.length">
                <button ion-item detail-none *ngFor="let item of filteredItems" (click)="select(item)">
                    <ion-icon
                        [name]="isItemSelected(item) ? 'checkmark-circle' : 'radio-button-off'"
                        [color]="isItemSelected(item) ? 'primary' : 'daek'"
                        item-left>
                    </ion-icon>
                    <div *ngIf="selectComponent.itemTemplate"
                        [ngTemplateOutlet]="selectComponent.itemTemplate"
                        [ngTemplateOutletContext]="{ item: item }">
                    </div>
                    <div *ngIf="!selectComponent.itemTemplate">
                        {{selectComponent._formatItem(item)}}
                    </div>
                    <div *ngIf="selectComponent.itemRightTemplate" item-right>
                        <div [ngTemplateOutlet]="selectComponent.itemRightTemplate"
                            [ngTemplateOutletContext]="{ item: item }">
                        </div>
                    </div>
                </button>
            </ion-list>
            <div *ngIf="!filteredItems.length" margin>{{selectComponent.noItemsFoundText}}</div>
            <ion-infinite-scroll [enabled]="selectComponent.hasInfiniteScroll" (ionInfinite)="getMoreItems($event)">
                <ion-infinite-scroll-content></ion-infinite-scroll-content>
            </ion-infinite-scroll>
        </ion-content>
        <ion-footer *ngIf="selectComponent.canReset || selectComponent.isMultiple">
            <ion-toolbar padding>
                <ion-row>
                    <ion-col no-padding *ngIf="selectComponent.canReset"
                        [attr.col-6]="selectComponent.canReset && selectComponent.isMultiple ? '' : null"
                        [attr.col-12]="selectComponent.canReset && !selectComponent.isMultiple ? '' : null">
                        <button ion-button full no-margin (click)="reset()" [disabled]="!selectedItems.length">
                            {{selectComponent.resetButtonText}}
                        </button>
                    </ion-col>
                    <ion-col no-padding *ngIf="selectComponent.isMultiple"
                        [attr.col-6]="selectComponent.canReset && selectComponent.isMultiple ? '' : null"
                        [attr.col-12]="!selectComponent.canReset && selectComponent.isMultiple ? '' : null">
                        <button ion-button full no-margin (click)="ok()"
                            [disabled]="!selectComponent.isOkButtonEnabled">
                            {{selectComponent.okButtonText}}
                        </button>
                    </ion-col>
                </ion-row>
            </ion-toolbar>
        </ion-footer>
    `
})
export class SelectSearchablePageComponent implements OnInit, AfterViewInit {
    @HostBinding('class.select-searchable-page')
    private _cssClass = true;
    @HostBinding('class.select-searchable-page-can-reset')
    private get _canResetCssClass(): boolean {
        return this.selectComponent.canReset;
    }
    @HostBinding('class.select-searchable-page-is-multiple')
    private get _isMultipleCssClass(): boolean {
        return this.selectComponent.isMultiple;
    }
    @HostBinding('class.select-searchable-page-is-searching')
    private get _isSearchingCssClass(): boolean {
        return this.selectComponent.isSearching;
    }
    @HostBinding('class.select-searchable-page-ios')
    private _isIos: boolean;
    @HostBinding('class.select-searchable-page-md')
    private _isMD: boolean;
    selectComponent: SelectSearchableComponent;
    filteredItems: any[];
    selectedItems: any[] = [];
    infiniteScroll: InfiniteScroll;
    @ViewChild('searchbarComponent')
    searchbarComponent: Searchbar;
    @ViewChild(Content) _content: Content;

    constructor(
        private navParams: NavParams,
        private viewController: ViewController,
        private platform: Platform
    ) {
        this.selectComponent = this.navParams.get('selectComponent');
        this.selectComponent._selectPageComponent = this;
        this.filteredItems = this.selectComponent.items;
        this.filterItems();

        if (this.selectComponent.value) {
            if (this.selectComponent.isMultiple) {
                this.selectComponent.value.forEach(item => {
                    this.selectedItems.push(item);
                });
            } else {
                this.selectedItems.push(this.selectComponent.value);
            }
        }

        this._setItemsToConfirm(this.selectedItems);
    }

    private _setItemsToConfirm(items: any[]) {
        // Return a copy of original array, so it couldn't be changed from outside.
        this.selectComponent._itemsToConfirm = [].concat(items);
    }

    ngOnInit() {
        this._isIos = this.platform.is('ios');
        this._isMD = !this._isIos;
    }

    ngAfterViewInit() {
        if (this.searchbarComponent && this.selectComponent.focusSearchbar) {
            // Focus after a delay because focus doesn't work without it.
            setTimeout(() => {
                this.searchbarComponent.setFocus();
            }, 1000);
        }
    }

    isItemSelected(item: any) {
        return this.selectedItems.find(selectedItem => {
            if (this.selectComponent.itemValueField) {
                return item[this.selectComponent.itemValueField] === selectedItem[this.selectComponent.itemValueField];
            }

            return item === selectedItem;
        }) !== undefined;
    }

    deleteSelectedItem(item: any) {
        let itemToDeleteIndex;

        this.selectedItems.forEach((selectedItem, itemIndex) => {
            if (this.selectComponent.itemValueField) {
                if (item[this.selectComponent.itemValueField] === selectedItem[this.selectComponent.itemValueField]) {
                    itemToDeleteIndex = itemIndex;
                }
            } else if (item === selectedItem) {
                itemToDeleteIndex = itemIndex;
            }
        });

        this.selectedItems.splice(itemToDeleteIndex, 1);
    }

    addSelectedItem(item: any) {
        this.selectedItems.push(item);
    }

    select(item: any) {
        if (this.selectComponent.isMultiple) {
            if (this.isItemSelected(item)) {
                this.deleteSelectedItem(item);
            } else {
                this.addSelectedItem(item);
            }

            this._setItemsToConfirm(this.selectedItems);
        } else {
            if (!this.isItemSelected(item)) {
                this.selectedItems = [];
                this.addSelectedItem(item);
                this.selectComponent._select(item);
            }

            this.close();
        }
    }

    ok() {
        this.selectComponent._select(this.selectedItems);
        this.close();
    }

    close() {
        // Focused input interferes with the animation.
        // Blur it first, wait a bit and then close the page.
        if (this.searchbarComponent) {
            this.searchbarComponent._fireBlur();
        }

        setTimeout(() => {
            this.selectComponent.close().then(() => {
                this.selectComponent.onClose.emit({
                    component: this.selectComponent
                });
            });

            if (!this.selectComponent._hasSearch()) {
                this.selectComponent._filterText = '';
            }
        });
    }

    reset() {
        this.selectComponent.reset();
        this.selectComponent._emitChange();
        this.selectComponent.close().then(() => {
            this.selectComponent.onClose.emit({
                component: this.selectComponent
            });
        });
    }

    filterItems() {
        if (this.selectComponent._hasSearch()) {
            // Delegate filtering to the event.
            this.selectComponent._emitSearch(this.infiniteScroll);
        } else {
            let items = [];

            // Default filtering.
            if (!this.selectComponent._filterText || !this.selectComponent._filterText.trim()) {
                items = this.selectComponent.items;
            } else {
                let filterText = this.selectComponent._filterText.trim().toLowerCase();

                items = this.selectComponent.items.filter(item => {
                    let itemText = (this.selectComponent.itemTextField ?
                        item[this.selectComponent.itemTextField] : item).toString().toLowerCase();

                    return itemText.indexOf(filterText) !== -1;
                });
            }

            this.filteredItems = items;
        }
    }

    getMoreItems(infiniteScroll: InfiniteScroll) {
        // TODO: Try to get infiniteScroll via ViewChild. Maybe it works in a newer Ionic version.
        // For now assign it here.
        this.infiniteScroll = infiniteScroll;

        this.selectComponent.onInfiniteScroll.emit({
            component: this.selectComponent,
            infiniteScroll: infiniteScroll,
            text: this.selectComponent._filterText
        });
    }
}
