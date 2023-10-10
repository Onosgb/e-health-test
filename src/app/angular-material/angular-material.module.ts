import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatSnackBarModule],

  exports: [MatButtonModule, MatDialogModule],
})
export class AngularMaterialModule {}
