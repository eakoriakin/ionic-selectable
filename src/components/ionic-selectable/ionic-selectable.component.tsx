import {
  Component,
  Prop,
  h,
  Host,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Watch,
  Method,
  State
} from '@stencil/core';
import '@ionic/core';
import { CssClassMap, getMode, modalController, StyleEventDetail, ModalOptions, AnimationBuilder } from '@ionic/core';
import { hostContext, addRippleEffectElement, findItem, findItemLabel, renderHiddenInput } from '../../utils/utils';
import { IIonicSelectableEvent } from './ionic-selectable.interfaces.component';

/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 *
 * @part placeholder - The text displayed in the select when there is no value.
 * @part text - The displayed value of the select.
 * @part icon - The select icon container.
 * @part icon-inner - The select icon.
 */
@Component({
  tag: 'ionic-selectable',
  styleUrls: {
    ios: 'ionic-selectable.ios.component.scss',
    md: 'ionic-selectable.md.component.scss'
  },
  shadow: true
})
export class IonicSelectableComponent implements ComponentInterface {
  @Element() private element!: HTMLIonicSelectableElement;
  private id = this.element.id ? this.element.id : `ionic-selectable-${nextId++}`;
  private isInited = false;
  private buttonElement?: HTMLButtonElement;
  private mutationO?: MutationObserver;

  private modalComponent!: HTMLIonModalElement;
  private selectableModalComponent!: HTMLIonicSelectableModalElement;

  private groups: Array<{ value: string; text: string; items: any[] }> = [];

  public filteredGroups: Array<{ value: string; text: string; items: any[] }> = [];
  public hasFilteredItems = false;
  public hasObjects = false;
  public hasGroups = false;
  public footerButtonsCount = 0;

  @State() private selectedItems: any | any[] = [];
  @State() private valueItems: any | any[] = [];
  @State() private itemsToConfirm: any[] = [];
  /**
   * Determines whether Modal is opened.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#isopened).
   *
   * @default false
   * @readonly
   * @memberof IonicSelectableComponent
   */
  @Prop() public isOpened = false;

  /**
   * Determines whether the component is disabled.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#isdisabled).
   *
   * @default false
   * @memberof IonicSelectableComponent
   */
  @Prop() public isDisabled = false;

  /**
   * A placeholder.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#placeholder).
   *
   * @default null
   * @memberof IonicSelectableComponent
   */
  @Prop() public placeholder?: string | null;

  /**
   * Close button text.
   * The field is only applicable to **iOS** platform, on **Android** only Cross icon is displayed.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#closebuttontext).
   *
   * @default 'Cancel'
   * @memberof IonicSelectableComponent
   */
  @Prop() public closeButtonText = 'Cancel';

  /**
   * Confirm button text.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#confirmbuttontext).
   *
   * @default 'OK'
   * @memberof IonicSelectableComponent
   */
  @Prop() public confirmButtonText = 'OK';

  /**
   * The name of the control, which is submitted with the form data.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#name).
   *
   * @default null
   * @memberof IonicSelectableComponent
   */
  @Prop() public name: string = this.id;

  /**
   * Determines whether multiple items can be selected.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#selectedText).
   *
   * @default null
   * @memberof IonicSelectableComponent
   */
  @Prop() public selectedText?: string | null;

  /**
   * Determines whether multiple items can be selected.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#ismultiple).
   *
   * @default false
   * @memberof IonicSelectableComponent
   */
  @Prop() public isMultiple = false;

  /**
   * The value of the component.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#value).
   *
   * @default null
   * @memberof IonicSelectableComponent
   */
  @Prop({ mutable: true }) public value?: any | null = null;

  /**
   * Is set to true, the value will be extracted from the itemValueField of the objects.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#shouldStoreItemValue).
   *
   * @default false
   * @memberof IonicSelectableComponent
   */
  @Prop() public shouldStoreItemValue?: boolean = false;

  /**
   * A list of items.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#items).
   *
   * @default []
   * @memberof IonicSelectableComponent
   */
  @Prop({ mutable: true }) public items: any[] = [];

  /**
   * Item property to use as a unique identifier, e.g, `'id'`.
   * **Note**: `items` should be an object array.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#itemvaluefield).
   *
   * @default null
   * @memberof IonicSelectableComponent
   */
  @Prop() public itemValueField: string = null;

  /**
   * Item property to display, e.g, `'name'`.
   * **Note**: `items` should be an object array.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#itemtextfield).
   *
   * @default null
   * @memberof IonicSelectableComponent
   */
  @Prop() public itemTextField: string = null;

