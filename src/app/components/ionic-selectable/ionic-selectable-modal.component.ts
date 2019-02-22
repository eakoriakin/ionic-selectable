import { AfterViewInit, Component, ElementRef, HostBinding, ViewChild } from '@angular/core';
import { Content, NavParams, Searchbar } from 'ionic-angular';
import { IonicSelectableComponent } from './ionic-selectable.component';

@Component({
  selector: 'ionic-selectable-modal',
  templateUrl: './ionic-selectable-modal.component.html'
})
export class IonicSelectableModalComponent implements AfterViewInit {
  @HostBinding('class.ionic-selectable-modal')
  private _cssClass = true;
  @HostBinding('class.ionic-selectable-modal-can-clear')
  private get _canClearCssClass(): boolean {
    return this.selectComponent.canClear;
  }
  @HostBinding('class.ionic-selectable-modal-is-multiple')
  private get _isMultipleCssClass(): boolean {
    return this.selectComponent.isMultiple;
  }
  @HostBinding('class.ionic-selectable-modal-is-searching')
  private get _isSearchingCssClass(): boolean {
    return this.selectComponent._isSearching;
  }
  @HostBinding('class.ionic-selectable-modal-is-add-item-template-visible')
  private get _isAddItemTemplateVisibleCssClass(): boolean {
    return this.selectComponent._isAddItemTemplateVisible;
  }
  @HostBinding('class.ionic-selectable-modal-ios')
  private get _isIos(): boolean {
    return this.selectComponent._isIos;
  }
  @HostBinding('class.ionic-selectable-modal-md')
  private _isMD(): boolean {
    return this.selectComponent._isMD;
  }
  @ViewChild('searchbarComponent')
  _searchbarComponent: Searchbar;
  @ViewChild(Content)
  _content: Content;
  selectComponent: IonicSelectableComponent;
  _header: HTMLElement;

  constructor(
    private navParams: NavParams,
    public _element: ElementRef,
  ) {
    this.selectComponent = this.navParams.get('selectComponent');
    this.selectComponent._modalComponent = this;
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

    this.selectComponent._setItemsToConfirm(this.selectComponent._selectedItems);
  }

  ngAfterViewInit() {
    this._header = this._element.nativeElement.querySelector('ion-header');
    if (this._searchbarComponent && this.selectComponent.focusSearchbar) {
      // Focus after a delay because focus doesn't work without it.
      setTimeout(() => {
        this._searchbarComponent.setFocus();
      }, 1000);
    }
  }
}
