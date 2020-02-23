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
import { CssClassMap, getMode, modalController, StyleEventDetail, SelectCompareFn, OverlaySelect } from '@ionic/core';
import { hostContext, addRippleEffectElement, findItem, findItemLabel, renderHiddenInput } from '../../utils/utils';
import { IIonicSelectableEvent } from './ionic-selectable.interfaces.component';
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
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#ismultiple).
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
  @Prop() public items: any[] = [];

  /**
   * Item property to use as a unique identifier, e.g, `'id'`.
   * **Note**: `items` should be an object array.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#itemvaluefield).
   *
   * @default null
   * @memberof IonicSelectableComponent
   */
  @Prop()
  public itemValueField: string = null;

  /**
   * Item property to display, e.g, `'name'`.
   * **Note**: `items` should be an object array.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#itemtextfield).
   *
   * @default false
   * @memberof IonicSelectableComponent
   */
  @Prop()
  public itemTextField: string = null;

  /**
   * Fires when item/s has been selected and Modal closed.
   * See more on [GitHub](https://github.com/eakoriakin/ionic-selectable/wiki/Documentation#onChanged).
   *
   * @memberof IonicSelectableComponent
   */
  @Event() public changed!: EventEmitter<IIonicSelectableEvent>;

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

  @Watch('disabled')
  @Watch('placeholder')
  private disabledChanged() {
    this.emitStyle();
  }

  @Watch('value')
  private valueChanged() {
    this.emitStyle();
    if (this.isInited) {
      this.changed.emit({
        value: this.value
      });
    }
  }

  async connectedCallback() {
    this.emitStyle();
  }

  disconnectedCallback() {
    if (this.mutationO) {
      this.mutationO.disconnect();
      this.mutationO = undefined;
    }
  }

  componentDidLoad() {
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
    return Promise.resolve(this.getText() !== '');
  }

  private getText(): string {
    const selectedText = this.selectedText;
    if (selectedText != null && selectedText !== '') {
      return selectedText;
    }
    return this.generateText(this.itemTextField);
  }

  private generateText(prop: string) {
    if (this.value === undefined) {
      return '';
    }
    if (Array.isArray(this.value)) {
      return this.value
        .map((v) => (prop ? v[prop] : v.toString()))
        .filter((opt) => opt !== null)
        .join(', ');
    } else {
      return prop ? this.value[prop] : this.value.toString();
    }
  }

  private parseValue() {
    return this.generateText(this.itemValueField);
  }

  private async emitStyle() {
    this.ionStyle.emit({
      interactive: true,
      'ionic-selectable': true,
      'has-placeholder': this.placeholder != null,
      'has-value': await this.hasValue(),
      'interactive-disabled': this.isDisabled,
      'ionic-selectable-is-disabled': this.isDisabled
    });
  }

  private onClick = async (ev: UIEvent) => {
    const modal = await modalController.create({
      component: 'ionic-selectable-modal',
      componentProps: { parent: this }
    });
    await modal.present();
  };

  private onFocus = () => {
    this.focused.emit();
  };

  private onBlur = () => {
    this.blurred.emit();
  };

  public render(): void {
    const { placeholder, name, isDisabled, isOpened, element } = this;
    const mode = getMode();
    // Add ripple efect
    addRippleEffectElement(element);

    // Add class ion-activatable
    const item = findItem(element);
    if (item && mode === 'md') {
      item.classList.add('ion-activatable');
    }

    const labelId = this.id + '-lbl';
    const label = findItemLabel(element);
    if (label) {
      label.id = labelId;
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
          'ionic-selectable-is-disabled': isDisabled
        }}
      >
        <div class={selectTextClasses} part="text">
          {selectText}
        </div>
        <div class="ionic-selectable-icon" role="presentation" part="icon">
          <div class="ionic-selectable-icon-inner" />
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