  /**
   * Determines whether Modal should be closed when backdrop is clicked.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#shouldbackdropclose).
   *
   * @default true
   * @memberof IonicSelectableComponent
   */
  @Prop() public shouldBackdropClose: boolean;

  /**
   * Modal CSS class.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#modalcssclass).
   *
   * @default null
   * @memberof IonicSelectableComponent
   */
  @Prop() public modalCssClass: string = null;

  /**
   * Modal enter animation.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#modalenteranimation).
   *
   * @default null
   * @memberof IonicSelectableComponent
   */
  @Prop() public modalEnterAnimation: AnimationBuilder = null;

  /**
   * Modal leave animation.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#modalleaveanimation).
   *
   * @default null
   * @memberof IonicSelectableComponent
   */
  @Prop() public modalLeaveAnimation: AnimationBuilder = null;

  /**
   * Text of [Ionic Label](https://ionicframework.com/docs/api/label).
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#label).
   *
   * @readonly
   * @default null
   * @memberof IonicSelectableComponent
   */
  @Prop() public titleText: string = null;

  /**
   *
   * Group property to use as a unique identifier to group items, e.g. `'country.id'`.
   * **Note**: `items` should be an object array.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#groupvaluefield).
   *
   * @default null
   * @memberof IonicSelectableComponent
   */
  @Prop() public groupValueField: string = null;

  /**
   * Group property to display, e.g. `'country.name'`.
   * **Note**: `items` should be an object array.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#grouptextfield).
   *
   * @default null
   * @memberof IonicSelectableComponent
   */
  @Prop() public groupTextField: string = null;

  /**
   * Determines whether Ionic [InfiniteScroll](https://ionicframework.com/docs/api/components/infinite-scroll/InfiniteScroll/) is enabled.
   * **Note**: Infinite scroll cannot be used together with virtual scroll.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#hasinfinitescroll).
   *
   * @default false
   * @memberof IonicSelectableComponent
   */
  @Prop() public hasInfiniteScroll = false;

  /**
   * Determines whether Ionic [VirtualScroll](https://ionicframework.com/docs/api/components/virtual-scroll/VirtualScroll/) is enabled.
   * **Note**: Virtual scroll cannot be used together with infinite scroll.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#hasvirtualscroll).
   *
   * @default false
   * @memberof IonicSelectableComponent
   */
  @Prop() public hasVirtualScroll = false;

  /**
   * Determines whether Confirm button is visible for single selection.
   * By default Confirm button is visible only for multiple selection.
   * **Note**: It is always true for multiple selection and cannot be changed.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#hasconfirmbutton).
   *
   * @default false
   * @memberof IonicSelectableComponent
   */
  @Prop() public hasConfirmButton: boolean = false;

  /**
   * Determines whether to allow adding items.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#canadditem).
   *
   * @default false
   * @memberof IonicSelectableComponent
   */
  @Prop() public canAddItem: boolean = false;

   /**
   * Determines whether to show Clear button.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#canclear).
   *
   * @default false
   * @memberof IonicSelectableComponent
   */
  // Pending - @HostBinding('class.ionic-selectable-can-clear')
  @Prop() public canClear: boolean = false;

    /**
   * Determines whether Confirm button is enabled.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#isconfirmbuttonenabled).
   *
   * @default true
   * @memberof IonicSelectableComponent
   */
  @Prop() public isConfirmButtonEnabled: boolean = true;

  /**
   * Fires when item/s has been selected and Modal closed.
   * if isMultiple is set to true 'value' is an array else is a object
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#onChanged).
   *
   * @memberof IonicSelectableComponent
   */
  @Event() public changed!: EventEmitter<IIonicSelectableEvent>;

  /**
   * Fires when an item has been selected or unselected.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#onselect).
   *
   * @memberof IonicSelectableComponent
   */
  @Event() public selected: EventEmitter<IIonicSelectableEvent>;

  /**
   * Fires when Modal has been opened.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#onopen).
   *
   * @memberof IonicSelectableComponent
   */
  @Event() public opened: EventEmitter<IIonicSelectableEvent>;

  /**
   * Fires when Modal has been closed.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#onclose).
   *
   * @memberof IonicSelectableComponent
   */
  @Event() public closed: EventEmitter<IIonicSelectableEvent>;

  /**
   * Fires when has focus
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#onFocused).
   *
   * @memberof IonicSelectableComponent
   */
  @Event() public focused!: EventEmitter<IIonicSelectableEvent>;

