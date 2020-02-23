import { Component, h, Host, ComponentInterface } from '@stencil/core';
import '@ionic/core';
import { IonicSelectableComponent } from './ionic-selectable.component';

@Component({
  tag: 'ionic-selectable-modal',
  styleUrls: {
    ios: 'ionic-selectable.ios.component.scss',
    md: 'ionic-selectable.md.component.scss'
  },
  shadow: true
})
export class IonicSelectableModalComponent implements ComponentInterface {
  parentEl: IonicSelectableComponent;

  connectedCallback() {
    const modalElement = document.querySelector('ion-modal');
    this.parentEl = modalElement.componentProps.parent;
  }

  public render(): void {
    return (
      <Host>
        <ion-header>
          <ion-toolbar>
            <ion-buttons>
              <ion-button>
                <span>{this.parentEl.cancelText}</span>
              </ion-button>
            </ion-buttons>
            <ion-title>
              {/* Need span for for text ellipsis. */}
              <span />
            </ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content />
      </Host>
    );
  }
}
