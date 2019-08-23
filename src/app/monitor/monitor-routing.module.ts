import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { WidgetsComponent } from './widgets/widgets.component';
import { BoardsComponent } from './boards/boards.component';
import { NodesComponent } from './nodes/nodes.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'widgets', component: WidgetsComponent, data: { title: extract('Widgets') } },
    { path: 'boards', component: BoardsComponent, data: { title: extract('Boards') } },
    { path: 'nodes', component: NodesComponent, data: { title: extract('Nodes') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MonitorRoutingModule {}
