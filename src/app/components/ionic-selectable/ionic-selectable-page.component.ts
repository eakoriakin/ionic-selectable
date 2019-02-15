import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, ViewChild } from '@angular/core';
import { IonContent, IonInfiniteScroll, IonSearchbar, NavParams } from '@ionic/angular';
import { IonicSelectableComponent } from './ionic-selectable.component';

@Component({
  selector: 'ionic-selectable-page',
  templateUrl: './ionic-selectable-page.component.html'
})
export class IonicSelectablePageComponent implements AfterViewInit {
  @ViewChild(IonContent)
  _content: IonContent;
  _header: HTMLElement;
  selectComponent: IonicSelectableComponent;
  @ViewChild('searchbarComponent')
  private _searchbarComponent: IonSearchbar;
  @ViewChild(IonInfiniteScroll)
  _infiniteScroll: IonInfiniteScroll;
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

    this.selectComponent._setItemsToConfirm(this.selectComponent._selectedItems);
  }

  ngAfterViewInit() {
    this._header = this._element.nativeElement.querySelector('ion-header');

    if (this._searchbarComponent && this.selectComponent.shouldFocusSearchbar) {
      // Focus after a delay because focus doesn't work without it.
      setTimeout(() => {
        this._searchbarComponent.setFocus();
      }, 1000);
    }
  }
}
