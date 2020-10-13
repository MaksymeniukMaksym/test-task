import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  private _camers = new BehaviorSubject<Array<any>>([]);
  // public camers$ = this._camers.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  public updateCamers(): void {
    this.http
      .get<any>(`${environment.api}/cameras`)
      .pipe(take(1))
      .subscribe((res) => {
        this._camers.next(res);
      });
  }
  public getCamers(): Observable<any> {
    return this._camers.asObservable();
  }
  public getCorrectName(src: string) {
    console.log(src.split('/'));
  }
}
