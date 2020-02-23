import {
  Component,
  Prop,
  h,
  Host,
  ComponentInterface,
  State,
  Element,
  FunctionalComponent,
  Event,
  EventEmitter,
  Watch,
  Method
} from '@stencil/core';
import '@ionic/core';
import {
  CssClassMap,
  getMode,
  modalController,
  StyleEventDetail,
  SelectCompareFn,
  OverlaySelect,
  AnimationBuilder
} from '@ionic/core';
import { hostContext, addRippleEffectElement, findItem, findItemLabel, renderHiddenInput } from '../../utils/utils';

export interface IonicSelectableChangeEventDetail {
  value: any | any[] | undefined | null;
}
@Component({
  tag: 'ionic-selectable',
  styleUrls: {
    ios: 'ionic-selectable.ios.component.scss',
    md: 'ionic-selectable.md.component.scss'
  },
  shadow: true
})
export class IonicSelectableComponent implements ComponentInterface {
  private inputId = `ionic-selectable-${selectIds++}`;
  private overlay?: OverlaySelect;
  private didInit = false;
  private buttonEl?: HTMLButtonElement;
  private mutationO?: MutationObserver;
  private valueItems: any[] = [];

  @Element() private el!: HTMLIonicSelectableElement;

  @State() public isExpanded = false;

  /**
   * If `true`, the user cannot interact with the select.
   */
  @Prop() public isDisabled = false;

   /**
   * The text to display when the select is empty.
   */
  @Prop() placeholder?: string | null;

  /**
   * The text to display on the cancel button.
   */
  @Prop() public cancelText = 'Cancel';

  /**
   * The text to display on the ok button.
   */
  @Prop() public okText = 'OK';

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() public name: string = this.inputId;

  /**
   * The text to display instead of the selected option's value.
   */
  @Prop() public selectedText?: string | null;

  /**
   * If `true`, the select can accept multiple values.
   */
  @Prop() public isMultiple = false;

  /**
   * A property name or function used to compare object values
   */
  @Prop() public compareWith?: string | SelectCompareFn | null;

  /**
   * the value of the select.
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
   * Emitted when the value has changed.
   */
  @Event() public changed!: EventEmitter<IonicSelectableChangeEventDetail>;

  /**
   * Emitted when the selection is cancelled.
   */
  @Event() public canceled!: EventEmitter<void>;

  /**
   * Emitted when the select has focus.
   */
  @Event() public focused!: EventEmitter<void>;

  /**
   * Emitted when the select loses focus.
   */
  @Event() public blurred!: EventEmitter<void>;

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
    if (this.didInit) {
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
    this.didInit = true;
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
      'ionic-selectable-disabled': this.isDisabled
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
    const { placeholder, name, isDisabled, isExpanded, el } = this;
    const mode = getMode();
    // Add ripple efect
    addRippleEffectElement(el);

    // Add class ion-activatable
    const item = findItem(el);
    if (item && mode === 'md') {
      item.classList.add('ion-activatable');
    }

    const labelId = this.inputId + '-lbl';
    const label = findItemLabel(el);
    if (label) {
      label.id = labelId;
    }
    let addPlaceholderClass = false;
    let selectText = this.getText();
    if (selectText === '' && placeholder != null) {
      selectText = placeholder;
      addPlaceholderClass = true;
    }

    renderHiddenInput(true, el, name, this.parseValue(), isDisabled);

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
        aria-expanded={`${isExpanded}`}
        aria-labelledby={labelId}
        class={{
          [mode]: true,
          'in-item': hostContext('ion-item', el),
          'ionic-selectable-disabled': isDisabled
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
          ref={(btnEl) => (this.buttonEl = btnEl)}
        />
      </Host>
    );
  }
}
let selectIds = 0;
