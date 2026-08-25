export class Location implements ILocation {
  id: number;
  name: string;

  constructor(port: ILocation) {
    this.id = port.id;
    this.name = port.name;
  }
}

export interface ILocation {
  id: number;
  name: string;
}
