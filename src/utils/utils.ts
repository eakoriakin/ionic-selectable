export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export const findItemLabel = (componentEl: HTMLElement) => {
  const itemEl = componentEl.closest('ion-item');
  if (itemEl) {
    return itemEl.querySelector('ion-label');
  }
  return null;
};

export const findItem = (componentEl: HTMLElement) => {
  const itemEl = componentEl.closest('ion-item');
  return itemEl;
};

export const addRippleEffectElement = (componentEl: HTMLElement) => {
  const itemEl = componentEl.closest('ion-item');
  const itemNative = itemEl.shadowRoot.querySelector('div.item-native');
  if (itemNative) {
    const ionRipple = itemNative.ownerDocument!.createElement('ion-ripple-effect');
    itemNative.appendChild(ionRipple);
  }
  console.log(itemNative);
};

export const hostContext = (selector: string, el: HTMLElement): boolean => {
  return el.closest(selector) !== null;
};

export const renderHiddenInput = (
  always: boolean,
  container: HTMLElement,
  name: string,
  value: string | undefined | null,
  disabled: boolean
) => {
  if (always || hasShadowDom(container)) {
    let input = container.querySelector('input.aux-input') as HTMLInputElement | null;
    if (!input) {
      input = container.ownerDocument!.createElement('input');
      input.type = 'hidden';
      input.classList.add('aux-input');
      container.appendChild(input);
    }
    input.disabled = disabled;
    input.name = name;
    input.value = value || '';
  }
};

export const hasShadowDom = (el: HTMLElement) => {
  return !!el.shadowRoot && !!(el as any).attachShadow;
};
