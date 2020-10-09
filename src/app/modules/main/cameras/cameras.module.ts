import { CamerasComponent } from './cameras.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: CamerasComponent,
  },
];

@NgModule({
  declarations: [CamerasComponent],
  imports: [
    SharedModule,
    TranslateModule,
    CommonModule,
    SharedModule,
    RouterModule,
    RouterModule.forChild(routes),
  ],
  exports: [CamerasComponent],
})
export class CamerasgModule {}
