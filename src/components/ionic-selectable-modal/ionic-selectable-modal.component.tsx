import { Component, h, Host, ComponentInterface, Method, State } from '@stencil/core';
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
  scoped: true
})
export class IonicSelectableModalComponent implements ComponentInterface {
  private selectableComponent: IonicSelectableComponent;

  @State() private toggleUpdate: boolean = false;

  /**
   * Rerender the component
   */
  @Method()
  public async update(): Promise<void> {
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
              <ion-button onClick={(): void => this.selectableComponent.closeModal()}>
                {this.selectableComponent.closeButtonText}
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
          {this.selectableComponent.canSearch /* || selectComponent.messageTemplate */ && (
            <ion-toolbar>
              <ion-searchbar
                value={this.selectableComponent.searchText}
                placeholder={this.selectableComponent.searchPlaceholder}
                debounce={this.selectableComponent.searchDebounce}
                cancelButtonIcon={this.selectableComponent.searchCancelButtonIcon}
                cancelButtonText={this.selectableComponent.searchCancelButtonText}
                clearIcon={this.selectableComponent.searchClearIcon}
                inputmode={this.selectableComponent.searchInputmode}
                searchIcon={this.selectableComponent.searchIcon}
                showCancelButton={this.selectableComponent.searchShowCancelButton}
                onIonChange={(event): void => this.selectableComponent.onSearchbarValueChanged(event)}
              ></ion-searchbar>
            </ion-toolbar>
          )}
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
                        <ion-item button={true} onClick={(): void => this.selectableComponent.selectItem(item)}>
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
        {this.selectableComponent.footerButtonsCount /* && selectComponent.footerTemplate */ && (
          <ion-footer>
            <ion-toolbar /* *ngIf="!selectComponent.footerTemplate" */>
              <ion-row>
                {this.selectableComponent.canClear && (
                  <ion-col>
                    <ion-button
                      onClick={(): void => this.selectableComponent.clearItems()}
                      disabled={!(this.selectableComponent.selectedItems.length > 0)}
                      expand="full"
                    >
                      {this.selectableComponent.clearButtonText}
                    </ion-button>
                  </ion-col>
                )}
                {this.selectableComponent.canAddItem && (
                  <ion-col>
                    <ion-button onClick={(): void => this.selectableComponent.addItemClick()} expand="full">
                      {this.selectableComponent.addButtonText}
                    </ion-button>
                  </ion-col>
                )}
                {(this.selectableComponent.isMultiple ||
                  this.selectableComponent.hasConfirmButton ||
                  this.selectableComponent.canClear) && (
                  <ion-col>
                    <ion-button
                      onClick={(): void => this.selectableComponent.confirmSelection()}
                      disabled={!this.selectableComponent.isConfirmButtonEnabled}
                      expand="full"
                    >
                      {this.selectableComponent.confirmButtonText}
                    </ion-button>
                  </ion-col>
                )}
              </ion-row>
            </ion-toolbar>
          </ion-footer>
        )}
      </Host>
    );
  }
}
