import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, share } from 'rxjs/operators';
import { Country, Port } from '../types';

@Injectable()
export class PortService {
  private countries: Country[] = [new Country({
    id: 0,
    name: 'Japan',
    flag: 'jp',
    ports: [
      new Port({ id: 0, name: 'Tokai' })
    ]
  }), new Country({
    id: 2,
    name: 'Russia',
    flag: 'ru',
    ports: [
      new Port({ id: 2, name: 'Vladivostok' })
    ]
  }), new Country({
    id: 3,
    name: 'India',
    flag: 'in',
    ports: [
      new Port({ id: 3, name: 'Navlakhi' })
    ]
  }), new Country({
    id: 4,
    name: 'Cayman Islands',
    flag: 'ky',
    ports: [
      new Port({ id: 4, name: 'Cayman Brac' })
    ]
  }), new Country({
    id: 6,
    name: 'Egypt',
    flag: 'eg',
    ports: [
      new Port({ id: 6, name: 'Port Ibrahim' })
    ]
  }), new Country({
    id: 7,
    name: 'Finland',
    flag: 'fi',
    ports: [
      new Port({ id: 7, name: 'Brahestad' }),
      new Port({ id: 37, name: 'Kantvik' })
    ]
  }), new Country({
    id: 8,
    name: 'Germany',
    flag: 'ge',
    ports: [
      new Port({ id: 8, name: 'Brake' })
    ]
  }), new Country({
    id: 9,
    name: 'Canada',
    flag: 'ca',
    ports: [
      new Port({ id: 9, name: 'Hantsport NS' })
    ]
  }), new Country({
    id: 11,
    name: 'Chile',
    flag: 'cl',
    ports: [
      new Port({ id: 11, name: 'Antofagasta' }),
      new Port({ id: 12, name: 'San Antonio' }),
      new Port({ id: 13, name: 'Santa Barbara' })
    ]
  }), new Country({
    id: 12,
    name: 'Argentina',
    flag: 'ar',
    ports: [
      new Port({ id: 14, name: 'Cabo San Antonio', timeZone: -240 }),
      new Port({ id: 15, name: 'Diamante', timeZone: -240 }),
      new Port({ id: 16, name: 'San Antonio Este Arg', timeZone: -240 }),
      new Port({ id: 44, name: 'Santa Cruz', timeZone: -240 })
    ]
  }), new Country({
    id: 13,
    name: 'Curacao',
    flag: 'cw',
    ports: [
      new Port({ id: 17, name: 'Santa Anna Bay' })
    ]
  }), new Country({
    id: 14,
    name: 'Sri Lanka',
    flag: 'lk',
    ports: [
      new Port({ id: 18, name: 'Hambantota' })
    ]
  }), new Country({
    id: 15,
    name: 'Madagascar',
    flag: 'mg',
    ports: [
      new Port({ id: 19, name: 'Antananarivo' })
    ]
  }), new Country({
    id: 5,
    name: 'Brazil',
    flag: 'br',
    ports: [
      new Port({ id: 51, name: 'Areia Branca', timeZone: -180 }),
      new Port({ id: 52, name: 'Navegantes', timeZone: -180 }),
      new Port({ id: 53, name: 'Antonina', timeZone: -180 }),
      new Port({ id: 54, name: 'Santos', timeZone: -180 }),
      new Port({ id: 55, name: 'Paranagua', timeZone: -180 }),
      new Port({ id: 56, name: 'Sao Francisco do Sul', timeZone: -180 }),
      new Port({ id: 57, name: 'Angra dos Reis', timeZone: -180 }),
      new Port({ id: 58, name: 'Rio de Janeiro', timeZone: -180 }),
      new Port({ id: 59, name: 'Vitoria', timeZone: -180 }),
      new Port({ id: 60, name: 'Porto Alegre', timeZone: -180 }),
      new Port({ id: 61, name: 'Itajai', timeZone: -180 }),
      new Port({ id: 62, name: 'Imbituba', timeZone: -180 }),
      new Port({ id: 63, name: 'Pelotas', timeZone: -180 }),
      new Port({ id: 64, name: 'Tubarao', timeZone: -180 }),
      new Port({ id: 65, name: 'Fortaleza', timeZone: -180 }),
      new Port({ id: 66, name: 'Cabedelo', timeZone: -180 }),
      new Port({ id: 67, name: 'Sao Luis', timeZone: -180 }),
      new Port({ id: 68, name: 'Natal', timeZone: -180 }),
      new Port({ id: 69, name: 'Trombetas', timeZone: -240 })
    ]
  }), new Country({
    id: 16,
    name: 'Ireland',
    flag: 'ie',
    ports: [
      new Port({ id: 21, name: 'Bantry Bay' })
    ]
  }), new Country({
    id: 17,
    name: 'Italy',
    flag: 'it',
    ports: [
      new Port({ id: 22, name: 'Porto Levante' })
    ]
  }), new Country({
    id: 18,
    name: 'Greece',
    flag: 'gr',
    ports: [
      new Port({ id: 23, name: 'Port of Antikyra' })
    ]
  }), new Country({
    id: 19,
    name: 'Malaysia',
    flag: 'my',
    ports: [
      new Port({ id: 38, name: 'Kuantan' }),
      new Port({ id: 24, name: 'Berantai FPSO' })
    ]
  }), new Country({
    id: 20,
    name: 'Spain',
    flag: 'es',
    ports: [
      new Port({ id: 25, name: 'Alicante' }),
      new Port({ id: 45, name: 'Santa Eugenia De Riveira' })
    ]
  }), new Country({
    id: 21,
    name: 'Panama',
    flag: 'pa',
    ports: [
      new Port({ id: 26, name: 'Almirante' })
    ]
  }), new Country({
    id: 22,
    name: 'China',
    flag: 'cn',
    ports: [
      new Port({ id: 39, name: 'Lantian' }),
      new Port({ id: 27, name: 'Canton' }),
      new Port({ id: 42, name: 'Nantong' })
    ]
  }), new Country({
    id: 23,
    name: 'Somalia',
    flag: 'so',
    ports: [
      new Port({ id: 28, name: 'Dante' })
    ]
  }), new Country({
    id: 24,
    name: 'United States',
    flag: 'us',
    ports: [
      new Port({ id: 29, name: 'Davant LA' })
    ]
  }), new Country({
    id: 25,
    name: 'Australia',
    flag: 'au',
    ports: [
      new Port({ id: 30, name: 'Fremantle' })
    ]
  }), new Country({
    id: 26,
    name: 'Philippines',
    flag: 'ph',
    ports: [
      new Port({ id: 31, name: 'General Santos' })
    ]
  }), new Country({
    id: 27,
    name: 'United Kingdom',
    flag: 'gb',
    ports: [
      new Port({ id: 32, name: 'Granton' })
    ]
  }), new Country({
    id: 28,
    name: 'Venezuela',
    flag: 've',
    ports: [
      new Port({ id: 33, name: 'Guanta' })
    ]
  }), new Country({
    id: 29,
    name: 'Indonesia',
    flag: 'id',
    ports: [
      new Port({ id: 35, name: 'Kalimantan' })
    ]
  }), new Country({
    id: 30,
    name: 'Thailand',
    flag: 'th',
    ports: [
      new Port({ id: 36, name: 'Kantang' })
    ]
  }), new Country({
    id: 31,
    name: 'Ecuador',
    flag: 'ec',
    ports: [
      new Port({ id: 40, name: 'Manta' })
    ]
  }), new Country({
    id: 32,
    name: 'France',
    flag: 'fr',
    ports: [
      new Port({ id: 41, name: 'Mantes' })
    ]
  })];
  private portsObservable: Observable<Port[]>;

