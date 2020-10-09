import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PortalModule } from '@angular/cdk/portal';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [],
  imports: [
    MatInputModule,
    MatCheckboxModule,
    PortalModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  exports: [
    MatInputModule,
    MatCheckboxModule,
    PortalModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  providers: [],
})
export class MaterialComponentsModule {}
