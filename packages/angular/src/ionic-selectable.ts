import {
  EventEmitter,
  ChangeDetectorRef,
  ElementRef,
  NgZone,
  Component,
  ChangeDetectionStrategy,
} from "@angular/core";
import { proxyOutputs, ProxyCmp } from "./proxies-utils";
import { Components } from "test-isc";

export declare interface IonicSelectable extends Components.IonicSelectable {}
@ProxyCmp({ inputs: ["value", "items"], methods: ["open"] })
@Component({
  selector: "ionic-selectable",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: "<ng-content></ng-content>",
  inputs: [
    "items",
    "value",
  ],
})
export class IonicSelectable {
  onChanged!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ["onChanged"]);
  }
}
