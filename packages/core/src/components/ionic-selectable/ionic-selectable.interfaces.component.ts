export abstract class IonicSelectableEvent<TItem> {
  /**
   * Value.
   */
  public readonly value: TItem | TItem[] | string | undefined | null;

  /**
   * Component.
   */
  public readonly component: HTMLIonicSelectableElement;

  public constructor(value: TItem | TItem[] | string | undefined | null, component: HTMLIonicSelectableElement) {
    this.value = value;
    this.component = component;
  }
}

export class IonicSelectableInfiniteScrolledEvent<TItem> extends IonicSelectableEvent<TItem> {}

export class IonicSelectableSearchingEvent<TItem> extends IonicSelectableEvent<TItem> {}

export class IonicSelectableSearchFailedEvent<TItem> extends IonicSelectableEvent<TItem> {}

export class IonicSelectableSearchSuccessedEvent<TItem> extends IonicSelectableEvent<TItem> {}

export class IonicSelectableItemAddingEvent<TItem> extends IonicSelectableEvent<TItem> {}

export class IonicSelectableClearedEvent<TItem> extends IonicSelectableEvent<TItem> {}

export class IonicSelectableChangedEvent<TItem> extends IonicSelectableEvent<TItem> {}

export class IonicSelectableItemsChangedEvent<TItem> extends IonicSelectableEvent<TItem> {}

export class IonicSelectableSelectedEvent<TItem> extends IonicSelectableEvent<TItem> {
  /**
   * If event is selected.
   */
  public readonly isSelected?: boolean;

  public constructor(
    value: TItem | TItem[] | string | undefined | null,
    isSelected: boolean,
    component: HTMLIonicSelectableElement
  ) {
    super(value, component);
    this.isSelected = isSelected;
  }
}

export class IonicSelectableClosedEvent<TItem> extends IonicSelectableEvent<TItem> {}

export class IonicSelectableOpenedEvent<TItem> extends IonicSelectableEvent<TItem> {}

export class IonicSelectableFocusedEvent<TItem> extends IonicSelectableEvent<TItem> {}

export class IonicSelectableBlurredEvent<TItem> extends IonicSelectableEvent<TItem> {}

export type TemplateType =
  | 'addItem'
  | 'closeButton'
  | 'footer'
  | 'group'
  | 'groupEnd'
  | 'header'
  | 'icon'
  | 'item'
  | 'itemEnd'
  | 'itemIcon'
  | 'message'
  | 'searchFail'
  | 'title'
  | 'value';
export interface ITemplate {
  type: TemplateType;
  value?: any[] | any | string | undefined | null;
  isItemSelected?: boolean | undefined | null;
  isItemDisabled?: boolean | undefined | null;
  isAdd?: boolean | undefined | null;
}

export type TemplateRenderFn = (element: HTMLElement | undefined | null, template: ITemplate) => void;

export type HasTemplateRenderFn = (type: TemplateType) => boolean;
