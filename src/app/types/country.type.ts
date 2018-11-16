import { ICountry } from './country.interface';
import { IPort } from './port.interface';

export class Country implements ICountry {
  id: number;
  name: string;
  flag?: string;
  ports?: IPort[];
  get flagUrl(): string {
    return `https://lipis.github.io/flag-icon-css/flags/4x3/${this.flag}.svg`;
  }

  constructor(country: ICountry) {
    this.id = country.id;
    this.name = country.name;
    this.flag = country.flag;
    this.ports = country.ports;
  }
}
