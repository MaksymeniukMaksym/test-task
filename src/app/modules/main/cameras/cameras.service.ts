import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  constructor(private http: HttpClient, private router: Router) {}

  public getCamers(): Observable<any> {
    return this.http.get<any>(`${environment.api}/cameras`);
  }
}