  /**
   * Fires when loses focus.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#onBlurred).
   *
   * @memberof IonicSelectableComponent
   */
  @Event() public blurred!: EventEmitter<IIonicSelectableEvent>;

  /**
   * Emitted when the styles change.
   * @internal
   */
  @Event() public ionStyle!: EventEmitter<StyleEventDetail>;

  @Watch('shouldStoreItemValue')
  public shouldStoreItemValueChanged(value: boolean): void {
    if (!value && !this.hasObjects) {
      throw new Error(
        `If items contains primitive elements, shouldStoreItemValue must be null or true: ${this.element.id}`
      );
    }
  }

  @Watch('itemValueField')
  public itemValueFieldChanged(value: string): void {
    if (this.hasObjects && this.isNullOrWhiteSpace(value)) {
      throw new Error(
        `If items contains object elements, itemValueField must be non null or non whitespace : ${this.element.id}`
      );
    } else if (!this.hasObjects && !this.isNullOrWhiteSpace(value)) {
      throw new Error(`If items contains primitive elements, itemValueField must be null: ${this.element.id}`);
    }
  }

  @Watch('itemTextField')
  public itemTextFieldChanged(value: string): void {
    if (this.hasObjects && this.isNullOrWhiteSpace(value)) {
      throw new Error(
        `If items contains object elements, itemTextField must be non null or non whitespace : ${this.element.id}`
      );
    } else if (!this.hasObjects && !this.isNullOrWhiteSpace(value)) {
      throw new Error(`If items contains primitive elements, itemTextField must be null: ${this.element.id}`);
    }
  }

  @Watch('items')
  public itemsChanged(value: []): void {
    this.setItems(value);
  }

  @Watch('isDisabled')
  @Watch('placeholder')
  public disabledChanged(): void {
    this.emitStyle();
  }

  @Watch('value')
  public valueChanged(newValue: any | any[]): void {
    this.setValue(newValue);
    this.emitStyle();
    if (this.isInited) {
      this.changed.emit({
        value: this.value
      });
    }
  }

  @Watch('isMultiple')
  @Watch('canClear')
  @Watch('canAddItem')
  @Watch('hasConfirmButton')
  public isMultipleChanged(): void {
    this.countFooterButtons();
  }

  public async connectedCallback(): Promise<void> {
    this.emitStyle();
  }

  public disconnectedCallback(): void {
    if (this.mutationO) {
      this.mutationO.disconnect();
      this.mutationO = undefined;
    }
  }

  public componentWillLoad(): void {
    this.setItems(this.items);
    this.setValue(this.value);
    this.countFooterButtons();
    this.isInited = true;
  }

  /**
   * Determines whether any item has been selected.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#hasvalue).
   *
   * @returns A boolean determining whether any item has been selected.
   * @memberof IonicSelectableComponent
   */
  @Method()
  public async hasValue(): Promise<boolean> {
    return this.parseValue() !== '';
  }

  /**
   * Opens Modal.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#open).
   *
   * @returns Promise that resolves when Modal has been opened.
   * @memberof IonicSelectableComponent
   */
  @Method()
  public async open(): Promise<void> {
    if (this.isDisabled || this.isOpened) {
      return Promise.reject(`IonicSelectable is disabled or already opened: ${this.element.id}`);
    }

    const label = findItemLabel(this.element);
    if (label && !this.titleText) {
      this.titleText = label.textContent;
    }

    const modalOptions: ModalOptions = {
      component: 'ionic-selectable-modal',
      componentProps: { selectableComponent: this },
      backdropDismiss: this.shouldBackdropClose
    };

    if (this.modalCssClass) {
      modalOptions.cssClass = this.modalCssClass;
    }

    if (this.modalEnterAnimation) {
      modalOptions.enterAnimation = this.modalEnterAnimation;
    }

    if (this.modalLeaveAnimation) {
      modalOptions.leaveAnimation = this.modalLeaveAnimation;
    }

    this.modalComponent = await modalController.create(modalOptions);
    await this.modalComponent.present();
    this.selectableModalComponent = this.modalComponent.querySelector('ionic-selectable-modal');
    // Pending - self._filterItems();
    this.isOpened = true;
    this.setFocus();
    this.whatchModalEvents();
    this.emitOnOpened();
    return Promise.resolve();
  }

