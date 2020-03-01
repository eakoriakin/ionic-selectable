import { Component, h, Host, ComponentInterface, Element, Event, EventEmitter } from '@stencil/core';
import { IonicSelectableComponent } from '../ionic-selectable/ionic-selectable.component';

/**
 * @internal
 */
@Component({
  tag: 'ionic-selectable-modal',
  styleUrls: {
    ios: 'ionic-selectable-modal.ios.component.scss',
    md: 'ionic-selectable-modal.md.component.scss'
  },
  shadow: true
})
export class IonicSelectableModalComponent implements ComponentInterface {
  @Element() private element: HTMLIonModalElement;
  private selectableComponent: IonicSelectableComponent;

  @Event() public selectableModalDismiss!: EventEmitter<void>;

  public connectedCallback(): void {
    const modalElement = document.querySelector('ion-modal');
    this.selectableComponent = modalElement.componentProps.selectableComponent;
  }

  private dismiss = (): void => {
    this.selectableModalDismiss.emit();
  };

  public render(): void {
    return (
      <Host>
        <ion-header>
          <ion-toolbar>
            <ion-title slot="start">{this.selectableComponent.titleText}</ion-title>
            <ion-buttons slot="end">
              <ion-button onClick={this.dismiss}>{this.selectableComponent.closeButtonText}</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          {!this.selectableComponent.hasVirtualScroll && this.selectableComponent.hasFilteredItems && (
            <ion-list>
              {this.selectableComponent.filteredGroups.map((group) => {
                return (
                  <ion-item-group>
                    {this.selectableComponent.hasGroups && (
                      <ion-item-divider>
                        {/* Need ion-label for text ellipsis. */}
                        <ion-label>{group.text}</ion-label>
                      </ion-item-divider>
                    )}
                    {group.items.map((item) => {
                      return (
                        <ion-item>
                          {this.selectableComponent.generateText(item, this.selectableComponent.itemTextField)}
                        </ion-item>
                      );
                    })}
                  </ion-item-group>
                );
              })}
            </ion-list>
          )}
        </ion-content>
      </Host>
    );
  }
}
