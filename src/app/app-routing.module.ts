import { MainComponent } from './modules/main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard.service';
import { UserGuard } from './core/guards/user-guard.service';
import { CanActivateLanguage } from './core/guards/language.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/authorization/authorization.module').then(
        (m) => m.AuthorizationModule
      ),
    canActivate: [UserGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/ua',
  },
  {
    path: ':language',
    loadChildren: () =>
      import('./modules/main/main.module').then((m) => m.MainModule),
    canActivate: [AuthGuard, CanActivateLanguage],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
