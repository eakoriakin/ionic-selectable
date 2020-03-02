import { Component, h, Host, ComponentInterface, Element, Prop, Method, State } from '@stencil/core';
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

  @State() private toggleUpdate: boolean = false;

  @Method()
  public update(): void {
    this.toggleUpdate = !this.toggleUpdate;
  }

  public connectedCallback(): void {
    const modalElement = document.querySelector('ion-modal');
    this.selectableComponent = modalElement.componentProps.selectableComponent;
  }

  public render(): void {
    return (
      <Host>
        <ion-header>
          <ion-toolbar>
            <ion-title slot="start">{this.selectableComponent.titleText}</ion-title>
            <ion-buttons slot="end">
              <ion-button onClick={this.selectableComponent.closeModal}>
                {this.selectableComponent.closeButtonText}
              </ion-button>
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
                        <ion-item button={true} onClick={() => this.selectableComponent.selectItem(item)}>
                          <ion-label>{this.selectableComponent.getItemText(item)}</ion-label>
                          <ion-icon
                            name={
                              this.selectableComponent.isItemSelected(item) ? 'checkmark-circle' : 'radio-button-off'
                            }
                            size="small"
                            slot="end"
                          />
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
