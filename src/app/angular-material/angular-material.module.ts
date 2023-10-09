import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  imports: [CommonModule, MatButtonModule, MatCardModule, MatDialogModule],

  exports: [MatButtonModule, MatCardModule, MatDialogModule],
})
export class AngularMaterialModule {}
