import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, ViewChild } from '@angular/core';
import { Content, InfiniteScroll, NavParams, Searchbar } from '@ionic/angular';
import { IonicSelectableComponent } from './ionic-selectable.component';

@Component({
  selector: 'ionic-selectable-page',
  templateUrl: './ionic-selectable-page.component.html'
})
export class IonicSelectablePageComponent implements AfterViewInit {
  @ViewChild(Content)
  _content: Content;
  _header: HTMLElement;
  selectComponent: IonicSelectableComponent;
  @ViewChild('searchbarComponent')
  private _searchbarComponent: Searchbar;
  @ViewChild(InfiniteScroll)
  _infiniteScroll: InfiniteScroll;
  @HostBinding('class.ionic-selectable-page')
  private _cssClass = true;
  @HostBinding('class.ionic-selectable-page-can-clear')
  private get _canClearCssClass(): boolean {
    return this.selectComponent.canClear;
  }
  @HostBinding('class.ionic-selectable-page-is-multiple')
  private get _isMultipleCssClass(): boolean {
    return this.selectComponent.isMultiple;
  }
  @HostBinding('class.ionic-selectable-page-is-searching')
  private get _isSearchingCssClass(): boolean {
    return this.selectComponent._isSearching;
  }
  @HostBinding('class.ionic-selectable-page-ios')
  private get _isIos(): boolean {
    return this.selectComponent._isIos;
  }
  @HostBinding('class.ionic-selectable-page-md')
  private _isMD(): boolean {
    return this.selectComponent._isMD;
  }
  @HostBinding('class.ionic-selectable-page-is-add-item-template-visible')
  private get _isAddItemTemplateVisibleCssClass(): boolean {
    return this.selectComponent._isAddItemTemplateVisible;
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    // ion-footer inside the template might change its height when
    // device orientation changes.
    this.selectComponent._positionAddItemTemplate();
  }

  constructor(
    private navParams: NavParams,
    public _element: ElementRef,
  ) {
    this.selectComponent = this.navParams.get('selectComponent');
    this.selectComponent._selectPageComponent = this;
    this.selectComponent._selectedItems = [];

    if (!this.selectComponent._isNullOrWhiteSpace(this.selectComponent.value)) {
      if (this.selectComponent.isMultiple) {
        this.selectComponent.value.forEach(item => {
          this.selectComponent._selectedItems.push(item);
        });
      } else {
        this.selectComponent._selectedItems.push(this.selectComponent.value);
      }
    }

    this._setItemsToConfirm(this.selectComponent._selectedItems);
  }

  ngAfterViewInit() {
    this._header = this._element.nativeElement.querySelector('ion-header');

    if (this._searchbarComponent && this.selectComponent.shouldFocusSearchbar) {
      // Focus after a delay because focus doesn't work without it.
      setTimeout(() => {
        this._searchbarComponent.focus();
      }, 1000);
    }
  }

  private _setItemsToConfirm(items: any[]) {
    // Return a copy of original array, so it couldn't be changed from outside.
    this.selectComponent._itemsToConfirm = [].concat(items);
  }

  _getMoreItems() {
    this.selectComponent.onInfiniteScroll.emit({
      component: this.selectComponent,
      text: this.selectComponent._searchText
    });
  }

  _select(item: any) {
    if (this.selectComponent.isMultiple) {
      if (this.selectComponent._isItemSelected(item)) {
        this.selectComponent._deleteSelectedItem(item);
        this.selectComponent._emitOnSelect(item, false);
      } else {
        this.selectComponent._addSelectedItem(item);
        this.selectComponent._emitOnSelect(item, true);
      }

      this._setItemsToConfirm(this.selectComponent._selectedItems);
    } else {
      if (!this.selectComponent._isItemSelected(item)) {
        this.selectComponent._selectedItems = [];
        this.selectComponent._addSelectedItem(item);

        if (this.selectComponent._shouldStoreItemValue) {
          this.selectComponent._select(this.selectComponent._getItemValue(item));
        } else {
          this.selectComponent._select(item);
        }

        this.selectComponent._emitOnSelect(item, true);
      }

      this._close();
    }
  }

  _ok() {
    this.selectComponent._select(this.selectComponent._selectedItems);
    this._close();
  }

  _close() {
    this.selectComponent.close().then(() => {
      this.selectComponent.onClose.emit({
        component: this.selectComponent
      });
    });

    if (!this.selectComponent._hasOnSearch()) {
      this.selectComponent._searchText = '';
      this.selectComponent._setHasSearchText();
    }
  }

  _clear() {
    this.selectComponent.clear();
    this.selectComponent._emitValueChange();
    this.selectComponent.close().then(() => {
      this.selectComponent.onClose.emit({
        component: this.selectComponent
      });
    });
  }
}
