import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsComponent } from './widgets/widgets.component';
import { BoardsComponent } from './boards/boards.component';
import { NodesComponent } from './nodes/nodes.component';
import { MonitorRoutingModule } from './monitor-routing.module';
import { NgxMaterialModule } from '@app/ngx-material.module';
import { Bootstrap3FrameworkModule } from 'angular7-json-schema-form';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WidgetsComponent, BoardsComponent, NodesComponent],
  imports: [CommonModule, FormsModule, MonitorRoutingModule, NgxMaterialModule, Bootstrap3FrameworkModule],
  exports: [NgxMaterialModule]
})
export class MonitorModule {}
