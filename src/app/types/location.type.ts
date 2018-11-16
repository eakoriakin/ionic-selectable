import { ILocation } from './location.interface';

export class Location implements ILocation {
  id: number;
  name: string;

  constructor(port: ILocation) {
    this.id = port.id;
    this.name = port.name;
  }
}
