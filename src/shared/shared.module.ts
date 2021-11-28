import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FilterListPipe } from './pipes/filter-list.pipe';

@NgModule({
  declarations: [
    FilterListPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatSnackBarModule,
    MatMenuModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FilterListPipe
  ]
})
export class SharedModule { }
