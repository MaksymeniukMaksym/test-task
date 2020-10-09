import { Injectable } from '@angular/core';

const PREFIX = 'app_';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public set(key: string, value: any): void {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  }

  public get(key: string): any {
    try {
      const value = localStorage.getItem(PREFIX + key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      return null;
    }
  }

  public remove(key: string): void {
    localStorage.removeItem(PREFIX + key);
  }

  public clear(): void {
    localStorage.clear();
  }
}
