import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as users from '../../../assets/data/users.json';
import * as camers from '../../../assets/data/camers.json';
import { MathService } from '../services/math.service';

const urls = [
  {
    url: '/1.0/auth/sign-in',
    json: users,
    method: 'login',
  },
  {
    url: '/1.0/auth/sign-up',
    json: users,
    method: 'register',
  },
  {
    url: '/1.0/cameras',
    json: camers,
    method: 'get-camers',
  },
];

@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private mathService: MathService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    for (const element of urls) {
      if (request.url === element.url) {
        console.log('Loaded from json : ' + request.url);
        console.log(
          new HttpResponse({
            status: 200,
            body: (element.json as any).default,
          })
        );
        let response;
        if (element.method === 'register') {
          response = this.registerUser(
            request.body,
            (element.json as any).default
          );
        } else if (element.method === 'login') {
          response = this.loginUser(
            request.body,
            (element.json as any).default
          );
        } else if (element.method === 'get-camers') {
          response = this.getCamers((element.json as any).default);
        } else {
          response = new HttpResponse({
            status: 200,
            body: (element.json as any).default,
          });
        }

        return of(response);
      }
    }
    console.log('Loaded from http call :' + request.url);
    return next.handle(request);
  }

  private loginUser(request, usersData): HttpResponse<any> {
    for (const user of usersData) {
      if (user.email === request.email) {
        if (user.password === request.password) {
          return new HttpResponse({
            status: 200,
            body: user,
          });
        }
      }
    }

    return new HttpResponse({
      status: 401,
    });
  }

  private getCamers(data): HttpResponse<any> {
    const camersData = [...data.camers];
    const camersLength = 4;
    const randomCamersData = this.randomData(camersData, camersLength);

    return new HttpResponse({
      status: 200,
      body: randomCamersData,
    });
  }

  public registerUser(request, usersData): HttpResponse<any> {
    const newUser = {
      ...request,
      token: request.firstName + '_token',
    };
    usersData.push(newUser);
    return new HttpResponse({
      status: 200,
      body: newUser,
    });
  }

  private randomData(data: Array<any>, length: number): Array<any> {
    const newData = [];
    for (let i = 0; i < length; i++) {
      const randomIndex = this.mathService.getRandomInt(data.length);
      data[randomIndex].cadrs.forEach((cadr) => {
        cadr.status = !!this.mathService.getRandomInt(2);
      });
      const choosenElement = data.splice(randomIndex, 1)[0];
      newData.push(choosenElement);
    }
    return newData;
  }
}
