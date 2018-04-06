import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NavParams, NavController, Searchbar, InfiniteScroll } from 'ionic-angular';
import { SelectSearchable } from './select-searchable.component';

@Component({
    selector: 'select-searchable-page',
    template: `
        <ion-header>
            <ion-navbar>
                <ion-title>{{selectComponent.title}}</ion-title>
            </ion-navbar>
            <ion-toolbar *ngIf="selectComponent.canSearch">
                <ion-searchbar
                    #searchbarComponent
                    [(ngModel)]="selectComponent.filterText"
                    (ionInput)="filterItems()"
                    [placeholder]="selectComponent.searchPlaceholder || 'Search'">
                </ion-searchbar>
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
                    <h2>{{selectComponent.formatItem(item)}}</h2>
                </button>
            </ion-list>
            <div *ngIf="!filteredItems.length" margin>{{selectComponent.noItemsFoundText}}</div>
            <ion-infinite-scroll [enabled]="selectComponent.hasInfiniteScroll" (ionInfinite)="getMoreItems($event)">
                <ion-infinite-scroll-content></ion-infinite-scroll-content>
            </ion-infinite-scroll>
        </ion-content>
        <ion-footer *ngIf="selectComponent.canReset || selectComponent.multiple">
            <ion-toolbar padding>
                <ion-row>
                    <ion-col no-padding *ngIf="selectComponent.canReset"
                        [attr.col-6]="selectComponent.canReset && selectComponent.multiple ? '' : null"
                        [attr.col-12]="selectComponent.canReset && !selectComponent.multiple ? '' : null">
                        <button ion-button full no-margin (click)="reset()" [disabled]="!selectedItems.length">
                            {{selectComponent.resetButtonText}}
                        </button>
                    </ion-col>
                    <ion-col no-padding *ngIf="selectComponent.multiple"
                        [attr.col-6]="selectComponent.canReset && selectComponent.multiple ? '' : null"
                        [attr.col-12]="!selectComponent.canReset && selectComponent.multiple ? '' : null">
                        <button ion-button full no-margin (click)="ok()">
                            OK
                        </button>
                    </ion-col>
                </ion-row>
            </ion-toolbar>
        </ion-footer>
    `,
    host: {
        'class': 'select-searchable-page',
        '[class.select-searchable-page-can-reset]': 'selectComponent.canReset',
        '[class.select-searchable-page-multiple]': 'selectComponent.multiple',
        '[class.select-searchable-page-is-searching]': 'selectComponent.isSearching'
    }
})
export class SelectSearchablePage implements AfterViewInit {
    selectComponent: SelectSearchable;
    filteredItems: any[];
    selectedItems: any[] = [];
    navController: NavController;
    infiniteScroll: InfiniteScroll;
    @ViewChild('searchbarComponent') searchbarComponent: Searchbar;

    constructor(private navParams: NavParams) {
        this.selectComponent = this.navParams.get('selectComponent');
        this.navController = this.navParams.get('navController');
        this.filteredItems = this.selectComponent.items;
        this.filterItems();

        if (this.selectComponent.value) {
            if (this.selectComponent.multiple) {
                this.selectComponent.value.forEach(item => {
                    this.selectedItems.push(item);
                });
            } else {
                this.selectedItems.push(this.selectComponent.value);
            }
        }
    }

    ngAfterViewInit() {
        if (this.searchbarComponent) {
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
        if (this.selectComponent.multiple) {
            if (this.isItemSelected(item)) {
                this.deleteSelectedItem(item);
            } else {
                this.addSelectedItem(item);
            }
        } else {
            if (!this.isItemSelected(item)) {
                this.selectedItems = [];
                this.addSelectedItem(item);
                this.selectComponent.select(item);
            }

            this.close();
        }
    }

    ok() {
        this.selectComponent.select(this.selectedItems);
        this.close();
    }

    close() {
        // Focused input interferes with the animation.
        // Blur it first, wait a bit and then close the page.
        if (this.searchbarComponent) {
            this.searchbarComponent._fireBlur();
        }

        setTimeout(() => {
            this.navController.pop();

            if (!this.selectComponent.hasSearch) {
                this.selectComponent.filterText = '';
            }
        });
    }

    reset() {
        this.navController.pop();
        this.selectComponent.reset();
    }

    filterItems() {
        if (this.selectComponent.hasSearch) {
            // Delegate filtering to the event.
            this.selectComponent.emitSearch(this.infiniteScroll);
        } else {
            let items = [];

            // Default filtering.
            if (!this.selectComponent.filterText || !this.selectComponent.filterText.trim()) {
                items = this.selectComponent.items;
            } else {
                let filterText = this.selectComponent.filterText.trim().toLowerCase();

                items = this.selectComponent.items.filter(item => {
                    return (this.selectComponent.itemTextField ? item[this.selectComponent.itemTextField] : item)
                        .toLowerCase().indexOf(filterText) !== -1;
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
            text: this.selectComponent.filterText
        });
    }
}
