import { Router } from '@angular/router';
import { LocalStorageService } from './../../../core/services/local-storage.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ILanguage } from 'src/app/core/interfaces/language.interface';
import { LanguageService } from 'src/app/core/services/language.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private languageService: LanguageService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  public themes: Array<any> = environment.supportThemes;
  private curentTheme = this.themes[0];

  private _theme: BehaviorSubject<string>;
  public theme$: Observable<any>;
  public theme: string;

  public languages: Array<ILanguage> = environment.supportLangs;
  public language$: Observable<ILanguage>;
  public language: string;

  ngOnInit(): void {
    this.language$ = this.languageService.language$;
    this.setLanguagesLabel(this.languageService.getLanguage().value);

    this.language$.pipe().subscribe((lan) => {
      this.language = lan.value;
    });

    this.loadDefaultTheme(this.themes);
  }

  public setLanguagesLabel(language): void {
    this.languages = environment.supportLangs.filter(
      (lan) => lan.value !== language
    );
  }

  public changeLang(language): void {
    this.languageService.setLanguage(language);
    this.setLanguagesLabel(language);
  }

  public changeThem(them): void {
    const newTheme = `theme-${them.value}`;
    document.body.classList.replace(this.curentTheme, newTheme);
    this.curentTheme = newTheme;
    this.setThemLabel(them);
  }
  public setThemLabel(theme): void {
    this.themes = environment.supportThemes.filter(
      (lan) => lan.value !== theme
    );
    this._theme.next(theme.label);
  }

  public logout(): void {
    this.localStorageService.clear();
    this.router.navigateByUrl('/');
  }

  private loadDefaultTheme(themes) {
    const defaultTheme = themes.find((theme) => theme.default === true);
    this._theme = new BehaviorSubject<string>(defaultTheme.label);
    this.theme$ = this._theme.asObservable();
    this.curentTheme = `theme-${defaultTheme.value}`;
    document.body.classList.add(this.curentTheme);
  }
}
