/**
 * IIonicSelectableEvent
 */
export interface IIonicSelectableEvent {
  /**
   * The value of event.
   */
  value?: any | any[] | string | undefined | null;
  /**
   * The HTMLIonicSelectableElement element.
   */
  component?: HTMLIonicSelectableElement;
  /**
   * If event is selected.
   */
  isSelected?: boolean;
}
