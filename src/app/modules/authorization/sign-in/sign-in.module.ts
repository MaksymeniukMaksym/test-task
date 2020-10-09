import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SignInComponent } from './sign-in.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [{ path: '', component: SignInComponent }];

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    RouterModule,
    RouterModule.forChild(routes),
  ],
  exports: [SignInComponent],
})
export class SignInModule {}
