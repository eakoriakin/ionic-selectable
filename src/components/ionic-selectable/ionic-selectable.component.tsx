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
  Method
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
  private id = `ionic-selectable-${nextId++}`;
  private isInited = false;
  private buttonElement?: HTMLButtonElement;
  private mutationO?: MutationObserver;
  private valueItems: any[] = [];

  @Element() private element!: HTMLIonicSelectableElement;
  private modalComponent!: HTMLIonModalElement;
  private selectableModalComponent!: HTMLIonicSelectableModalElement;

  private groups: Array<{value: string, text: string, items: any[]}> = [];
  public filteredGroups: Array<{value: string, text: string, items: any[]}> = [];
  public hasFilteredItems = false;
  public hasObjects = false;
  public hasGroups = false;

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
   * the value of the select.
   */
  /**
   * The value of the component.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#value).
   *
   * @default false
   * @memberof IonicSelectableComponent
   */
  @Prop({ mutable: true }) public value?: any | null;

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
   * Fires when item/s has been selected and Modal closed.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#onChanged).
   *
   * @memberof IonicSelectableComponent
   */
  @Event() public changed!: EventEmitter<IIonicSelectableEvent>;

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

  @Watch('items')
  public itemsChanged(newValue: [], oldValue: []): void {
    this.setItems(newValue);
  }

  @Watch('disabled')
  @Watch('placeholder')
  public disabledChanged(): void {
    this.emitStyle();
  }

  @Watch('value')
  public valueChanged(): void {
    this.emitStyle();
    if (this.isInited) {
      this.changed.emit({
        value: this.value
      });
    }
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

  public componentDidLoad(): void {
    this.hasObjects = !this.isNullOrWhiteSpace(this.itemValueField);
    // Grouping is supported for objects only.
    // Ionic VirtualScroll has it's own implementation of grouping.
    this.hasGroups = Boolean(
      this.hasObjects && (this.groupValueField || this.groupTextField) && !this.hasVirtualScroll
    );
    this.setItems(this.items);
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
    return Promise.resolve(this.parseValue() !== '');
  }

  /**
   * Opens Modal.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#open).
   *
   * @returns Promise that resolves when Modal has been opened.
   * @memberof IonicSelectableComponent
   */
  public async open(): Promise<void> {
    if (this.isDisabled || this.isOpened) {
      return Promise.reject('IonicSelectable is disabled or already opened.');
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
    this.opened.emit({ component: this.element });
    return Promise.resolve();
  }

  /**
   * Closes Modal.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#close).
   *
   * @returns Promise that resolves when Modal has been closed.
   * @memberof IonicSelectableComponent
   */
  public async close(): Promise<void> {
    if (this.isDisabled || !this.isOpened) {
      return Promise.reject('IonicSelectable is disabled or already closed.');
    }

    await this.modalComponent.dismiss();
    // Pending - self._itemToAdd = null;
    // Pending - self.hideAddItemTemplate();
    /*
    if (!this._hasOnSearch()) {
      this._searchText = '';
      this._setHasSearchText();
    }*/

    this.closed.emit({ component: this.element });

    return Promise.resolve();
  }

  private setItems(items: any[]) {
    // It's important to have an empty starting group with empty items (groups[0].items),
    // because we bind to it when using VirtualScroll.
    // See https://github.com/eakoriakin/ionic-selectable/issues/70.
    let groups: any[] = [
      {
        items: items || []
      }
    ];
    if (items && items.length) {
      if (this.hasGroups) {
        groups = [];

        items.forEach((item) => {
          const groupValue = this.generateText(item, this.groupValueField || this.groupTextField),
            group = groups.find((_group) => _group.value === groupValue);

          if (group) {
            group.items.push(item);
          } else {
            groups.push({
              value: groupValue,
              text: this.generateText(item, this.groupTextField),
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

  private isNullOrWhiteSpace(value: any): boolean {
    if (value === null || value === undefined) {
      return true;
    }

    // Convert value to string in case if it's not.
    return value.toString().replace(/\s/g, '').length < 1;
  }

  private areGroupsEmpty(groups: any[]) {
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
    return this.generateText(this.value, this.itemTextField);
  }

  private parseValue(): any {
    return this.generateText(this.value, this.itemValueField);
  }

  public generateText(value: any | any[], property: string): string {
    if (value === undefined) {
      return '';
    }
    if (Array.isArray(value)) {
      return value
        .map((val) =>
          property
            ? property.split('.').reduce((v, prop) => {
                return v ? v[prop] : null;
              }, val)
            : value.toString()
        )
        .filter((opt) => opt !== null)
        .join(', ');
    } else {
      return property
        ? property.split('.').reduce((v, prop) => {
            return v ? v[prop] : null;
          }, value)
        : value.toString();
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
    this.modalComponent.addEventListener('selectableModalDismiss', (event) => {
      this.close();
    });

    this.modalComponent.onDidDismiss().then((event) => {
      this.isOpened = false;
      this.setFocus();
      // Pending - self._itemsToConfirm = [];

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
