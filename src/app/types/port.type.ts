import { Country } from "./country.type";

export class Port implements IPort {
  id: number;
  name: string;
  country?: Country;
  location?: Location;
  timeZone?: number;

  constructor(port: IPort) {
    this.id = port.id;
    this.name = port.name;
    this.country = port.country;
    this.location = port.location;
    this.timeZone = port.timeZone;
  }
}

export interface IPort {
  id: number;
  name: string;
  country?: Country;
  location?: Location;
  timeZone?: number;
}