  /**
   * Closes Modal.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#close).
   *
   * @returns Promise that resolves when Modal has been closed.
   * @memberof IonicSelectableComponent
   */
  @Method()
  public async close(): Promise<void> {
    if (this.isDisabled || !this.isOpened) {
      return Promise.reject(`IonicSelectable is disabled or already closed: ${this.element.id}`);
    }

    await this.modalComponent.dismiss();
    // Pending - self._itemToAdd = null;
    // Pending - self.hideAddItemTemplate();
    /*
    if (!this._hasOnSearch()) {
      this._searchText = '';
      this._setHasSearchText();
    }*/

    this.emitOnClosed();

    return Promise.resolve();
  }

  /**
   * Return a list of items that are selected and awaiting confirmation by user, when he has clicked Confirm button.
   * After the user has clicked Confirm button items to confirm are cleared.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#itemstoconfirm).
   *
   * @returns a promise whit de list of items that are selected and awaiting confirmation by user
   * @memberof IonicSelectableComponent
   */
  @Method()
  public async getItemsToConfirm(): Promise<any[]> {
    return this.itemsToConfirm;
  }

   /**
   * Confirms selected items by updating value.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#confirm).
   *
   * @memberof IonicSelectableComponent
   */
  @Method()
  public confirm() {
    if (this.isMultiple) {
      this.setValue(this.selectedItems);
    } else if (this.hasConfirmButton /* || this.footerTemplate */) {
      this.setValue(this.selectedItems[0] || null);
    }
  }

  public async closeModal(): Promise<void> {
    await this.close();
  }

  public isItemSelected = (item: any): boolean => {
    return this.generateText(this.selectedItems, item, this.itemValueField) !== '';
  };

  public selectItem(item: any) {
    const isItemSelected = this.isItemSelected(item);
    if (this.isMultiple) {
      if (isItemSelected) {
        this.deleteSelectedItem(item);
      } else {
        this.addSelectedItem(item);
      }

      this.itemsToConfirm = [...this.selectedItems];

      // Emit onSelect event after setting items to confirm so they could be used inside the event.
      this.emitOnSelected(item, !isItemSelected);
    } else {
      if (this.hasConfirmButton /* || this.footerTemplate*/) {
        // Don't close Modal and keep track on items to confirm.
        // When footer template is used it's up to developer to close Modal.
        this.selectedItems = [];

        if (isItemSelected) {
          this.deleteSelectedItem(item);
        } else {
          this.addSelectedItem(item);
        }

        this.itemsToConfirm = [...this.selectedItems];

        // Emit onSelect event after setting items to confirm so they could be used inside the event.
        this.emitOnSelected(item, !isItemSelected);
      } else {
        const isItemValue = this.isItemValue(item);
        if (!isItemValue) {
          this.selectedItems = [];
          this.addSelectedItem(item);

          // Emit onSelect before onChange.
          this.emitOnSelected(item, true);

          this.setValue(item);
        }

        this.close();
      }
    }
  }

  public confirmSelection(): void {
    this.confirm();
    this.close();
  }

