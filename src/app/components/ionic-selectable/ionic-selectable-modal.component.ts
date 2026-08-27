import { CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonRow,
  IonSearchbar,
  IonSpinner,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircle, create, createSharp, radioButtonOff, trash, trashSharp } from 'ionicons/icons';
import { IonicSelectableComponent } from './ionic-selectable.component';

@Component({
  selector: 'ionic-selectable-modal',
  templateUrl: './ionic-selectable-modal.component.html',
  imports: [
    NgTemplateOutlet,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonItem,
    IonItemDivider,
    IonItemGroup,
    IonLabel,
    IonList,
    IonRow,
    IonSearchbar,
    IonSpinner,
    IonTitle,
    IonToolbar
  ]
})
export class IonicSelectableModalComponent implements OnInit, AfterViewInit {
  /**
   * Set by `ModalController` through `componentProps` when the Modal is created.
   */
  selectComponent!: IonicSelectableComponent;

  @ViewChild(IonContent)
  _content: IonContent | undefined;
  _header: HTMLElement | undefined;
  @ViewChild('searchbarComponent')
  _searchbarComponent: IonSearchbar | undefined;
  @ViewChild(IonInfiniteScroll)
  _infiniteScroll: IonInfiniteScroll | undefined;
  @ViewChild(CdkVirtualScrollViewport)
  _virtualScrollViewport: CdkVirtualScrollViewport | undefined;

  @HostBinding('class.ionic-selectable-modal')
  _cssClass = true;
  @HostBinding('class.ionic-selectable-modal-can-clear')
  get _canClearCssClass(): boolean {
    return this.selectComponent.canClear;
  }
  @HostBinding('class.ionic-selectable-modal-is-multiple')
  get _isMultipleCssClass(): boolean {
    return this.selectComponent.isMultiple;
  }
  @HostBinding('class.ionic-selectable-modal-is-searching')
  get _isSearchingCssClass(): boolean | undefined {
    return this.selectComponent._isSearching;
  }
  @HostBinding('class.ionic-selectable-modal-has-virtual-scroll')
  get _hasVirtualScrollCssClass(): boolean {
    return this.selectComponent.hasVirtualScroll;
  }
  @HostBinding('class.ionic-selectable-modal-ios')
  get _isIos(): boolean | undefined {
    return this.selectComponent._isIos;
  }
  @HostBinding('class.ionic-selectable-modal-md')
  get _isMD(): boolean | undefined {
    return this.selectComponent._isMD;
  }
  @HostBinding('class.ionic-selectable-modal-is-add-item-template-visible')
  get _isAddItemTemplateVisibleCssClass(): boolean {
    return this.selectComponent._isAddItemTemplateVisible;
  }
  @HostListener('window:resize')
  onResize() {
    // ion-footer inside the template might change its height when
    // device orientation changes.
    this.selectComponent._positionAddItemTemplate();

    // The viewport caches its size, so it has to be told the size changed.
    this._checkVirtualScrollViewportSize();
  }

  _element = inject(ElementRef);

  ngOnInit() {
    this.selectComponent._modalComponent = this;
    this.selectComponent._selectedItems = [];

    if (!this.selectComponent._isNullOrWhiteSpace(this.selectComponent.value)) {
      if (this.selectComponent.isMultiple) {
        this.selectComponent.value.forEach((item: any) => {
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
        this._searchbarComponent?.setFocus();
      }, 1000);
    }

    // The viewport is measured on creation, at which point the Modal might not
    // have finished its enter animation yet.
    this._checkVirtualScrollViewportSize();
  }

  /**
   * Brings the virtual scroll viewport back to the first item, e.g. after
   * the list has been filtered.
   */
  _scrollVirtualScrollToTop() {
    // Wait for the new items to be rendered.
    setTimeout(() => {
      this._virtualScrollViewport?.scrollToIndex(0);
    });
  }

  _checkVirtualScrollViewportSize() {
    setTimeout(() => {
      this._virtualScrollViewport?.checkViewportSize();
    });
  }

  constructor() {
    addIcons({ checkmarkCircle, radioButtonOff, create, createSharp, trash, trashSharp });
  }
}