  getCountries(page?: number, size?: number): Country[] {
    let countries = [];

    if (page && size) {
      countries = this.countries.slice((page - 1) * size, ((page - 1) * size) + size);
    } else {
      countries = this.countries;
    }

    return countries;
  }

  getPorts(page?: number, size?: number): Port[] {
    let ports = [];

    this.countries.forEach(country => {
      country.ports.forEach(port => {
        port.country = country;
        ports.push(port);
      });
    });

    if (page && size) {
      ports = ports.slice((page - 1) * size, ((page - 1) * size) + size);
    }

    return ports;
  }

  getPortsAsync(page?: number, size?: number, timeout = 1000): Observable<Port[]> {
    if (this.portsObservable) {
      return this.portsObservable;
    }

    this.portsObservable = new Observable<Port[]>(observer => {
      observer.next(this.getPorts(page, size));
      observer.complete();
    }).pipe(
      delay(timeout),
      share()
    );

    this.portsObservable.subscribe(() => {
      // Remove completed observable.
      this.portsObservable = null;
    });

    return this.portsObservable;
  }

  filterPorts(ports: Port[], text: string): Port[] {
    return ports.filter(port => {
      return port.name.toLowerCase().indexOf(text) !== -1 ||
        port.country.name.toLowerCase().indexOf(text) !== -1;
    });
  }

  getNewPortId(): number {
    return this.getPorts().map(port => port.id).sort((portId1, portId2) => {
      return portId1 > portId2 ? -1 : 1;
    })[0] + 1;
  }

  addPort(port: Port) {
    port.id = this.getNewPortId();
    this.countries.find(country => {
      return country.id === port.country.id;
    }).ports.push(port);
  }

  addPortAsync(port: Port, timeout = 1000): Observable<any> {
    const self = this;

    return new Observable<any>(observer => {
      self.addPort(port);
      observer.next();
      observer.complete();
    }).pipe(delay(timeout));
  }

  deletePort(port: Port) {
    const country = this.countries.find(_country => {
      return _country.id === port.country.id;
    });

    if (country && country.ports) {
      country.ports = country.ports.filter(_port => {
        return _port.id !== port.id;
      });
    }
  }

  deletePortAsync(port: Port, timeout = 1000): Observable<any> {
    const self = this;

    return new Observable<any>(observer => {
      self.deletePort(port);
      observer.next();
      observer.complete();
    }).pipe(delay(timeout));
  }

  isInteger(value: any): boolean {
    return value === parseInt(value, 10);
  }

  formatNumber(value: number, length: number): string {
    let formattedNumber = '';

    for (let i = 0; i < length; i++) {
      formattedNumber += '0';
    }

    return (formattedNumber + value).slice(-length);
  }

  formatTimeZone(offset: number): string {
    if (offset === 0) {
      return 'Z';
    }

    if (!this.isInteger(offset)) {
      return '';
    }

    // Time zones vary from -12:00 to 14:00.
    if (offset < -720 || offset > 840) {
      return '';
    }

    let sign = '+';

    if (offset < 0) {
      offset *= -1;
      sign = '-';
    }

    const minutes = offset % 60,
      hours = (offset - minutes) / 60;

    return sign + this.formatNumber(hours, 2) + ':' + this.formatNumber(minutes, 2);
  }
}
