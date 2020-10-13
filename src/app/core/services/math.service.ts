import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MathService {
  constructor() {}

  public getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
