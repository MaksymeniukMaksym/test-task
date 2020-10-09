import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { map } from 'rxjs/operators';
import { ILanguage } from '../interfaces/language.interface';
import { environment } from 'src/environments/environment';

const LANGUAGE_KEY = 'language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public defaultLanguage: ILanguage = environment.supportLangs.find(
    (lang: ILanguage) => lang.value === 'ua'
  );

  private languageSubject: BehaviorSubject<ILanguage> = new BehaviorSubject<
    ILanguage
  >(this.getDefaultLanguage());
  public language$ = this.languageSubject.asObservable();
  public languageChange = from(this.translateService.onLangChange).pipe(
    map(() => this.languageSubject.value)
  );

  constructor(
    private translateService: TranslateService,
    private location: Location,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.languageSubject.subscribe(({ value }: ILanguage) => {
      this.translateService.use(value);
      this.localStorageService.set(LANGUAGE_KEY, value);
    });
  }

  public setLanguage(newLanguage: string): void {
    const language = environment.supportLangs.find(
      (lang: ILanguage) => lang.value === newLanguage
    );

    if (language) {
      const currentLanguage = this.router.url.split('/')[1];
      this.location.replaceState(
        this.router.url.replace(currentLanguage, language.value)
      );
      this.languageSubject.next(language);
    }
  }

  public setLanguageFromUrl(url: string): void {
    const newLanguage = url.split('/')[1];
    const language = environment.supportLangs.find(
      (lang: ILanguage) => lang.value === newLanguage
    );
    if (language) {
      this.languageSubject.next(language);
    }
  }

  public getLanguage(): ILanguage {
    return this.languageSubject.getValue();
  }

  public getDefaultLanguage(): ILanguage {
    const storageLanguageValue = this.localStorageService.get(LANGUAGE_KEY);
    const storageLanguage = environment.supportLangs.find(
      (lang: ILanguage) => lang.value === storageLanguageValue
    );

    return storageLanguage || this.defaultLanguage;
  }

  public getInstant(instant: string) {
    return this.translateService.instant(instant);
  }
}
