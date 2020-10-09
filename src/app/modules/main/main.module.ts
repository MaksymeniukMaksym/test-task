import { CamerasComponent } from './cameras/cameras.component';
import { SettingsComponent } from './settings/settings.component';
import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportingComponent } from './reporting/reporting.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,

    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'reporting',
        loadChildren: () =>
          import('./reporting/reporting.module').then((m) => m.ReportingModule),
      },
      {
        path: 'cameras',
        loadChildren: () =>
          import('./cameras/cameras.module').then((m) => m.CamerasgModule),
      },
    ],
  },
];

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    RouterModule.forChild(routes),
  ],
  exports: [MainComponent],
})
export class MainModule {}
