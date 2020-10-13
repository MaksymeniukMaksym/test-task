import { HeaderComponent } from './components/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from './material-component.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UrlToNamePipe } from './pipes/url-to-name.pipe';

@NgModule({
  declarations: [HeaderComponent, UrlToNamePipe],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
  ],
  exports: [
    MaterialComponentsModule,
    ReactiveFormsModule,
    HeaderComponent,
    UrlToNamePipe,
  ],
  providers: [],
})
export class SharedModule {}
