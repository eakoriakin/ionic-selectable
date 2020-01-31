import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'ionic-selectable',
  styleUrl: 'ionic-selectable.component.css',
  shadow: true
})
export class IonicSelectableComponent {
  @Prop()
  public first: string;

  public render(): void {
    return <div>IonicSelectable</div>;
  }
}