  private setValue(value: any | any[]): void {
    if (value) {
      // If type is string convert to object
      value = typeof value === 'string' ? JSON.parse((value as string).replace(/\'/gi, '"')) : value;
      const isArray = Array.isArray(value);
      if (!isArray) {
        value = [value];
      }

      if (this.isMultiple && !isArray) {
        throw new Error(`If isMultiple is set to true, value must be array: ${this.element.id}`);
      }
      if (!this.isMultiple && isArray) {
        throw new Error(`If isMultiple is set to false, value must be object: ${this.element.id}`);
      }
      this.valueItems = [];
      (value as []).forEach((val) => {
        if (this.shouldStoreItemValue && typeof val === 'object') {
          throw new Error(`If shouldStoreItemValue is set to true, value must be primitive: ${this.element.id}`);
        } else if (!this.shouldStoreItemValue && typeof val !== 'object') {
          throw new Error(`If shouldStoreItemValue is set to false, value must be object: ${this.element.id}`);
        }
        const key = typeof val === 'object' ? val[this.itemValueField] : val;
        this.valueItems.push(
          this.getItemValue(
            this.hasObjects
              ? this.items.find((item) => item[this.itemValueField] === key)
              : this.items.find((item) => item === key)
          )
        );
      });
      if (!this.isMultiple) {
        this.valueItems = (this.valueItems as []).pop();
        this.selectedItems = [this.valueItems];
      } else {
        this.selectedItems = [...this.valueItems];
      }
      this.emitOnChanged();
    }
  }

  private setItems(items: any[]): void {
    if (!Array.isArray(items)) {
      throw new Error(`items must be array: ${this.element.id}`);
    }

    this.items.forEach((item) => {
      if (typeof item === 'object') {
        this.hasObjects = true;
      }
    });

    // If items contains primitive elements, isValuePrimitive is set to true
    if (!this.hasObjects) {
      this.shouldStoreItemValue = true;
    }

    this.itemValueFieldChanged(this.itemValueField);
    this.itemTextFieldChanged(this.itemTextField);
    this.shouldStoreItemValueChanged(this.shouldStoreItemValue);

    // Grouping is supported for objects only.
    // Ionic VirtualScroll has it's own implementation of grouping.
    this.hasGroups = Boolean(
      this.hasObjects && (this.groupValueField || this.groupTextField) && !this.hasVirtualScroll
    );

    /* It's important to have an empty starting group with empty items (groups[0].items),
     * because we bind to it when using VirtualScroll.
     * See https://github.com/eakoriakin/ionic-selectable/issues/70.
     */
    let groups: any[] = [
      {
        items: items || []
      }
    ];
    if (items && items.length) {
      if (this.hasGroups) {
        groups = [];

        items.forEach((item) => {
          const groupValue = this.generateText(this.items, item, this.groupValueField || this.groupTextField);
          const group = groups.find((_group) => _group.value === groupValue);

          if (group) {
            group.items.push(item);
          } else {
            groups.push({
              value: groupValue,
              text: this.generateText(this.items, item, this.groupTextField),
              items: [item]
            });
          }
        });
      }
    }
    this.groups = groups;
    this.filteredGroups = this.groups;
    this.hasFilteredItems = !this.areGroupsEmpty(this.filteredGroups);
  }

  private isItemValue(item: any): boolean {
    return this.generateText([this.valueItems], item, this.itemValueField) !== '';
  }

  private addSelectedItem(item: any): void {
    this.selectedItems.push(this.getItemValue(item));
    this.selectableModalComponent.update();
  }

  private deleteSelectedItem(item: any) {
    let itemToDeleteIndex;

    this.selectedItems.forEach((selectedItem, itemIndex) => {
      if (
        this.generateText(this.selectedItems, item, this.itemValueField) ===
        this.generateText(this.selectedItems, selectedItem, this.itemValueField)
      ) {
        itemToDeleteIndex = itemIndex;
      }
    });
    this.selectedItems.splice(itemToDeleteIndex, 1);
    this.selectableModalComponent.update();
  }

  private getItemValue(item: any): any {
    if (!this.hasObjects) {
      return item;
    }
    return this.shouldStoreItemValue ? item[this.itemValueField] : item;
  }

  private emitOnSelected(item: any, isSelected: boolean) {
    this.selected.emit({
      component: this.element,
      value: item,
      isSelected: isSelected
    });
  }

  private emitOnChanged() {
    this.changed.emit({
      component: this.element,
      value: this.valueItems
    });
  }

  private emitOnOpened() {
    this.opened.emit({ component: this.element });
  }

  private emitOnClosed() {
    this.closed.emit({ component: this.element });
  }

  private isNullOrWhiteSpace(value: any): boolean {
    if (value === null || value === undefined) {
      return true;
    }

    // Convert value to string in case if it's not.
    return value.toString().replace(/\s/g, '').length < 1;
  }

  private countFooterButtons(): void {
    let footerButtonsCount = 0;

    if (this.canClear) {
      footerButtonsCount++;
    }

    if (this.isMultiple || this.hasConfirmButton) {
      footerButtonsCount++;
    }

    if (this.canAddItem) {
      footerButtonsCount++;
    }

    this.footerButtonsCount = footerButtonsCount;
    this.selectableModalComponent?.update();
  }

  private areGroupsEmpty(groups: any[]): boolean {
    return (
      groups.length === 0 ||
      groups.every((group) => {
        return !group.items || group.items.length === 0;
      })
    );
  }

  private getText(): string {
    const selectedText = this.selectedText;
    if (selectedText != null && selectedText !== '') {
      return selectedText;
    }
    return this.generateText(this.items, this.valueItems, this.itemTextField);
  }

  public getItemText(item: any): string {
    return this.generateText(this.items, item, this.itemTextField);
  }

  private parseValue(): any {
    return JSON.stringify(this.valueItems);
  }

  private generateText(items: any[], value: any | any[], property: string): string {
    if (value === undefined) {
      return '';
    }
    let hasObjects = false;
    items.forEach((item) => {
      if (typeof item === 'object') {
        hasObjects = true;
      }
    });
    if (Array.isArray(value)) {
      return value
        .map((val) => {
          const key = typeof val === 'object' ? val[this.itemValueField] : val;
          if (hasObjects) {
            const findItem = items.find((item) => item[this.itemValueField] === key);
            if (findItem) {
              return property
                ? property.split('.').reduce((v, prop) => {
                    return v ? v[prop] : null;
                  }, findItem)
                : val.toString();
            } else {
              return '';
            }
          } else {
            const findItem = items.find((item) => item === key);
            return findItem ? findItem.toString() : '';
          }
        })
        .filter((opt) => opt !== null)
        .join(', ');
    } else {
      const key = typeof value === 'object' ? value[this.itemValueField] : value;
      if (hasObjects) {
        const findItem = items.find((item) => item[this.itemValueField] === key);
        if (findItem) {
          return property
            ? property.split('.').reduce((v, prop) => {
                return v ? v[prop] : null;
              }, findItem)
            : value.toString();
        } else {
          return '';
        }
      } else {
        const findItem = items.find((item) => item === key);
        return findItem ? findItem.toString() : '';
      }
    }
  }

  private async emitStyle(): Promise<void> {
    this.ionStyle.emit({
      interactive: true,
      'ionic-selectable': true,
      'has-placeholder': this.placeholder != null,
      'has-value': await this.hasValue(),
      'interactive-disabled': this.isDisabled,
      'ionic-selectable-is-disabled': this.isDisabled
    });
  }

  private setFocus(): void {
    if (this.buttonElement) {
      this.buttonElement.focus();
    }
  }

  private onClick = async (event: UIEvent): Promise<void> => {
    this.setFocus();
    this.open();
  };

  private whatchModalEvents(): void {
    this.modalComponent.onDidDismiss().then((event) => {
      this.isOpened = false;
      this.setFocus();
      this.itemsToConfirm = [];

      // Closed by clicking on backdrop outside modal.
      if (event.role === 'backdrop') {
        this.closed.emit({
          component: this.element
        });
      }
    });
  }

  private onFocus = (): void => {
    this.focused.emit();
  };

  private onBlur = (): void => {
    this.blurred.emit();
  };

  public render(): void {
    const { placeholder, name, isDisabled, isOpened, isMultiple, element } = this;
    const mode = getMode();
    // Add ripple efect
    if (mode === 'md') {
      addRippleEffectElement(element);
    }

    const item = findItem(element);
    if (item) {
      item.classList.add('ion-activatable');
      if (isOpened) {
        item.classList.add('item-has-focus');
      } else {
        item.classList.remove('item-has-focus');
      }
    }

    const labelId = this.id + '-lbl';
    let labelPosition = 'item-label-default';
    const label = findItemLabel(element);
    if (label) {
      label.id = labelId;
      labelPosition = `item-label-${label.getAttribute('position') ? label.getAttribute('position') : 'default'}`;
    }
    let addPlaceholderClass = false;
    let selectText = this.getText();
    if (selectText === '' && placeholder != null) {
      selectText = placeholder;
      addPlaceholderClass = true;
    }

    renderHiddenInput(true, element, name, this.parseValue(), isDisabled);

    const selectTextClasses: CssClassMap = {
      'ionic-selectable-text': true,
      'ionic-selectable-placeholder': addPlaceholderClass
    };

    const textPart = addPlaceholderClass ? 'placeholder' : 'text';

    return (
      <Host
        id={this.id}
        onClick={this.onClick}
        role="combobox"
        aria-haspopup="dialog"
        aria-disabled={isDisabled ? 'true' : null}
        aria-expanded={`${isOpened}`}
        aria-labelledby={labelId}
        class={{
          [mode]: true,
          'in-item': hostContext('ion-item', element),
          [labelPosition]: true,
          'item-multiple-inputs': isMultiple,
          'ionic-selectable-is-disabled': isDisabled
        }}
      >
        <div class={selectTextClasses} part={textPart}>
          {selectText}
        </div>
        <div class="ionic-selectable-icon" role="presentation" part="icon">
          <div class="ionic-selectable-icon-inner" part="icon-inner" />
        </div>
        <button
          type="button"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          disabled={isDisabled}
          ref={(buttonElement) => (this.buttonElement = buttonElement)}
        />
      </Host>
    );
  }
}
let nextId = 0;
