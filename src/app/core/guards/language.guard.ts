import { Injectable } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { environment } from 'src/environments/environment';
import { ILanguage } from '../interfaces/language.interface';
import { LanguageService } from '../services/language.service';

@Injectable()
export class CanActivateLanguage implements CanActivate {
  constructor(
    private router: Router,
    private languageService: LanguageService
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const routeLanguage = route.params.language;
    const isLanguageIncluded = environment.supportLangs.find(
      (lang: ILanguage) => lang.value === routeLanguage
    );

    if (isLanguageIncluded || routeLanguage === 'api') {
      return true;
    }

    const language = this.languageService.getLanguage();
    const indexOfQueryParams = state.url.indexOf('?');
    const url =
      indexOfQueryParams !== -1
        ? state.url.slice(0, indexOfQueryParams)
        : state.url;
    const currentUrl = url.split('/').filter(Boolean);

    return this.router.createUrlTree([language.value, ...currentUrl], {
      queryParams: route.queryParams,
    });
  }
}
