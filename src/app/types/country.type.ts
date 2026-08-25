import { Port } from "./port.type";

export class Country implements ICountry {
  id: number;
  name: string;
  flag?: string;
  ports?: Port[];

  constructor(country: ICountry) {
    this.id = country.id;
    this.name = country.name;
    this.flag = country.flag;
    this.ports = country.ports;
  }

  get flagUrl(): string {
    return `https://lipis.github.io/flag-icon-css/flags/4x3/${this.flag}.svg`;
  }
}

export interface ICountry {
  id: number;
  name: string;
  flag?: string;
  ports?: Port[];
}
