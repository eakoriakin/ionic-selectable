export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export const findItemLabel = (componentElement: HTMLElement) => {
  const itemElement = componentElement.closest('ion-item');
  if (itemElement) {
    return itemElement.querySelector('ion-label');
  }
  return null;
};

export const findItem = (componentEl: HTMLElement) => {
  const itemEl = componentEl.closest('ion-item');
  return itemEl;
};

export const addRippleEffectElement = (componentElement: HTMLElement) => {
  const itemElement = componentElement.closest('ion-item');
  const itemNative = itemElement.shadowRoot.querySelector('div.item-native');
  if (itemNative) {
    const ionRipple = itemNative.ownerDocument!.createElement('ion-ripple-effect');
    itemNative.appendChild(ionRipple);
  }
};

export const hostContext = (selector: string, element: HTMLElement): boolean => {
  return element.closest(selector) !== null;
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

export const hasShadowDom = (element: HTMLElement) => {
  return !!element.shadowRoot && !!(element as any).attachShadow;
};

export const generateText = (value: any | any[], prop: string) => {
  console.log(prop);
  if (value === undefined) {
    return '';
  }
  if (Array.isArray(value)) {
    return value
      .map((v) => (prop ? v[prop] : v.toString()))
      .filter((opt) => opt !== null)
      .join(', ');
  } else {
    return prop ? value[prop] : value.toString();
  }
};
