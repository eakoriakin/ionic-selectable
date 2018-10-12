import { IPort } from './port.interface';

export interface ICountry {
  id: number;
  name: string;
  flag?: string;
  ports?: IPort[];
}
