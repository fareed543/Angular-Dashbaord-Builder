import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material';
@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatFormFieldModule, DragDropModule, MatCardModule],
  exports: [MatButtonModule, MatCheckboxModule, MatFormFieldModule, DragDropModule, MatCardModule]
})
export class NgxMaterialModule {}
