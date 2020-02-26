import { Component, h, Host, ComponentInterface, Element } from '@stencil/core';
import '@ionic/core';
import { generateText } from '../../utils/utils';

/**
 * @internal
 */
@Component({
  tag: 'ionic-selectable-modal',
  styleUrls: {
    ios: 'ionic-selectable.ios.component.scss',
    md: 'ionic-selectable.md.component.scss'
  }
})
export class IonicSelectableModalComponent implements ComponentInterface {
  @Element() element: HTMLIonModalElement;
  selectableComponent: HTMLIonicSelectableElement;

  connectedCallback() {
    const modalElement = document.querySelector('ion-modal');
    this.selectableComponent = modalElement.componentProps.parent;
  }

  private dismiss() {
  }

  public render(): void {
    return (
      <Host>
        <ion-header>
          <ion-toolbar>
            <ion-buttons>
              <ion-button>
                <span>{this.selectableComponent.closeButtonText}</span>
              </ion-button>
            </ion-buttons>
            <ion-title>
              {/* Need span for for text ellipsis. */}
              <span />
            </ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
          {this.selectableComponent.items.map((item) => {
           return (<ion-item>{generateText(item, this.selectableComponent.itemTextField)}</ion-item>);
        })}
          </ion-list>
        </ion-content>
      </Host>
    );
  }
}
